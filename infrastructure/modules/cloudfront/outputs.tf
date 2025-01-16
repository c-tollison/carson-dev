output "main_domain_name" {
    value = aws_cloudfront_distribution.main.domain_name
}

output "main_hosted_zone_id" {
    value = aws_cloudfront_distribution.main.hosted_zone_id
}

output "main_arn" {
    value = aws_cloudfront_distribution.main.arn
}