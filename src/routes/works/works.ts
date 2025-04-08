import { WorkExperienceProps } from '../../components/work-experience';
import AmazonPt1 from './amazon-pt1';
import AmazonPt2 from './amazon-pt2';
import ChiroHD from './chirohd';

interface Work extends WorkExperienceProps {
    component: () => JSX.Element;
}

const works: Work[] = [
    {
        route: 'chirohd',
        name: 'ChiroHD',
        title: 'Software Engineer',
        date: 'Nov 2021 - Present',
        imageUrl: 'chirohd_logo.png',
        component: ChiroHD,
    },
    {
        route: 'amazon-pt2',
        name: 'Amazon - APM',
        title: 'Software Development Engineer Intern',
        date: 'May 2023 - Aug 2023',
        imageUrl: 'amazon.png',
        component: AmazonPt2,
    },
    {
        route: 'amazon-pt1',
        name: 'Amazon - Benefits',
        title: 'Software Development Engineer Intern',
        date: 'May 2022 - Aug 2022',
        imageUrl: 'amazon.png',
        component: AmazonPt1,
    },
];

export default works;
