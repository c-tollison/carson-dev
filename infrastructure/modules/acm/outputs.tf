output "domain_validation_options" {
    value = aws_acm_certificate.cert.domain_validation_options
}

output "arn" {
    value = aws_acm_certificate.cert.arn
}