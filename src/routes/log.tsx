import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/page-wrapper';
import logs from './converted-logs/logs';

const PER_PAGE = 10;

export default function Log() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const sortedLogs = [...logs].reverse();
    const totalPages = Math.ceil(logs.length / PER_PAGE);
    const visibleLogs = sortedLogs.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

    return (
        <PageWrapper>
            <div className='mb-8'>
                <h1 className='font-display text-3xl font-bold tracking-tight text-foreground'>Dev Logs</h1>
            </div>

            <ul className='flex flex-col divide-y divide-border'>
                {visibleLogs.length === 0 ? (
                    <li className='text-muted-foreground py-4 text-sm'>No dev logs yet.</li>
                ) : (
                    visibleLogs.map((log) => (
                        <li key={log.route}>
                            <Link
                                to={`/log/${log.route}`}
                                className='group flex justify-between items-center py-4 transition-colors duration-200'
                            >
                                <div className='min-w-0'>
                                    <h4 className='text-[15px] font-medium text-foreground group-hover:text-primary transition-colors'>
                                        {log.title}
                                    </h4>
                                    <div className='mt-1.5 flex items-center flex-wrap gap-2'>
                                        <span className='text-sm text-muted-foreground'>{log.date}</span>
                                        {log.topics.map((topic, i) => (
                                            <span
                                                key={i}
                                                className='px-2 py-0.5 rounded-full border border-border text-[11px] font-medium text-muted-foreground'
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4'>
                                    &#8594;
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onSelect={setCurrentPage}
                />
            )}
        </PageWrapper>
    );
}

function Pagination({
    currentPage,
    totalPages,
    onSelect,
}: {
    currentPage: number;
    totalPages: number;
    onSelect: (page: number) => void;
}) {
    const VISIBLE = 5;
    let startPage = Math.max(0, currentPage - Math.floor(VISIBLE / 2));
    let endPage = Math.min(totalPages - 1, startPage + VISIBLE - 1);
    startPage = Math.max(0, endPage - VISIBLE + 1);

    return (
        <div className='flex items-center justify-center mt-10 gap-2'>
            <button
                onClick={() => onSelect(currentPage - 1)}
                disabled={currentPage <= 0}
                className='px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors'
            >
                &#8592;
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageIndex) => (
                <button
                    key={pageIndex}
                    onClick={() => onSelect(pageIndex)}
                    className={`w-8 h-8 rounded-md text-sm transition-colors ${
                        currentPage === pageIndex
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                    {pageIndex + 1}
                </button>
            ))}
            <button
                onClick={() => onSelect(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className='px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors'
            >
                &#8594;
            </button>
        </div>
    );
}
