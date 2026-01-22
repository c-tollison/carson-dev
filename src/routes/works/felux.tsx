import WorkPage from '../../components/work-page';
import FeluxLogo from '../../components/icons/felux-logo';

export default function Felux() {
    const points: string[] = [
        `Designed and built LLM-driven email ingestion workflows that convert unstructured RFQs and quotes into structured CRM data in a steel-industry workflow dominated by email`,
        `Trained and iterated on ML models using Python and labeled customer email backfill data to improve quote classification, line item extraction, and purchase order detection`,
        `Built a full-featured Kanban board with custom workflows, status transitions, and role-based visibility to manage RFQs and quotes across sales teams`,
        `Architected multi-tenant application security using PostgreSQL Row Level Security in Supabase, supporting multiple steel companies with strict data isolation`,
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
