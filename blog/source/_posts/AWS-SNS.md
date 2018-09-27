---
title: AWS-SNS
date: 2018-08-04 01:25:02
tags:
- AWS
- SNS
---

# SNS (Simple Notification Service)

<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/AWS_Simple_Icons_Messaging_Amazon_SNS.svg/480px-AWS_Simple_Icons_Messaging_Amazon_SNS.svg.png">

메시지 전달, 또는 전송을 컨트롤 하는 서비스
publisher 와 subscriber로 나뉜다.

Instantaneous, push-bashed(no polling)

publisher는 비동기적으로 subscriber와 소통한다.(웹, 모바일 앱, SQS, aws lambda 등등)

0.5$ per 1 million sns request
0.06$ 100000 http notification
0.75 per 100 sms
2$ 100000 email

### SNS와 SQS를 사용하여 확장성 높이기
> 참고 : http://hochulshin.com/aws-s3-sns-sqs-event/

### 활용사례
- 팬아웃 : 다중 subscriber로 메시지 전송, 예를 들어 실서버와 개발 서버로 나누어 데이터 복제하여 한 곳은 서비스, 한곳은 테스트 할 수 있음

- 어플리케이션 및 시스템 경보
- 푸시 이메일, 문자 메시지
- 모바일 푸시 알림 
- 메시지 지속성 (가용성 내구성)

