import { WorkExperienceProps } from '../../components/work-experience';
import FeluxLogo from '../../components/icons/felux-logo';
import AmazonPt1 from './amazon-pt1';
import AmazonPt2 from './amazon-pt2';
import ChiroHD from './chirohd';
import Felux from './felux';

interface Work extends WorkExperienceProps {
    component: () => JSX.Element;
}

const works: Work[] = [
    {
        route: 'felux',
        name: 'Felux',
        title: 'Founding Software Engineer',
        date: 'Aug 2025 - Present',
        profileImage: FeluxLogo,
        component: Felux,
    },
    {
        route: 'chirohd',
        name: 'ChiroHD',
        title: 'Software Engineer',
        date: 'Nov 2021 - Aug 2025',
        profileImage: 'chirohd_logo.png',
        component: ChiroHD,
    },
    {
        route: 'amazon-pt2',
        name: 'Amazon - APM',
        title: 'Software Development Engineer Intern',
        date: 'May 2023 - Aug 2023',
        profileImage: 'amazon.png',
        component: AmazonPt2,
    },
    {
        route: 'amazon-pt1',
        name: 'Amazon - Benefits',
        title: 'Software Development Engineer Intern',
        date: 'May 2022 - Aug 2022',
        profileImage: 'amazon.png',
        component: AmazonPt1,
    },
];

export default works;
