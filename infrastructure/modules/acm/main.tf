resource "aws_acm_certificate" "cert" {
    domain_name                 = var.domain_name
    subject_alternative_names   = ["www.${var.domain_name}"]
    validation_method           = "DNS"
    key_algorithm               = "RSA_2048"

    tags = {
        Name = "${var.project_name}-certificate"
    }

    lifecycle {
        create_before_destroy = true
    }
}