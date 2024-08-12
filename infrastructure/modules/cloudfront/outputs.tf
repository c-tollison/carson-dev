output "subdomain-distribution-domain-name" {
    value = aws_cloudfront_distribution.subdomain.domain_name
}

output "root-distribution-domain-name" {
    value = aws_cloudfront_distribution.root_domain.domain_name
}

output "subdomain-distribution-arn" {
    value = aws_cloudfront_distribution.subdomain.arn
}