import WorkPage from '../../components/work-page';
import FeluxLogo from '../../components/icons/felux-logo';

export default function Felux() {
    const points: string[] = [
        `Reduced manual data entry time by 90% by architecting LLM-powered email ingestion pipelines using Gemini 2 Flash to transform hundreds of unstructured RFQs into structured CRM data in real time`,
        `Improved quote and document classification accuracy by 30% by training Python machine learning models on historical email datasets`,
        `Streamlined quote and RFQ lifecycle management for multiple sales teams by developing a Kanban workflow platform featuring role-based access control and dynamic status transitions`,
        `Enabled secure multi-tenant operations for distinct steel companies by implementing PostgreSQL Row Level Security policies in a Supabase backend`,
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
