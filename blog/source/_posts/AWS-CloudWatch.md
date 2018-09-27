---
title: AWS-CloudWatch
date: 2018-07-29 18:42:00
tags:
- AWS
- CloudWatch
---

#CloudWatch

<img src = "https://i0.wp.com/assistedcloud.com/wp-content/uploads/2017/08/cloudwatch.png?fit=500%2C500&ssl=1">(출처 : https://assistedcloud.com)

AWS 클라우드 리소스 , AWS 어플리케이션 서비스 모니터링(performance monitoring)

- 로그파일 수집, 모니터링
- 시스템 전반의 가시성 확보
- Dashboard를 통해 확인 가능
- Alarm
- CloudWatch Event는 AWS resource 상태 변화에 대한 대응에 도움됨

- Standard Monitoring : 5 Minutes
- Detail Monitoring : 1 Minute

Dashboard
Alrms
Event : Respond to state changes in AWS Resource
- logging : 
    - diffrence with Cloudtrail (only API logging)
    - 메모리는 로깅 못함
    - client connection information 로깅못함
    - data, cpu, ec2 status check failed