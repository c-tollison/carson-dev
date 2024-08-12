resource "aws_s3_bucket" "sub_domain" {
    bucket          = var.static-app-domain
    force_destroy   = true

    tags = {
        Name = "${var.project-name}-sub-bucket"
    }
}

resource "aws_s3_bucket" "root_domain" {
    bucket          = "${var.domain-name}"
    force_destroy   = true

    tags = {
        Name = "${var.project-name}-root-bucket"
    }
}

resource "aws_s3_bucket_website_configuration" "sub_domain" {
    bucket = aws_s3_bucket.sub_domain.id
    
    index_document {
        suffix = "index.html"
    }
}

resource "aws_s3_bucket_website_configuration" "root_domain" {
    bucket = aws_s3_bucket.root_domain.id

    redirect_all_requests_to {
        host_name   = var.static-app-domain
        protocol    = "HTTPS"
    }
}

resource "aws_s3_bucket_policy" "website" {
    bucket = aws_s3_bucket.sub_domain.id
    policy = data.aws_iam_policy_document.allow_cloudfront.json
}

data "aws_iam_policy_document" "allow_cloudfront" {
    statement {
        actions   = ["s3:GetObject"]
        resources = ["${aws_s3_bucket.sub_domain.arn}/*"]
        principals {
            type        = "Service"
            identifiers = ["cloudfront.amazonaws.com"]
        }
        condition {
            test     = "StringEquals"
            variable = "AWS:SourceArn"
            values   = [var.cloudfront-arn]
        }
    }
}