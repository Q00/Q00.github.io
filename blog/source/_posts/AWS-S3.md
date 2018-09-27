---
title: AWS-S3
date: 2018-07-15 17:32:01
tags:
---

# S3 ( Amazon Simple Storage Service)

<img src='https://q00.github.io/img/aws.png'>

인터넷용 스토리지 서비스. 개발자가 보다 쉽게 웹 규모 컴퓨팅 작업이 가능하도록 설계

> 언제 어디서나 원하는 양의 데이터를 저장하고 검색가능

## S3를 써야하는 이유
성능, 비용, 대용량의 파일을 ec2와 EBS를 통해 구축한다면 상당히 많은 비용이 들고 노력이 요구된다.
> S3 는 저장용량이 무한대, 파일 저장에 최적화, 비용도 저렴

> S3 자체가 수천대의 웹서버로 구성, 자동 횡적확장(auto scailing) 부한분산 (load balancing) 신경쓰지 않아도 된다.

S3 url(endpoint) 를 dns 서버에 cname으로 설정하여 정적 웹페이지 index로 접속할 수 있게 해준다.
> 동적웹페이지(asp, jsp, php..)와 정적 웹페이지가 섞여 있다면 동적 웹페이지만 ec2에서 서비스, 정적 웹페이지는 S3 이용하면 성능 높일 수 있다.

## S3 기본 개념
https://s3-regionName.amazonaws.com/s3Name
bucket : 파일 저장
> bucket ACL은 IAM user에만 해당됨
object : S3에 데이터가 저장되는 최소단위, 파일과 메타데이터로 구성, <b>key-value로 구성</b>
> Object based storage로 NO Transactional database임
> 메타 데이터는 http content type 형식 (MIME) 파일의 확장자에 따라 자동으로 설정되며 임의로 설정할 수도 있음
> 객체의 개수는 제한 없으나 객체 하나당 용량은 5TB로 제한. (Each object can contain up to 5 TB of data)

S3 API에는 초당 요청에 제한이 있음( 100 PUT/LIST/DELETE or 300 GET )
> anticipate over 100 request per second, add a random prefix to the key names(should avoid sequential key name) => 무작위성을 부여해야 여러 파티션으로 나뉘어 작업가능해짐

- protect data from accidential deletion
>versioning S3:  Amazon S3 버킷에 저장된 모든 버전의 모든 객체를 보존, 검색 및 복원가능. 또한 의도치 않은 사용자 작업 및 애플리케이션 장애로부터 쉽게 복구
> 버킷 버전관리(bucket versionig)를 통해 S3 lifecycle policy 관리 가능
>enable Multi-factor authentication(MFA)

### 헤더설정
- cached control : 브라우저 캐시정책설정, 만기시간 설정
- content disposition : value에 attachment로 설정하면 바로 파일 다운로드 할 수 있게함
- content type : 웹 브라우저에서 파일을 어떻게 처리해야하는지 알려주는 메타데이터

## S3 Storage Tiers
- S3 standard : 99.99% 가용성, 99.999999999% 내구성
- S3 IA : Infrequenly Access -> 잘접근안하지만 glacier와는 다르게 빠른 접근속도, S3보다 싸나 검색비용이 부과됨 - durability : 99.999999999%
- S3 One Zone IA : IA 중에서 multiple Availibility Zone이 요구되지 않는 것(장애 대처안함)
- Glacier : 엄청 싸고 보관용, 데이터를 검색하고 가져오는 시간이 매우김. - nativley encrypt

* RRS : Reduced Redundancy Stoage
availablity : 99.99 % durability : 99.99%

## S3 데이터 일관성 모델

- S3는 읽기 후 쓰기 일관성 제공함(Read-after-write consistency for a type of PUT) -> PUTS of new object
- 단일 키에 대한 업데이트는 원자성에 바탕을 둠 (Atomic) ->> 최종 일관성(eventual consistency) -> overwrite PUTS and DELETES
- S3에서는 Amaon 여러 서버로 데이터 복제 -> 고가용성 구현 
- 변경사항 발생시 변경사항이 완전히 전파될 때 까지 기존의 데이터를 사용할 수 있음(can take some time to propagate)

## S3 encryption
Server Side Encryption (SSE)-S3, SSE-C, SSE-KMS

### S3 멀티파트 업로드
resume on failure, and restart
대형 객체를 여러 개로 나누어 업로드 가능 - 용량 큰 파일 실패할때
> https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/dev/uploadobjusingmpu.html

### CloudTrail & Server access logging
CloudTrail : API traking 
Server access logging : visibility into object-level opration