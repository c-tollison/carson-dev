import { Link } from 'react-router-dom';
import { ArticleI } from '../Article/articles-json/articles-array';

interface ArticleCardProps {
    article: ArticleI;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link
            to={`/articles/${article.route}`}
            key={article.title}
            className='col-span-full row-auto p-8 flex flex-col justify-center border bg-card rounded-md border border-border shadow-md transition transform duration-300 ease-in-out'
        >
            <div className='flex flex-row w-full items-center gap-4'>
                <div className='w-3/4 md:w-5/6'>
                    <div className='border-b border-accent md:flex md:flex-row md:justify-between mb-2'>
                        <h3 className='text-xl font-semibold'>{article.title}</h3>
                        <p className='text-sm text-muted-foreground'>{article.date}</p>
                    </div>
                    <p className='text-sm text-muted-foreground'>{article.description}</p>
                </div>
                <div className='w-1/4 md:w-1/6 flex justify-center items-center md:pl-8'>
                    <img
                        src={`/${article.displayImage}`}
                        alt={article.title}
                        className='max-h-36 aspect-square object-cover rounded-md'
                    />
                </div>
            </div>
        </Link>
    );
}
