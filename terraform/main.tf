terraform {
  backend "s3" {
    key            = "state"
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.52.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
  
  required_version = ">= 1.1.0"
}

provider "aws" {
  region = "us-east-1"
}

module "VizVectar" {
  source    = "./module"
  app_id    = var.applications["VizVectar"]
  instance_type = var.instance_type
}

module "Chyron" {
  source    = "./module"
  app_id    = var.applications["Chyron"]
  instance_type = var.instance_type
}

module "TagVS" {
  source    = "./module"
  app_id    = var.applications["TagVS"]
  instance_type = var.instance_type
}

module "Telos" {
  source    = "./module"
  app_id    = var.applications["Telos"]
  instance_type = var.instance_type
}
