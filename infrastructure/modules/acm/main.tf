resource "aws_acm_certificate" "cert" {
    domain_name                 = var.domain-name
    subject_alternative_names   = ["*.${var.domain-name}"]
    validation_method           = "DNS"
    key_algorithm               = "RSA_2048"

    tags = {
        Name = "${var.project-name}-certificate"
    }

    lifecycle {
        create_before_destroy = true
    }
}