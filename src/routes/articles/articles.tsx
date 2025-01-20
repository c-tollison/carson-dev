import { articles } from '../../components/Article/articles-json/articles-array';
import ArticleCard from '../../components/article-card/article-card';

export default function Articles() {
    return (
        <>
            {articles.map((article) => (
                <ArticleCard article={article} />
            ))}
        </>
    );
}
