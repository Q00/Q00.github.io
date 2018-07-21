---
title: AWS-IAM
date: 2018-07-18 23:39:50
tags:
- AWS
- IAM

---

# IAM (Identity and Access Management)

<img src='../img/aws.png'>

식별 및 접근관리

aws 의 각 리소스에대해 접근제어와 권한관리 제공
리소스가아닌 옵션이므로 따로 사용요금은 존재하지 않음

- 권한받은 유저만 접근가능

- EC2 인스턴스에서 APi로 AWS 리소스에 접근하려면 항상 액세스키, 시크릿키를 설정해야만함
- auto scailing 기능으로 ec2 인스턴스를 자동으로 늘려나갈때 IAM 역할을 사용하면 ec2인스턴스 생성 즉시 API로 aws리소스에 접근가능

- 모든 리전에서 사용가능함

- IAM rule을 지정하면 인스턴스 생성시 rule을 지정해줄 수 잇음, IAM rule삭제시 인스턴스에서 aws리소스로 접근하는 권한이 사라짐 주의

- 사용자는 IAM rule 한개에만 적용받을 수 있음