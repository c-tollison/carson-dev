import deployingWebsiteS3Cloudfront from './deploying-website-s3-cloudfront';
import { ARTICLE_SEGMENT_TYPE } from './article-segment.enum';

export interface ArticleI {
    title: string;
    description: string;
    date: string;
    route: string;
    displayImage: string;
    segments: { text: string; type: ARTICLE_SEGMENT_TYPE }[];
    tags: string[];
}

export const articles: ArticleI[] = [deployingWebsiteS3Cloudfront].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
