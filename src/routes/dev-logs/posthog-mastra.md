---
title: PostHog for Mastra
date: 05/05/26
description: Wiring Mastra's observability layer to PostHog so step runs and LLM generations land in one place.
topics: [PostHog, Mastra, Observability, AI]
---

Mastra provides per-step traces within its own runtime, which is useful for debugging individual workflow runs. However, it doesn't automatically connect those traces to the rest of your product analytics. I wanted to be able to see exactly what an enrichment workflow looks like for a specific user on a pricing page without switching between different dashboards. The `@mastra/posthog` exporter is the cleanest way to bridge that gap.

The implementation is surprisingly lean. There is no manual instrumentation, no wrappers around `createStep`, and no need to manually pass trace IDs through the `runtimeContext`. You simply install the package and register an exporter; every step, LLM generation, and tool call then flows into PostHog automatically.

## Setup

The `@mastra/posthog` package plugs directly into Mastra's existing `Observability` configuration.

```bash
npm install @mastra/posthog
```

You'll need your PostHog API Key and Host (usually `https://us.i.posthog.com` or `https://eu.i.posthog.com`) from your project settings.

In your Mastra entrypoint, register the exporter within the `observability` object. As of the latest updates, Mastra supports zero-config environment variables (`POSTHOG_API_KEY`, `POSTHOG_HOST`), but you can also pass them explicitly:

```ts
import { Mastra } from '@mastra/core';
import { PosthogExporter } from '@mastra/posthog';

export const mastra = new Mastra({
    observability: {
        serviceName: 'enrichment-service',
        exporters: {
            posthog: new PosthogExporter({
                apiKey: process.env.POSTHOG_API_KEY!,
                host: process.env.POSTHOG_HOST, // Defaults to US host if omitted
            }),
        },
    },
});
```

This setup covers the entire integration. Step lifecycle events and LLM generations begin appearing in PostHog without requiring any changes to your existing workflow code.

## Key Configuration Options

The exporter includes a few settings that are particularly useful for production environments.

**Short-lived Runtimes**
By default, PostHog batches events. This is fine for long-lived processes but problematic for serverless functions (like AWS Lambda) that might exit before the buffer flushes. When running in these environments, you should set the `flushAt` and `flushInterval` lower to ensure events are sent immediately.

```ts
new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    flushAt: 1,
    flushInterval: 0,
});
```

**Privacy and PII**
Generation events usually include both the prompt and the completion. While helpful for debugging, this is a liability when processing PII. Mastra's latest telemetry updates allow for per-request redaction, but you can also use global flags in the exporter to strip text while still reporting token usage and latency.

```ts
new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    maskInputs: true,
    maskOutputs: true,
});
```

I typically run masking on for workflows handling user-generated content and off for internal tools. Token counts and latency are usually sufficient to diagnose cost or performance issues without logging sensitive customer data.

## Analyzing Data in PostHog

Once the data is flowing, you can build several views that previously required manual log aggregation:

- **Workflow Timelines:** View each workflow run as a sequence of steps with associated latency.
- **Generation Traces:** Inspect LLM calls—including model types and costs—threaded directly into the surrounding step events.
- **Performance Funnels:** Create breakdowns such as "what percentage of enrichment runs successfully reach the persistence step, categorized by model type."

This last capability is the most significant benefit. It allows product teams to query AI workflows using the same tools they use for checkout flows or user sign-ups, removing the need for engineering to run custom SQL queries.

## Integration Limits

The exporter is designed specifically for PostHog's event format rather than OpenTelemetry (OTel). If your architecture requires distributed tracing across multiple services with full span hierarchies, you should run an OTel exporter alongside this. However, for observing a single Mastra runtime, the PostHog exporter provides everything needed with zero manual instrumentation.
