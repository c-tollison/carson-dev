---
title: PostHog for Mastra
date: 05/05/26
description: Wiring Mastra's observability layer to PostHog so step runs and LLM generations land in one place.
topics: [PostHog, Mastra, Observability, AI]
---

Mastra gives you per-step traces inside its own runtime, which is great for debugging a single workflow run. The thing it does not do by itself is connect those traces to the rest of your product analytics. I wanted to be able to ask "for users on the new pricing page, what does our enrichment workflow look like end to end" without bouncing between two dashboards. The official `@mastra/posthog` exporter turned out to be the cleanest way to close that gap.

What surprised me is how little code it actually takes. There is no manual instrumentation, no wrapper around `createStep`, no plumbing of trace IDs through `runtimeContext`. You install one package and register an exporter, and every step run, every LLM generation, and every tool call shows up in PostHog automatically.

## Setup

The package is `@mastra/posthog`. It plugs into Mastra's existing `Observability` config.

```bash
npm install @mastra/posthog
```

Two env vars, both grabbed from the PostHog project settings:

```bash
POSTHOG_API_KEY=phc_xxxxxxxxxxxxxxxx
POSTHOG_HOST=https://us.i.posthog.com
```

Then in your Mastra entrypoint:

```ts
import { Mastra } from '@mastra/core';
import { Observability } from '@mastra/observability';
import { PosthogExporter } from '@mastra/posthog';

export const mastra = new Mastra({
    observability: new Observability({
        configs: {
            posthog: {
                serviceName: 'enrichment',
                exporters: [new PosthogExporter()],
            },
        },
    }),
});
```

That is the whole integration for the happy path. Step lifecycle events, tool calls, and LLM generations all start flowing into PostHog with no per-step changes anywhere in the workflow code.

## The Two Knobs You Actually Care About

The exporter accepts a handful of options. Two of them are worth thinking about up front.

**Serverless mode.** The default batching flushes every 20 events or 10 seconds, whichever comes first. That works fine for a long-lived process. It is wrong for a Lambda that may exit in 200ms with three events queued and never flushed. Setting `serverless: true` lowers the thresholds to ten events and two seconds so short-lived runtimes actually deliver their events.

```ts
new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    serverless: true,
});
```

**Privacy mode.** By default, generation events include the prompt and the completion. That is great for debugging and useless if you are processing PII. `enablePrivacyMode: true` strips inputs and outputs from generation events while still reporting token usage, latency, and model.

```ts
new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    enablePrivacyMode: true,
});
```

For my own setup, the workflows that touch user email content run with privacy mode on, and the internal-only ones run without it. Token counts and latency are usually enough to investigate "is this slow, is it expensive, is it failing" without ever logging the customer's data.

## What You Get in PostHog

Once events flow, three views become useful that previously required gluing logs together:

- A timeline per workflow run, with each step as a row and latency attached
- Generation traces for every LLM call, with model, token counts, cost, and (privacy permitting) prompt and completion, threaded into the same trace as the surrounding step events
- Funnels and breakdowns over the workflow itself, e.g. "what percentage of `enrich-email` runs reach `persistEnrichment`, broken down by model", the same kind of query you would write for a checkout flow, only over your AI pipeline

The last one is the part that justified the integration for me. The product team writes its own queries against AI workflows now, instead of asking engineering for SQL pulls.

## Where This Stops

The exporter speaks PostHog's event shape, not OpenTelemetry. If you also need distributed tracing across services with span hierarchies, you would run an OTel exporter alongside it and use PostHog as the AI-specific lens. Within a single Mastra runtime, though, the PostHog exporter on its own covers everything I have wanted to ask.

> One install, one exporter, no manual instrumentation. The right amount of code for the value.
