resource "aws_route53_record" "cert_validation" {
    for_each = {
        for dvo in var.domain_validation_options : dvo.domain_name => {
            name   = dvo.resource_record_name
            record = dvo.resource_record_value
            type   = dvo.resource_record_type
        }
    }

    zone_id = var.route53_zone_id
    name    = each.value.name
    type    = each.value.type
    ttl     = 60
    records = [each.value.record]
}

resource "aws_route53_record" "root_domain" {
    zone_id = var.route53_zone_id
    name    = var.domain_name
    type    = "A"

    alias {
        name                   = var.cloudfront_main_domain_name
        zone_id                = var.cloudfront_main_hosted_zone_id
        evaluate_target_health = true
    }
}

resource "aws_route53_record" "www_domain" {
    zone_id = var.route53_zone_id
    name    = "www.${var.domain_name}"
    type    = "A"

    alias {
        name                   = var.cloudfront_main_domain_name
        zone_id                = var.cloudfront_main_hosted_zone_id
        evaluate_target_health = true
    }
}