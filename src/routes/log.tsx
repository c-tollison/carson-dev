import { useState } from 'react';
import LogCard from '../components/log/log-card';
import PageWrapper from '../components/page-wrapper';
import logs from './log/logs';

export default function Log() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const sortedLogs = logs;
    const totalPages = Math.ceil(logs.length / 5);

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
                <h1 className='text-2xl font-semibold text-foreground'>Logs</h1>
            </div>

            <div className='flex flex-col gap-3'>
                {logs.length === 0 ? (
                    <p className='text-muted-foreground'>No logs yet.</p>
                ) : (
                    sortedLogs.slice(currentPage * 5, currentPage * 5 + 5).map((log, index) => (
                        <LogCard
                            title={log.title}
                            date={log.date}
                            route={log.route}
                            thumbnail={log.thumbnail}
                            topics={log.topics}
                            key={index}
                        />
                    ))
                )}
            </div>

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
