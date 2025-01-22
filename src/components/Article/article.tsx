import React from 'react';
import { ARTICLE_SEGMENT_TYPE } from './articles-json/article-segment.enum';
import { ArticleI } from './articles-json/articles-array';

interface ArticleProps {
    article: ArticleI;
}

function textWithSpans(text: string, key: string): JSX.Element {
    const parts = text.split(/`([^`]*)`/g);

    return (
        <p
            className='text-sm text-muted-foreground'
            key={key}
        >
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <span
                        key={i}
                        className='bg-zinc-600 px-1 rounded-sm'
                    >
                        {part}
                    </span>
                ) : (
                    // You can pass 'key' to a React.Fragment as of React 16.2+
                    <React.Fragment key={i}>{part}</React.Fragment>
                ),
            )}
        </p>
    );
}

export function Article({ article }: ArticleProps) {
    return (
        <>
            <div
                key={article.title}
                className='col-span-full row-auto p-8 flex flex-col justify-center border bg-card rounded-md border border-border shadow-md transition transform duration-300 ease-in-out gap-4'
            >
                <div className='flex w-full items-end'>
                    <div className='w-full border-b border-accent md:flex md:flex-row md:justify-between'>
                        <h3 className='text-xl font-semibold'>{article.title}</h3>
                        <p className='text-sm text-muted-foreground'>{article.date}</p>
                    </div>
                </div>
                {article.segments.map((segment, index) => {
                    switch (segment.type) {
                        case ARTICLE_SEGMENT_TYPE.TEXT:
                            return textWithSpans(segment.text, `text:${index}`);
                        case ARTICLE_SEGMENT_TYPE.IMAGE:
                            return (
                                <img
                                    src={`/${segment.text}`}
                                    alt={article.title}
                                    className='max-h-36 aspect-square object-cover rounded-md'
                                    key={`image:${index}`}
                                />
                            );
                        case ARTICLE_SEGMENT_TYPE.CODE:
                            return (
                                <div
                                    className='flex justify-center'
                                    key={`code:${index}`}
                                >
                                    <pre className='overflow-auto px-4 text-sm bg-zinc-600 text-white rounded-md shadow-md font-mono  w-full md:w-1/2'>
                                        <code>{segment.text}</code>
                                    </pre>
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </>
    );
}
