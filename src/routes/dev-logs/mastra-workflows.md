---
title: Mastra Workflows
date: 05/03/26
description: Building durable, type-safe AI workflows in TypeScript with Mastra.
topics: [Mastra, AI, Workflows, TypeScript]
---

I have been using Mastra to build the orchestration layer for a couple of AI features lately. The pitch is that you can compose typed, durable workflow steps in TypeScript without rolling your own state machine on top of a queue. After a few weeks with it, the parts I keep coming back to are the step primitive, schema-validated I/O, and the durability guarantees.

## The Step Primitive

A step is a unit of work with declared input and output schemas. Mastra uses Zod for both, and the schemas flow through composition so each downstream step gets correctly typed input from the previous one.

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

The schemas are not just types. They are runtime validators on both ends, which means a step that returns the wrong shape fails loudly at the boundary instead of corrupting whatever runs next.

## Composing Steps

Workflows chain steps with `.then()`, branch with `.branch()`, and run things in parallel with `.parallel()`. The composition reads like a flowchart written as code.

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

The compiler enforces that the output shape of `loadEmail` matches the input shape of `extractEntities`, and so on down the chain. Restructuring a workflow becomes a refactor problem instead of a runtime problem.

## Durability

This is the part that turned me from skeptic to fan. Each step's input and output is checkpointed. If the process crashes mid-workflow, a restart picks up at the last completed step rather than the beginning. For workflows that hit external APIs, generate text, or write to side-effecting systems, that means you do not pay twice for the work that already succeeded.

The same machinery makes retries trivial. Steps can declare their own retry policies, and Mastra applies them per step rather than per workflow, so a flaky LLM call does not force you to redo the deterministic database write that came before it.

## Observability Comes for Free

Because every step has a typed input, output, and lifecycle, the runtime can record all of it without you having to wire up logging by hand. I get a per-run trace showing each step's input, output, duration, and outcome, which means debugging an enrichment that produced bad output starts with a list of the actual values that flowed through it, not a guess.

## Where It Earns Its Keep

I would not reach for Mastra to glue together two function calls. The framework starts paying off when you have:

- Multiple LLM hops, each with their own failure modes
- Side effects that you do not want to repeat on retry
- Branching logic that depends on intermediate results
- A real need for observability into what step ran with what input

For all of those, the alternative is some combination of a queue, a state column on a row, and a pile of try/catch. Mastra collapses that into a single composable surface where the wiring is the code.

> Type-safe composition with durable execution is the combination I always end up wanting in this kind of system, and rarely build well from scratch.
