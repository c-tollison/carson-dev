output sub-regional-domain-name {
    value = aws_s3_bucket.sub_domain.bucket_regional_domain_name
}

output root-regional-domain-name {
    value = aws_s3_bucket.root_domain.bucket_domain_name
}