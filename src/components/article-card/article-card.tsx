import { Link } from 'react-router-dom';
import { ArticleType } from '../Article/articles-json/articles-array';

interface ArticleCardProps {
    article: ArticleType;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link
            to={`/articles/${article.route}`}
            key={article.title}
            className='col-span-full row-auto p-8 flex flex-col gap-4 border bg-card rounded-md border border-border shadow-md transition transform duration-300 ease-in-out'
        >
            <div className='border-b pb-4 border-accent'>
                <h3 className='text-xl font-semibold'>{article.title}</h3>
                <p className='text-sm'>{article.description}</p>
                <p className='text-sm text-muted-foreground'>
                    <span>{article.date}</span>
                </p>
            </div>
        </Link>
    );
}
