import { ArticleI } from './articles-array';
import { ARTICLE_SEGMENT_TYPE } from './article-segment.enum';

const deployingWebsiteS3Cloudfront: ArticleI = {
    title: 'Deploying a Website to S3 and CloudFront with OpenTofu',
    description:
        'Walkthrough on deploying a website to AWS S3 with CloudFront using OpenTofu. We also setup a CloudFront function to redirect www to non-www.',
    route: 'deploying-website-s3-cloudfront',
    date: '2025-01-21',
    displayImage: 'open-tofu.png',
    segments: [
        {
            type: ARTICLE_SEGMENT_TYPE.TEXT,
            text: "In this article we are going to go through the steps to deploy a website to AWS S3 and CloudFront using OpenTofu. It's a bit of a process, but it's worth it in the end. Having infrastructure as code is a great way to manage resources. I do enjoy using Terraform for this purpose, though there is a bit of a learning curve. Also since Terraform is no longer open source, we are going to use OpenTofu. OpenTofu is a fork of Terraform that is open source and free to use. It's a great alternative to Terraform and has a lot of the same features.",
        },
        {
            type: ARTICLE_SEGMENT_TYPE.TEXT,
            text: "First, let's create a new directory for our project and initialize it with OpenTofu. We can do this by running the following commands:",
        },
        {
            type: ARTICLE_SEGMENT_TYPE.CODE,
            text: `
mkdir infrastructure
cd infrastructure
tofu init
    `,
        },
    ],
    tags: ['AWS', 'S3', 'CloudFront', 'OpenTofu'],
};

export default deployingWebsiteS3Cloudfront;
