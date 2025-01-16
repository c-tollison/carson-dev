module "acm" {
    source          = "./modules/acm"

    domain_name     = var.domain_name
    project_name    = var.project_name
}

module "route53" {
    source                              = "./modules/route53"

    route53_zone_id                 = var.route53_zone_id
    domain_validation_options       = module.acm.domain_validation_options
    domain_name                     = var.domain_name
    cloudfront_main_domain_name     = module.cloudfront.main_domain_name
    cloudfront_main_hosted_zone_id  = module.cloudfront.main_hosted_zone_id
}

resource "aws_acm_certificate_validation" "cert"  {
    certificate_arn         = module.acm.arn
    validation_record_fqdns = [for record in module.route53.cert_validation : record.fqdn]
}

module "s3" {
    source = "./modules/s3"

    domain_name         = var.domain_name
    project_name        = var.project_name
    cloudfront_arn      = module.cloudfront.main_arn
}

module "cloudfront" {
    source                           = "./modules/cloudfront"
   
    main_bucket_regional_domain_name = module.s3.bucket_regional_domain_name
    domain_name                      = var.domain_name
    certificate_arn                  = module.acm.arn
    project_name                     = var.project_name

}