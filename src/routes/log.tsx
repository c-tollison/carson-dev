import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/page-wrapper';
import logs from './converted-logs/logs';

const PER_PAGE = 10;

export default function Log() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const sortedLogs = [...logs].reverse();
    const totalPages = Math.ceil(logs.length / PER_PAGE);

    const selectPage = (index: number) => {
        setCurrentPage(index);
    };

    const visiblePages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage >= totalPages) {
        endPage = totalPages - 1;
        startPage = Math.max(0, endPage - visiblePages + 1);
    }

    return (
        <PageWrapper>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-foreground'>Dev Logs</h1>
            </div>

            <ul className='mt-4 flex flex-col'>
                {logs.length === 0 ? (
                    <li className='text-muted-foreground py-2'>No dev logs yet.</li>
                ) : (
                    sortedLogs.slice(currentPage * PER_PAGE, currentPage * PER_PAGE + PER_PAGE).map((log) => (
                        <li key={log.route}>
                            <Link
                                to={`/log/${log.route}`}
                                className='group flex justify-between items-center py-2 transition-all duration-300 ease-in-out'
                            >
                                <div className='min-w-0'>
                                    <h4 className='text-base font-semibold text-foreground group-hover:underline'>
                                        {log.title}
                                    </h4>
                                    <div className='mt-1 flex items-center flex-wrap gap-1.5'>
                                        <span className='text-sm text-muted-foreground'>{log.date}</span>
                                        {log.topics.map((topic, i) => (
                                            <span
                                                key={i}
                                                className='px-1.5 py-px rounded-full border border-border text-[11px] text-muted-foreground'
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='text-primary text-base opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4'>
                                    &#8594;
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>

            {logs.length > 0 && totalPages > 1 && (
                <div className='flex items-center justify-center mt-8 gap-4'>
                    <button
                        onClick={() => selectPage(currentPage - 1)}
                        disabled={currentPage <= 0}
                        className='px-4 py-2 rounded-lg bg-card hover:bg-popover hover:shadow-lg disabled:pointer-events-none transition-all duration-300 ease-in-out border border-border disabled:opacity-50'
                    >
                        {'<'}
                    </button>
                    {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
                        const pageIndex = startPage + i;
                        return (
                            <button
                                key={pageIndex}
                                onClick={() => selectPage(pageIndex)}
                                className={`p-1 text-sm ${currentPage === pageIndex ? 'font-semibold' : ''}`}
                            >
                                {pageIndex + 1}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => selectPage(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className='px-4 py-2 rounded-lg bg-card hover:bg-popover hover:shadow-lg disabled:pointer-events-none transition-all duration-300 ease-in-out border border-border disabled:opacity-50'
                    >
                        {'>'}
                    </button>
                </div>
            )}
        </PageWrapper>
    );
}
