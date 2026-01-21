import { WorkExperienceProps } from '../../components/work-experience';
import AmazonPt1 from './amazon-pt1';
import AmazonPt2 from './amazon-pt2';
import ChiroHD from './chirohd';
// import Felux from './felux';

interface Work extends WorkExperienceProps {
    component: () => JSX.Element;
}

const works: Work[] = [
    // {
    //     route: 'felux',
    //     name: 'Felux',
    //     title: '',
    //     date: 'Aug 2025 - Present',
    //     imageUrl: '',
    //     component: Felux,
    // },
    {
        route: 'chirohd',
        name: 'ChiroHD',
        title: 'Software Engineer',
        date: 'Nov 2021 - Aug 2025',
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
