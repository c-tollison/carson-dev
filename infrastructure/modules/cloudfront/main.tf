resource "aws_cloudfront_origin_access_control" "s3" {
    name                              = "S3OAC"
    description                       = "Origin Access Control for S3"
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "main" {
    origin {
        domain_name               = var.main_bucket_regional_domain_name
        origin_id                 = "S3-${var.domain_name}"
        origin_access_control_id  = aws_cloudfront_origin_access_control.s3.id
    }

    enabled             = true
    is_ipv6_enabled     = true
    default_root_object = "index.html"

    aliases = [
        var.domain_name
    ]

    price_class = "PriceClass_100"

    custom_error_response {
        error_code         = 404
        response_page_path = "/index.html"
        response_code      = 200
    }

    custom_error_response {
        error_code         = 403
        response_page_path = "/index.html"
        response_code      = 200
    }

    default_cache_behavior {
        target_origin_id       = "S3-${var.domain_name}"
        viewer_protocol_policy = "redirect-to-https"
        allowed_methods        = ["GET", "HEAD"]
        cached_methods         = ["GET", "HEAD"]

        forwarded_values {
            query_string = false
            cookies {
                forward = "none"
            }
        }

        function_association {
            event_type   = "viewer-request"
            function_arn = aws_cloudfront_function.redirect_www.arn
        }
    }

    viewer_certificate {
        acm_certificate_arn            = var.certificate_arn
        ssl_support_method             = "sni-only"
        minimum_protocol_version        = "TLSv1.2_2021"
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    tags = {
        Name = "${var.project_name}-cloudfront"
    }
}

resource "aws_cloudfront_function" "redirect_www" {
    name    = "redirect-www-to-root"
    runtime = "cloudfront-js-2.0"
    code = file("${path.module}/function.js")
}
