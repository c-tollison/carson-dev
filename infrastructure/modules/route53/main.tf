resource "aws_route53_record" "cert-validation" {
    for_each = {
        for dvo in var.domain-validation-options : dvo.domain_name => {
            name   = dvo.resource_record_name
            record = dvo.resource_record_value
            type   = dvo.resource_record_type
        }
    }

    allow_overwrite = true
    name            = each.value.name
    records         = [each.value.record]
    ttl             = 60
    type            = each.value.type
    zone_id         = var.route53-zone-id
}

resource "aws_route53_record" "www" {
    zone_id = var.route53-zone-id
    name    = "www.${var.domain-name}"
    type    = "A"

    alias {
        name                   = var.cloudfront-subdomain-domain-name
        zone_id                = "Z2FDTNDATAQYW2"
        evaluate_target_health = false
    }
}

resource "aws_route53_record" "root" {
    zone_id = var.route53-zone-id
    name    = var.domain-name
    type    = "A"

    alias {
        name                   = var.cloudfront-root-domain-name
        zone_id                = "Z2FDTNDATAQYW2"
        evaluate_target_health = false
    }
}