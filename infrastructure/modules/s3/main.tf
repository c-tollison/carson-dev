resource "aws_s3_bucket" "main" {
    bucket        = var.domain_name  
    force_destroy = true

    tags = {
        Name = "${var.project_name}-main-bucket"
    }
}

resource "aws_s3_bucket_website_configuration" "main" {
    bucket = aws_s3_bucket.main.id
    
    index_document {
        suffix = "index.html"
    }

    error_document {
      key = "index.html"
    }
}

data "aws_iam_policy_document" "allow_cloudfront" {
    statement {
        actions   = ["s3:GetObject"]
        resources = ["${aws_s3_bucket.main.arn}/*"]
        principals {
            type        = "Service"
            identifiers = ["cloudfront.amazonaws.com"]
        }
        condition {
            test     = "StringEquals"
            variable = "AWS:SourceArn"
            values   = [var.cloudfront_arn]
        }
    }
}

resource "aws_s3_bucket_policy" "main" {
    bucket = aws_s3_bucket.main.id
    policy = data.aws_iam_policy_document.allow_cloudfront.json
}