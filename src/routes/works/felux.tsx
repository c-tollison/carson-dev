import WorkPage from '../../components/work-page';
import FeluxLogo from '../../components/icons/felux-logo';

export default function Felux() {
    const points: string[] = [
        `Architect full-stack SaaS platform from scratch: Vue.js frontend deployed via Amplify, Hono/Drizzle API on ECS Fargate, PostgreSQL through Supabase, and AWS infrastructure via CDK`,
        `Build end-to-end email ingestion pipeline that syncs users' Outlook inboxes into Felux via Microsoft Graph API, including a historical backfill on first sign-in, converting Felux into users' primary email client`,
        `Design LLM-powered classification system where a custom ML model (Cognita) triages incoming emails, then routes transactions to Gemini Flash for structured extraction into steel-industry formats, reducing manual data entry by 90%`,
        `Enable real-time pipeline processing with a dedicated ingestion server, SQS queues, and Redis, transforming unstructured email volume into structured analytics that let management track transactions at scale`,
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
            <p>Content coming soon...</p>
        </WorkPage>
    );
}
