import LogPage from '../../components/log/log-page';
import CodeBlock from '../../components/log/code-block';

export default function PaginationWithCtes() {
    return (
        <LogPage
            title='Pagination with CTEs'
            date='Apr 17, 2026'
            topics={['SQL', 'Postgres', 'Performance']}
        >
            <p className='text-foreground leading-relaxed'>
                The emails table in a project I’m working on recently crossed several hundred thousand rows. It has
                relationships with users, threads, attachments, and transactions. The main email list page used a single
                query with seven joins, a few filters, and a limit of twenty. Over time, the load time for this table
                had climbed to six seconds—a clear sign that the query needed an overhaul.
            </p>
            <p className='text-foreground leading-relaxed'>
                The bottleneck was the join order. Postgres was joining the entire emails table to every related table
                before applying the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    WHERE
                </code>{' '}
                filters and the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    LIMIT
                </code>
                . With a quarter-million emails and seven joins, the query planner created intermediate result sets in
                the millions before finally discarding almost all of them to return just twenty rows.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Naive Query</h2>
            <p className='text-foreground leading-relaxed'>The original query followed a standard, direct approach:</p>
            <CodeBlock
                code={`SELECT
    e.id,
    e.subject,
    e.sent_at,
    u.name AS sender_name,
    t.subject AS thread_subject,
    a.count AS attachment_count,
    tr.amount AS transaction_amount
FROM emails e
LEFT JOIN users u          ON u.id = e.sender_id
LEFT JOIN threads t        ON t.id = e.thread_id
LEFT JOIN attachments a    ON a.email_id = e.id
LEFT JOIN transactions tr  ON tr.email_id = e.id
WHERE e.org_id = \$1
  AND e.status = 'received'
  AND e.sent_at > NOW() - INTERVAL '30 days'
ORDER BY e.sent_at DESC
LIMIT 20 OFFSET 0;`}
                language='sql'
            />
            <p className='text-foreground leading-relaxed'>
                Even though only a few thousand rows matched the filters, the planner was still performing the joins
                across the broader set. Indexes helped, but they couldn't overcome the sheer volume of data being joined
                upfront.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The CTE Rewrite</h2>
            <p className='text-foreground leading-relaxed'>
                The solution was to restructure the query to filter and page first, ensuring joins only occur on the
                final twenty rows.
            </p>
            <CodeBlock
                code={`WITH paged_emails AS (
    SELECT id, subject, sent_at, sender_id, thread_id
    FROM emails
    WHERE org_id = \$1
      AND status = 'received'
      AND sent_at > NOW() - INTERVAL '30 days'
    ORDER BY sent_at DESC
    LIMIT 20 OFFSET 0
)
SELECT
    pe.id,
    pe.subject,
    pe.sent_at,
    u.name  AS sender_name,
    t.subject AS thread_subject,
    a.count AS attachment_count,
    tr.amount AS transaction_amount
FROM paged_emails pe
LEFT JOIN users u          ON u.id = pe.sender_id
LEFT JOIN threads t        ON t.id = pe.thread_id
LEFT JOIN attachments a    ON a.email_id = pe.id
LEFT JOIN transactions tr  ON tr.email_id = pe.id
ORDER BY pe.sent_at DESC;`}
                language='sql'
            />
            <p className='text-foreground leading-relaxed'>
                In this version, the CTE handles the heavy lifting of filtering and slicing using indexes on{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    org_id
                </code>
                ,{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    status
                </code>
                , and{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    sent_at
                </code>
                . Every subsequent join operates on a maximum of twenty rows. The outer{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ORDER BY
                </code>{' '}
                remains necessary, as join operations don't guarantee that the order from the CTE is preserved.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Results</h2>
            <p className='text-foreground leading-relaxed'>
                After the change, production timings improved drastically:
            </p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Before:</strong> 4.2s p50, 7.1s p95
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>After:</strong> 38ms p50, 90ms p95
                    </p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    EXPLAIN ANALYZE
                </code>{' '}
                confirmed the improvement. The naive plan relied on nested loops over the entire base table. The CTE
                plan performed a quick index scan to find twenty rows, followed by efficient hash joins on a tiny
                subset.
            </p>
            <h2 className='text-xl font-bold text-foreground'>When to Use This Pattern</h2>
            <p className='text-foreground leading-relaxed'>
                The logic is simple: if you are paginating a table with selective filters and joins used primarily for
                display data, push the filters and the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    LIMIT
                </code>{' '}
                into a CTE. The performance gain is proportional to the number of rows you can discard before the joins
                start.
            </p>
            <p className='text-foreground leading-relaxed'>
                This pattern won't work if you need to filter or sort by a column in one of the joined tables. In those
                cases, the join must happen first. If performance remains an issue there, denormalizing that specific
                filter column onto the base table is usually the most effective move.
            </p>
        </LogPage>
    );
}
