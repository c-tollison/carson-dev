variable "domain_name" {
    type        = string
    description = "Domain name registered in Route 53"
    default     = "carson-dev.com" 
}

variable "project_name" {
    type        = string
    description = "Project name"
    default     = "carson-dev-site" 
}

variable "route53_zone_id" {
    type        = string
    description = "The Route 53 Hosted Zone ID for the domain"
    default     =  "Z0582374AWGNA0XPENC8"
}

variable "region" {
    type        = string
    description = "The region of deployment in AWS"
    default     = "us-east-1"

    validation {
        condition     = can(regex("[a-z][a-z]-[a-z]+-[1-9]", var.region))
        error_message = "Must be a valid AWS region"
    }
}

variable "profile" {
    type        = string
    description = "AWS account for deployment"
    default     = "admin" 
}