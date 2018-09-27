---
title: AWS-IAM
date: 2018-07-18 23:39:50
tags:
- AWS
- IAM

---

# IAM (Identity and Access Management)

<img src='https://q00.github.io/img/aws.png'>

식별 및 접근관리

aws 의 각 리소스에대해 접근제어와 권한관리 제공
리소스가아닌 옵션이므로 따로 사용요금은 존재하지 않음

- 권한받은 유저만 접근가능

- EC2 인스턴스에서 APi로 AWS 리소스에 접근하려면 항상 액세스키, 시크릿키를 설정해야만함
- auto scailing 기능으로 ec2 인스턴스를 자동으로 늘려나갈때 IAM 역할을 사용하면 ec2인스턴스 생성 즉시 API로 aws리소스에 접근가능

- 모든 리전에서 사용가능함 

- IAM rule을 지정하면 <b>인스턴스 생성</b>시 rule을 지정해줄 수 잇음, IAM rule삭제시 인스턴스에서 aws리소스로 접근하는 권한이 사라짐 주의

- 사용자는 IAM rule 한개에만 적용받을 수 있음

- Power User 는 IAM에 있는 그룹과 유저관리를 제외한 모든 AWS서비스에 접근할 수 있다.

- IAM group은 사용자 당 열개의 그룹에 속할 수 있음

IAM  기능
- Centralised control of AWS account
- Shared Access to AWS account
- Granualr permmission
- Identity Federation(Active Directory, 등등)
- allows to set up own password rotation policy
- pci dss support