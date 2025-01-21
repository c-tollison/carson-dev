import { ArticleI } from './articles-json/articles-array';

interface ArticleProps {
    article: ArticleI;
}

export function Article({ article }: ArticleProps) {
    return <p>Currently writing: {article.title}</p>;
}
