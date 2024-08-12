resource "aws_cloudfront_origin_access_control" "s3" {
    name                              = "S3 OAC"
    description                       = "S3 Origin Access Control"
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "subdomain" {
    origin {
        domain_name             = var.sub-domain-regional-domain-name
        origin_id               = "S3-${var.static-app-domain}"
        origin_access_control_id = aws_cloudfront_origin_access_control.s3.id
    }

    enabled             = true
    is_ipv6_enabled     = true
    default_root_object = "index.html"
    aliases             = [var.static-app-domain]
    price_class     = "PriceClass_100"

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "S3-${var.static-app-domain}"

        forwarded_values {
            query_string = false
        cookies {
            forward = "none"
        }
        }

        viewer_protocol_policy = "redirect-to-https"
        min_ttl                = 0
        default_ttl            = 3600
        max_ttl                = 86400
    }

    viewer_certificate {
        acm_certificate_arn = var.certificate-arn
        ssl_support_method  = "sni-only"
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    tags = {
        Name = "${var.project-name}-sub-domain-cloudfront"
    }
}

resource "aws_cloudfront_distribution" "root_domain" {
    origin {
        domain_name                 = var.root-regional-domain-name
        origin_id                   = "S3-${var.root-domain}"
        origin_access_control_id    = aws_cloudfront_origin_access_control.s3.id
    }

    enabled         = true
    is_ipv6_enabled = true
    aliases         = [var.root-domain]
    price_class     = "PriceClass_100"

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "S3-${var.root-domain}"

            forwarded_values {
                query_string = false
            cookies {
                forward = "none"
            }
        }

        viewer_protocol_policy = "redirect-to-https"
        min_ttl                = 0
        default_ttl            = 0
        max_ttl                = 0
    }

    viewer_certificate {
        acm_certificate_arn = var.certificate-arn
        ssl_support_method  = "sni-only"
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    tags = {
        Name = "${var.project-name}-root-domain-cloudfront"
    }
}