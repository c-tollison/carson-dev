---
title: Mastra Workflows
date: 05/03/26
description: Building durable, type-safe AI workflows in TypeScript with Mastra.
topics: [Mastra, AI, Workflows, TypeScript]
---

I’ve been using Mastra to build the orchestration layer for several AI features lately. The core appeal is the ability to compose typed, durable workflow steps in TypeScript without building a custom state machine on top of a queue. After working with it for a few weeks, the most valuable parts are the step primitives, schema-validated I/O, and the built-in durability.

## The Step Primitive

A step is a unit of work with defined input and output schemas. Mastra uses Zod for both. These schemas flow through the composition, ensuring each downstream step receives correctly typed data from the previous one.

```ts
import { createStep } from '@mastra/core/workflows';
import { z } from 'zod';

const extractEntities = createStep({
    id: 'extract-entities',
    inputSchema: z.object({
        rawText: z.string(),
    }),
    outputSchema: z.object({
        people: z.array(z.string()),
        companies: z.array(z.string()),
    }),
    execute: async ({ inputData }) => {
        const result = await llm.generate({
            prompt: `Extract entities from: ${inputData.rawText}`,
        });
        return parseEntities(result);
    },
});
```

These schemas act as runtime validators. If a step returns data in the wrong shape, it fails at the boundary rather than passing corrupt data to the next function in the chain.

## Composing Steps

Workflows chain steps using `.then()`, branch with `.branch()`, and handle concurrency with `.parallel()`. The resulting code reads like a flowchart.

```ts
import { createWorkflow } from '@mastra/core/workflows';

export const enrichEmail = createWorkflow({
    id: 'enrich-email',
    inputSchema: z.object({ emailId: z.string() }),
    outputSchema: z.object({ enrichmentId: z.string() }),
})
    .then(loadEmail)
    .then(extractEntities)
    .parallel([classifyIntent, scoreUrgency])
    .then(persistEnrichment)
    .commit();
```

The compiler ensures that the output of `loadEmail` matches the input requirements of `extractEntities`. Restructuring a workflow becomes a standard refactor rather than a hunt for runtime errors.

## Native Structured Output

Mastra simplifies the bridge between raw LLM responses and structured data. Instead of writing a prompt and manually parsing the resulting JSON, you can pass a Zod schema directly to the agent.

The engine uses provider-specific features—like OpenAI’s JSON mode or Anthropic’s tool use—to guarantee the output matches your schema.

```ts
const generatePlan = createStep({
    id: 'generate-plan',
    execute: async ({ context }) => {
        const agent = new Agent({
            name: 'Planner',
            model: { provider: 'OPENAI', name: 'gpt-4o' },
        });

        const response = await agent.generate('Plan my week', {
            output: z.object({
                tasks: z.array(
                    z.object({
                        title: z.string(),
                        priority: z.enum(['high', 'low']),
                    }),
                ),
            }),
        });

        return response.object; // Typed as { tasks: [...] }
    },
});
```

If a model fails to hit the schema, Mastra can use a secondary agent to fix the formatting. This removes the need for fragile regex or manual retry loops.

## Durability and Retries

The durability model is a significant advantage. Every step's input and output is checkpointed. If the process crashes mid-workflow, a restart resumes from the last completed step. For workflows involving expensive LLM calls or external API side effects, this prevents paying for or executing the same work twice.

This architecture also makes retries straightforward. Steps can have individual retry policies. A failing LLM call can be retried without re-running the successful database write that preceded it.

## Automatic Observability

Because the runtime tracks every typed input, output, and lifecycle event, logging is handled automatically. Every run produces a trace showing the exact values that flowed through each step and how long they took. Debugging bad output starts with looking at the actual data passed between steps rather than guessing.

## Use Cases

Mastra is overkill for simple function calls, but it pays off in scenarios involving:

- Multiple LLM hops with distinct failure modes.
- Side effects that should not be repeated on retry.
- Complex branching logic based on intermediate results.
- A requirement for detailed audit trails of AI operations.

The alternative is usually a messy combination of queues and status columns in a database. Mastra collapses that infrastructure into a single, type-safe programming model.
