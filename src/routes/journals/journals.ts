import { JournalCardProps } from '../../components/journal-card';
import Journal1 from './journal-1';
import Journal2 from './journal-2';
import Journal3 from './journal-3';
import Journal4 from './journal-4';
import Journal5 from './journal-5';

interface Journal extends JournalCardProps {
    component: () => JSX.Element;
}

const journals: Journal[] = [
    {
        title: 'Journal 1',
        date: 'Apr 7',
        route: 'journal-1',
        component: Journal1,
        topics: ['react', 'javascript', 'css'],
    },
    {
        title: 'Journal 2',
        date: 'Apr 7',
        route: 'journal-2',
        component: Journal2,
        topics: ['go', 'rust'],
    },
    {
        title: 'Journal 3',
        date: 'Apr 7',
        route: 'journal-3',
        component: Journal3,
        topics: ['ai'],
    },
    {
        title: 'Journal 4',
        date: 'Apr 7',
        route: 'journal-4',
        component: Journal4,
        topics: ['testing'],
    },
    {
        title: 'Journal 5',
        date: 'Apr 7',
        route: 'journal-5',
        component: Journal5,
        topics: ['bash'],
    },
];

export default journals;
