---
title: AWS-S3
date: 2018-07-15 17:32:01
tags:
---

# S3 ( Amazon Simple Storage Service)

<img src='../img/aws.png'>

인터넷용 스토리지 서비스. 개발자가 보다 쉽게 웹 규모 컴퓨팅 작업이 가능하도록 설계

> 언제 어디서나 원하는 양의 데이터를 저장하고 검색가능

## S3를 써야하는 이유
성능, 비용, 대용량의 파일을 ec2와 EBS를 통해 구축한다면 상당히 많은 비용이 들고 노력이 요구된다.
> S3 는 저장용량이 무한대, 파일 저장에 최적화, 비용도 저렴

> S3 자체가 수천대의 웹서버로 구성, 자동 횡적확장(auto scailing) 부한분산 (load balancing) 신경쓰지 않아도 된다.

S3 url(endpoint) 를 dns 서버에 cname으로 설정하여 정적 웹페이지 index로 접속할 수 있게 해준다.
> 동적웹페이지(asp, jsp, php..)와 정적 웹페이지가 섞여 있다면 동적 웹페이지만 ec2에서 서비스, 정적 웹페이지는 S3 이용하면 성능 높일 수 있다.

## S3 기본 개념
object : S3에 데이터가 저장되는 최소단위, 파일과 메타데이터로 구성, key-value로 구성
> 메타 데이터는 http content type 형식 (MIME) 파일의 확장자에 따라 자동으로 설정되며 임의로 설정할 수도 있음
> 객체의 개수는 제한 없으나 객체 하나당 용량은 5TB로 제한. (Each object can contain up to 5 TB of data)

### 헤더설정
- cached control : 브라우저 캐시정책설정, 만기시간 설정
- content disposition : value에 attachment로 설정하면 바로 파일 다운로드 할 수 있게함
- content type : 웹 브라우저에서 파일을 어떻게 처리해야하는지 알려주는 메타데이터


## S3 데이터 일관성 모델

- S3는 읽기 후 쓰기 일관성 제공함(Write-After-Read consistency for a type of PUT)
- 단일 키에 대한 업데이트는 원자성에 바탕을 둠 (Atomic) ->> 최종 일관성(eventual consistency)
- S3에서는 Amaon 여러 서버로 데이터 복제 -> 고가용성 구현 
- 변경사항 발생시 변경사항이 완전히 전파될 때 까지 기존의 데이터를 사용할 수 있음

### S3 멀티파트 업로드
resume on failure, and restart
> https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/dev/uploadobjusingmpu.html