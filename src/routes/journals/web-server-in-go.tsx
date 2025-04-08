import JournalPage from '../../components/journal-page';

export default function WebServerInGo() {
    return (
        <JournalPage
            title='Web Server with Go'
            date='Apr 8th, 2025'
            topics={['Go']}
            thumbnail='./../go-gopher.png'
        >
            <p>Test</p>
        </JournalPage>
    );
}
