variable "applications" {
  description = "A map of applications to be deployed with their respective application_id"
  type        = map(string)
}

variable "instance_type" {
  description = "Instance type for the EC2 instances"
  type        = string
  default     = "t2.micro"
}
