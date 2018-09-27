---
title: AWS-EMR
date: 2018-07-15 19:03:27
tags:
- AWS
- EMR
- MapReduce
---

# MapReduce
- HDFS에 분산 저장된 데이터에 스트리밍 접근을 요청하며 빠르게 분산처리하도록 고안된 프로그래밍 모델이자 병렬 기법
- 대규모 분산 컴퓨팅 혹은 단일 컴퓨팅 환경에서 개발자가 대량의 데이터를 parallel하게 분석하게 분석할 수 있음
- 정보 검색을 위한 데이터가공(색인어 추출, 정렬 및 역 인덱스 생성)을 목적으로 개발됨

# Amazon Elastic Map Reduce (EMR)

<img src='https://q00.github.io/img/aws.png'>

- AWS에서 제공하는 Mapreduce service
- 오픈 소스인 AWS 하둡, apache spark, Hbase와 같은 분산 프레임워크를 활용하여 분산 처리 시스템을 실행하고, 다른 서비스들과 연동할 수 있는 서비스
> 클릭 스트림 분석, 실시간 분석, 로그분석

- ec2 컴퓨터와 S3의 하드를 이용하여 MapReduce 연산 진행 - 가장 load가 큰 작업은 IO작업

## create EMR

- Cluster : 연산을 담당하는 EC2, job을 정의하는 Step, hadoop등 프레임워크 모음
> 클러스터에서 하드웨어와 소프트웨어 환경을 구성한뒤 MapReduce를 실행함

- Logging
>클러스터의 활동 기록 - S3에 버킷 형태로 저장

- Action on failure
> 대부분의 과금 원인

- allow root access