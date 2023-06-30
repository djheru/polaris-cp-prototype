variable "applications" {
  description = "A map of applications to be deployed with their respective application_id"
  type        = map(string)
}

variable "instance_type" {
  description = "Instance type for the EC2 instances"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instances"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID for the EC2 instances"
  type        = string
}

variable "security_group_id" {
  description = "Security Group ID for the EC2 instances"
  type        = string
}