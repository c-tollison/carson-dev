import WorkPage from '../../components/work-page';
import FeluxLogo from '../../components/icons/felux-logo';

export default function Felux() {
    const points: string[] = [
        `Built LLM-powered (Gemini 2 Flash) email ingestion pipelines transforming 100s of unstructured quotes into structured CRM data in real time, reducing manual entry time by 90%`,
        `Trained classification models using Python on historical email datasets, improving quote and document type prediction accuracy by 30%`,
        `Developed robust Kanban workflow platform with role-based access and dynamic status transitions to streamline quote and RFQ lifecycles across multiple sales teams`,
        `Implemented PostgreSQL Row-Level Security (RLS) for multi-tenant data isolation, enabling secure operations across distinct steel companies in Supabase backend`,
    ];

    return (
        <WorkPage
            company={'Felux'}
            title={'Founding Software Engineer'}
            dates={'Aug 2025 - Present'}
            location={'Remote'}
            profileImage={FeluxLogo}
            points={points}
            tldr={''}
        >
            <p>
                Content coming soon...
            </p>
        </WorkPage>
    );
}
