import deployingWebsiteS3Cloudfront from './deploying-website-s3-cloudfront';

export interface ArticleI {
    title: string;
    description: string;
    date: string;
    route: string;
    segments: { text: string; type: 'image' | 'text' }[];
    tags: string[];
}

export const articles: ArticleI[] = [deployingWebsiteS3Cloudfront].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
