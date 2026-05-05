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
                The emails table on one of the products I work on had grown into the hundreds of thousands of rows, with
                relationships out to users, threads, attachments, transactions, and a few classification tables. The
                page that listed emails ran a single query with around seven joins, applied filters, ordered by sent_at
                desc, and limited to a page of twenty. Loading the table had crept up to four to six seconds. That was
                worth fixing.
            </p>
            <p className='text-foreground leading-relaxed'>
                The cause turned out to be the join order. Postgres was happily joining the entire emails table to every
                relation before applying the WHERE clause and the LIMIT. With a quarter million emails and seven joins,
                the planner was producing intermediate result sets in the millions before chopping them down to twenty
                rows.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Naive Query</h2>
            <p className='text-foreground leading-relaxed'>The original query looked roughly like this:</p>
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
                The filters were selective. Out of roughly 250k rows, only a few thousand matched. But the planner was
                still joining the full set before slicing. Indexes helped, but not enough to save the day once the joins
                kicked in.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The CTE Rewrite</h2>
            <p className='text-foreground leading-relaxed'>
                The fix was to express the intent more clearly: filter and page first, then join only against the rows
                that survive.
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
                The CTE does all the heavy filtering and slicing using the indexes on{' '}
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
                . The result is at most twenty rows. Every join after that operates on that tiny set. The outer ORDER BY
                is still needed, because join order is not guaranteed to preserve the CTE order.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Numbers</h2>
            <p className='text-foreground leading-relaxed'>Production timings on the same workload:</p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>Before: 4.2s p50, 7.1s p95</p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>After: 38ms p50, 90ms p95</p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>
                EXPLAIN ANALYZE confirmed it. The naive plan showed nested loops over the full base table. The CTE plan
                showed an index scan returning twenty rows, then a handful of hash joins on a tiny inner table. Same
                answer, two orders of magnitude faster.
            </p>
            <h2 className='text-xl font-bold text-foreground'>When This Pattern Helps</h2>
            <p className='text-foreground leading-relaxed'>
                The rule of thumb is straightforward: if you are paginating a base table that has selective filters and
                several joins purely for display data, push the filter and the LIMIT into a CTE first. The savings scale
                with the ratio of base rows to joined rows.
            </p>
            <p className='text-foreground leading-relaxed'>
                It does not help if the column you are filtering or sorting on lives on a joined table. In that case the
                join has to happen first, and you are back to the naive plan. For those queries, denormalizing the
                filter column onto the base table is usually the move.
            </p>
            <blockquote className='border-l-4 border-primary pl-4 py-2 italic text-muted-foreground'>
                <p className='text-foreground leading-relaxed'>
                    Filter where the data is. Join where the rows are few.
                </p>
            </blockquote>
        </LogPage>
    );
}
