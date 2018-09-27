---
title: AWS-SQS
date: 2018-08-04 00:27:29
tags:
- AWS
- SQS
---

# SQS (Simple Queue Service)

<img src = "https://a.slack-edge.com/ae7f/img/services/amazon-sqs_512.png"> 출처 : https://slack.com/apps/A0F827G56-amazon-sqs

빠르고 안정적이고 내구성 있는 메시지 큐 서비스

## SQS의 장점
- Security : Server-side Encryption과 AWS KMS의 키를 이용해 대기열의 메시지 보호
- durability : 메시지의 안정성을 위해 여러서버에 저장
- availability :using redundant infrastructure
- scalability
- Reliability : SQS lock message during processing
- Customization

## SQS SNS MQ

SQS SNS 는 확장성이 뛰어나고 사용하기 쉽고 메시지 브로커를 설정할 필요없는 서비스
MQ는 메시지 브로커서비스, 기존 메시지 브로커에서 응용 프로그램을 마이그레이션하는 경우 권장

## SQS 종류
- Standard Queue : Available in all regions.
    - unlimited Througput(무제한 처리량)
    - At-least-once Delivery(higly distributed architecture 로 인해 복사번을 한번이상보낼 수도 있음)
    - best-effort ordering(순서가 다를수도 있음)
- FIFO Queue : Available US EAST(Virginia, Ohio) US WEST(Oregon), EU(Ireland)
    - Maximum 3000(300 transaction per second)
    - Exactly-Once Processing
    - FIFO

## SQS info
pull-based(not push based)
Message (256KB)
큐에 1분에서 14일까지 있을 수 있음
기본 보유기간 : 4일
visibility Timeout(제한 시간 초과) :  분산 시스템인 SQS는 메시지를 실제로 받는지 보장할 수 없고 삭제하지 않음. 메시지를 수신 및 처리할 수 없는 기간 설정 기본 30초 최대 12시간
> will be hidden from other consumer

거의 모든 경우에 SQS long polling이 SQS short polling보다 바람직함
> 즉각적인 메시지 처리가 필요한 경우. 단일 스레드에서 여러 대기열을 폴링하는 경우 - 해당 경우에만 short polling이 바람직함

## SQS vs SWF
- SQS 
    - offers message-oriented API
    - handle duplicate
- SWF 
    - presents a task-oriented API
    - never duplicated
