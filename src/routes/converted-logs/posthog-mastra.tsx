import LogPage from '../../components/log/log-page';
import CodeBlock from '../../components/log/code-block';

export default function PosthogForMastra() {
    return (
        <LogPage
            title='PostHog for Mastra'
            date='May 5, 2026'
            topics={['PostHog', 'Mastra', 'Observability', 'AI']}
        >
            <p className='text-foreground leading-relaxed'>
                Mastra provides per-step traces within its own runtime, which is useful for debugging individual
                workflow runs. However, it doesn't automatically connect those traces to the rest of your product
                analytics. I wanted to be able to see exactly what an enrichment workflow looks like for a specific user
                on a pricing page without switching between different dashboards. The{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    @mastra/posthog
                </code>{' '}
                exporter is the cleanest way to bridge that gap.
            </p>
            <p className='text-foreground leading-relaxed'>
                The implementation is surprisingly lean. There is no manual instrumentation, no wrappers around{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    createStep
                </code>
                , and no need to manually pass trace IDs through the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    runtimeContext
                </code>
                . You simply install the package and register an exporter; every step, LLM generation, and tool call
                then flows into PostHog automatically.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Setup</h2>
            <p className='text-foreground leading-relaxed'>
                The{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    @mastra/posthog
                </code>{' '}
                package plugs directly into Mastra's existing{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    Observability
                </code>{' '}
                configuration.
            </p>
            <CodeBlock
                code={`npm install @mastra/posthog`}
                language='bash'
            />
            <p className='text-foreground leading-relaxed'>
                You'll need your PostHog API Key and Host (usually{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    https://us.i.posthog.com
                </code>{' '}
                or{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    https://eu.i.posthog.com
                </code>
                ) from your project settings.
            </p>
            <p className='text-foreground leading-relaxed'>
                In your Mastra entrypoint, register the exporter within the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    observability
                </code>{' '}
                object. As of the latest updates, Mastra supports zero-config environment variables (
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    POSTHOG_API_KEY
                </code>
                ,{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    POSTHOG_HOST
                </code>
                ), but you can also pass them explicitly:
            </p>
            <CodeBlock
                code={`import { Mastra } from '@mastra/core';
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
});`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                This setup covers the entire integration. Step lifecycle events and LLM generations begin appearing in
                PostHog without requiring any changes to your existing workflow code.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Key Configuration Options</h2>
            <p className='text-foreground leading-relaxed'>
                The exporter includes a few settings that are particularly useful for production environments.
            </p>
            <p className='text-foreground leading-relaxed'>
                <strong className='font-semibold text-foreground'>Short-lived Runtimes</strong>
                By default, PostHog batches events. This is fine for long-lived processes but problematic for serverless
                functions (like AWS Lambda) that might exit before the buffer flushes. When running in these
                environments, you should set the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    flushAt
                </code>{' '}
                and{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    flushInterval
                </code>{' '}
                lower to ensure events are sent immediately.
            </p>
            <CodeBlock
                code={`new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    flushAt: 1,
    flushInterval: 0,
});`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                <strong className='font-semibold text-foreground'>Privacy and PII</strong>
                Generation events usually include both the prompt and the completion. While helpful for debugging, this
                is a liability when processing PII. Mastra's latest telemetry updates allow for per-request redaction,
                but you can also use global flags in the exporter to strip text while still reporting token usage and
                latency.
            </p>
            <CodeBlock
                code={`new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    maskInputs: true,
    maskOutputs: true,
});`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                I typically run masking on for workflows handling user-generated content and off for internal tools.
                Token counts and latency are usually sufficient to diagnose cost or performance issues without logging
                sensitive customer data.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Analyzing Data in PostHog</h2>
            <p className='text-foreground leading-relaxed'>
                Once the data is flowing, you can build several views that previously required manual log aggregation:
            </p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Workflow Timelines:</strong> View each
                        workflow run as a sequence of steps with associated latency.
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Generation Traces:</strong> Inspect LLM
                        calls—including model types and costs—threaded directly into the surrounding step events.
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Performance Funnels:</strong> Create
                        breakdowns such as "what percentage of enrichment runs successfully reach the persistence step,
                        categorized by model type."
                    </p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>
                This last capability is the most significant benefit. It allows product teams to query AI workflows
                using the same tools they use for checkout flows or user sign-ups, removing the need for engineering to
                run custom SQL queries.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Integration Limits</h2>
            <p className='text-foreground leading-relaxed'>
                The exporter is designed specifically for PostHog's event format rather than OpenTelemetry (OTel). If
                your architecture requires distributed tracing across multiple services with full span hierarchies, you
                should run an OTel exporter alongside this. However, for observing a single Mastra runtime, the PostHog
                exporter provides everything needed with zero manual instrumentation.
            </p>
        </LogPage>
    );
}
