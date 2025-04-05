import PageWrapper from '../../components/page-wrapper';

export default function AmazonPt2() {
    return (
        <PageWrapper>
            <div className='py-10 flex flex-row justify-between items-center'>
                <div>
                    <h1 className='text-5xl font-bold text-primary'>Amazon - APM</h1>
                    <h2 className='text-2xl font-semibold'>Software Development Engineer Intern</h2>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 text-muted-foreground'>
                        <h3>May 2023 - Aug 2023</h3>
                        <h4>Seattle, WA</h4>
                    </div>
                </div>
                <div className='hidden md:block w-16 h-16 flex-shrink-0'>
                    <img
                        src='./../amazon.png'
                        alt='Amazon'
                        className='w-full h-full object-contain rounded-md'
                    />
                </div>
            </div>

            <section>
                <h3 className='text-xl font-semibold border-b border-border pb-4 mb-4'>Quick Points</h3>
                <ul className='list-disc list-outside mb-4'>
                    <li>
                        Devised and executed an event-driven architecture with AWS Lambda, S3, and DynamoDB to process
                        and analyze product data, expediting clawback initiatives for millions of ASINs
                    </li>
                    <li>
                        Crafted a memory-efficient file reader abstraction in Java, boosting data processing speed by
                        25% and enhancing file type handling
                    </li>
                    <li>
                        Implemented comprehensive unit and integration tests, achieving over 90% code coverage to
                        strengthen system reliability
                    </li>
                </ul>
            </section>

            <section>
                <h3 className='text-xl font-semibold border-b border-border pb-4 mb-4'>My Experience</h3>
                <div className='leading-relaxed flex flex-col gap-4'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                </div>
            </section>
        </PageWrapper>
    );
}
