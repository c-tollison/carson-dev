import { useState } from 'react';
import JournalCard from '../components/journal-card';
import PageWrapper from '../components/page-wrapper';
import journals from './journals/journals';

export default function Journal() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const reversedJournals = [...journals].reverse();
    const totalPages = Math.ceil(journals.length / 5);

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
            <div className='py-10 flex flex-col gap-3'>
                <h1 className='text-primary text-5xl font-bold'>Journal</h1>
                <h2 className='text-2xl font-semibold text-foreground'>Recent thoughts</h2>
            </div>

            <div className='flex flex-col gap-4'>
                {reversedJournals.slice(currentPage * 5, currentPage * 5 + 5).map((journal, index) => (
                    <JournalCard
                        title={journal.title}
                        date={journal.date}
                        route={journal.route}
                        thumbnail={journal.thumbnail}
                        topics={journal.topics}
                        key={index}
                    />
                ))}
            </div>

            {totalPages > 5 && (
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
                                className={`p-1 text-l ${currentPage === pageIndex ? 'font-semibold' : ''}`}
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
