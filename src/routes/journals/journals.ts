import { JournalCardProps } from '../../components/journal-card';
import Journal1 from './journal-1';

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
];

export default journals;
