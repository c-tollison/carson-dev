output sub-domain-regional-domain-name {
    value = aws_s3_bucket.sub_domain.bucket_regional_domain_name
}

output root-domain-website-endpoint {
    value = aws_s3_bucket.root_domain.website_endpoint
}