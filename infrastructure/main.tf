locals {
    static-app-domain      = "${var.app-subdomain}.${var.domain-name}"
}

module "acm" {
    source          = "./modules/acm"

    domain-name     = var.domain-name
    project-name    = var.project-name
}

module "route53" {
    source                              = "./modules/route53"

    domain-validation-options           = module.acm.domain_validation_options
    route53-zone-id                     = var.route53-zone-id
    domain-name                         = var.domain-name
    cloudfront-subdomain-domain-name    = module.cloudfront.subdomain-distribution-domain-name
    cloudfront-root-domain-name         = module.cloudfront.root-distribution-domain-name
}

resource "aws_acm_certificate_validation" "cert"  {
    certificate_arn         = module.acm.arn
    validation_record_fqdns = [for record in module.route53.cert-validation : record.fqdn]
}

module "s3" {
    source = "./modules/s3"

    domain-name         = var.domain-name
    project-name        = var.project-name
    static-app-domain   = local.static-app-domain
    cloudfront-arn      = module.cloudfront.subdomain-distribution-arn
}

module "cloudfront" {
    source                              = "./modules/cloudfront"
    
    sub-domain-bucket-website-endpoint  = module.s3.sub-domain-bucket-website-endpoint
    root-domain-bucket-website-endpoint = module.s3.root-domain-bucket-website-endpoint
    static-app-domain                   = local.static-app-domain
    root-domain                         = var.domain-name
    certificate-arn                     = module.acm.arn
    project-name                        = var.project-name
}