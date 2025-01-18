import cashTrakPlans from './articles-json/cash-trak';
import rowLevelSecurity from './articles-json/row-level-security';

export interface Article {
    title: string;
    date: string;
    segments: { text: string; type: 'image' | 'text' }[];
}

export const articles: Article[] = [rowLevelSecurity, cashTrakPlans].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
