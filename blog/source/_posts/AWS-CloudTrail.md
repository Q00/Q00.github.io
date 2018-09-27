---
title: AWS-CloudTrail
date: 2018-07-15 21:59:30
tags:
- AWS
- CloudTrail
---

# CloudTrail

<img src='https://q00.github.io/img/aws.png'>

CloudTrail 은  AWS 계정의 거버넌스, 규정 준수, 운영 및 위험 감사(risk auditing)를 활성화하도록 도와주는 AWS 서비스

- Per AWS account, per region basis 옵션 설정 가능

- log는 아마존 single s3 버킷에 저장됨



- AWS 인프라에서 API 호출기록

- 작동방식 :
1. S3 버킷정의
2. API 활동 생성
3. CloudTrail은 API 활동 기록
4. API 호출로그가 S3 버킷에 전달, CloudWatch 이벤트로 전달

>  참조 : http://jayendrapatil.com/tag/cloudtrail/

