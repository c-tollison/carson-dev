import { ArticleType } from './articles-json/articles-array';

interface ArticleProps {
    article: ArticleType;
}

export function Article({ article }: ArticleProps) {
    return <p>Youre looking at an article {article.title}</p>;
}
