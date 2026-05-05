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
                Mastra gives you per-step traces inside its own runtime, which is great for debugging a single workflow
                run. The thing it does not do by itself is connect those traces to the rest of your product analytics. I
                wanted to be able to ask "for users on the new pricing page, what does our enrichment workflow look like
                end to end" without bouncing between two dashboards. The official{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    @mastra/posthog
                </code>{' '}
                exporter turned out to be the cleanest way to close that gap.
            </p>
            <p className='text-foreground leading-relaxed'>
                What surprised me is how little code it actually takes. There is no manual instrumentation, no wrapper
                around{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    createStep
                </code>
                , no plumbing of trace IDs through{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    runtimeContext
                </code>
                . You install one package and register an exporter, and every step run, every LLM generation, and every
                tool call shows up in PostHog automatically.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Setup</h2>
            <p className='text-foreground leading-relaxed'>
                The package is{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    @mastra/posthog
                </code>
                . It plugs into Mastra's existing{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    Observability
                </code>{' '}
                config.
            </p>
            <CodeBlock
                code={`npm install @mastra/posthog`}
                language='bash'
            />
            <p className='text-foreground leading-relaxed'>
                Two env vars, both grabbed from the PostHog project settings:
            </p>
            <CodeBlock
                code={`POSTHOG_API_KEY=phc_xxxxxxxxxxxxxxxx
POSTHOG_HOST=https://us.i.posthog.com`}
                language='bash'
            />
            <p className='text-foreground leading-relaxed'>Then in your Mastra entrypoint:</p>
            <CodeBlock
                code={`import { Mastra } from '@mastra/core';
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
});`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                That is the whole integration for the happy path. Step lifecycle events, tool calls, and LLM generations
                all start flowing into PostHog with no per-step changes anywhere in the workflow code.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Two Knobs You Actually Care About</h2>
            <p className='text-foreground leading-relaxed'>
                The exporter accepts a handful of options. Two of them are worth thinking about up front.
            </p>
            <p className='text-foreground leading-relaxed'>
                <strong className='font-semibold text-foreground'>Serverless mode.</strong> The default batching flushes
                every 20 events or 10 seconds, whichever comes first. That works fine for a long-lived process. It is
                wrong for a Lambda that may exit in 200ms with three events queued and never flushed. Setting{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    serverless: true
                </code>{' '}
                lowers the thresholds to ten events and two seconds so short-lived runtimes actually deliver their
                events.
            </p>
            <CodeBlock
                code={`new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    serverless: true,
});`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                <strong className='font-semibold text-foreground'>Privacy mode.</strong> By default, generation events
                include the prompt and the completion. That is great for debugging and useless if you are processing
                PII.{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    enablePrivacyMode: true
                </code>{' '}
                strips inputs and outputs from generation events while still reporting token usage, latency, and model.
            </p>
            <CodeBlock
                code={`new PosthogExporter({
    apiKey: process.env.POSTHOG_API_KEY!,
    enablePrivacyMode: true,
});`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                For my own setup, the workflows that touch user email content run with privacy mode on, and the
                internal-only ones run without it. Token counts and latency are usually enough to investigate "is this
                slow, is it expensive, is it failing" without ever logging the customer's data.
            </p>
            <h2 className='text-xl font-bold text-foreground'>What You Get in PostHog</h2>
            <p className='text-foreground leading-relaxed'>
                Once events flow, three views become useful that previously required gluing logs together:
            </p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        A timeline per workflow run, with each step as a row and latency attached
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        Generation traces for every LLM call, with model, token counts, cost, and (privacy permitting)
                        prompt and completion, threaded into the same trace as the surrounding step events
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        Funnels and breakdowns over the workflow itself, e.g. "what percentage of{' '}
                        <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                            enrich-email
                        </code>{' '}
                        runs reach{' '}
                        <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                            persistEnrichment
                        </code>
                        , broken down by model", the same kind of query you would write for a checkout flow, only over
                        your AI pipeline
                    </p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>
                The last one is the part that justified the integration for me. The product team writes its own queries
                against AI workflows now, instead of asking engineering for SQL pulls.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Where This Stops</h2>
            <p className='text-foreground leading-relaxed'>
                The exporter speaks PostHog's event shape, not OpenTelemetry. If you also need distributed tracing
                across services with span hierarchies, you would run an OTel exporter alongside it and use PostHog as
                the AI-specific lens. Within a single Mastra runtime, though, the PostHog exporter on its own covers
                everything I have wanted to ask.
            </p>
            <blockquote className='border-l-4 border-primary pl-4 py-2 italic text-muted-foreground'>
                <p className='text-foreground leading-relaxed'>
                    One install, one exporter, no manual instrumentation. The right amount of code for the value.
                </p>
            </blockquote>
        </LogPage>
    );
}
