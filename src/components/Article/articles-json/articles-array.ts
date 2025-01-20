import cashTrakPlans from './cash-trak';
import deployingWebsiteS3Cloudfront from './deploying-website-s3-cloudfront';
import rowLevelSecurity from './row-level-security';

export interface ArticleType {
    title: string;
    description: string;
    date: string;
    route: string;
    segments: { text: string; type: 'image' | 'text' }[];
}

export const articles: ArticleType[] = [rowLevelSecurity, cashTrakPlans, deployingWebsiteS3Cloudfront].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
