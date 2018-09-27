---
title: AWS-CloudFront
date: 2018-07-29 20:19:14
tags:
- AWS
- CloudFront
---

# CloudFront

<img src = 'https://q00.github.io/img/cloudfront_logo.jpg'>

전세계에 파일을 빠른 속도로 배포하는 cdn서비스

- 세계 곳곳에 서버 구축하는 것이 어렵기 때문 (리전생성포함)
 에지로케이션(캐시서버)으로 파일을 다운받으므로 속도가 빨라짐
리전에서 멀리떨어진 곳은 클라우드프론트를 통해 에지로케이션에 캐시하면 빠른 성능을 낼 수 있음

- 초당 최대 10000개 request 처리가능

## cloudFront 와 일반적인 CDN서비스 차이
- 동적콘텐츠 전송(Dynamic Content Delivery) 지원
- url 규칙에 따라 정적페이지는 캐시, 동적페이지는 바로 ec2인스턴스로 접속하도록 구성
- RestFul API 지원 post put delete options patch 메서드는 캐시되지않고 곧바로 오리진 전달
- http쿠키 지원
- 동영상 전송위한 라이브 스트리밍 프로토콜 지원
- 사용한만큼만 지불(선약정, 최소약정없음)

## CloundFront 배포
* CloudFront가 지원하는 origin
    s3 : 기본적인 origin
    ec2 인스턴스 : ec2인스턴스에 웹서버 구축하면 오리진으로 사용
    elb(elastic load balancing) : ec2인스턴스 여러대의 부하를 분산하는 elb도 오리진으로 사용가능
    aws이외의 웹서버: 사용가능

* distribution : 에지로케이션의 집합으로 이루어진 CDN
    web Distribution - Website에서 많이 사용됨
    RTMP - 미디어 스트리밍에서 사용됨

origin domane name : 커스텀 오리진을 사용하려면 이곳에 오리진 서버의 도메인을 설정하면 됨
origin access identity : 오리진 접근 식별자
ec2인스터스의 public dns입력
origin id : 자동생성(오리진 구분id)
path pattern : cloudFront 로 파일을 가져올 규칙, 기본값은 *로 설정되어잇어 모든파일을 가져오게됨. distribution 생성 후 따로 추가가능
viewer protocol policy : cloudFront로 보여질 프로토콜 정책을 설정함.
allow http method ; get,head,post, patch, delete, option, put : 파일을 읽기만 할때 선택
get head put post patch delete options : 동적 콘텐츠 전송을 사용할때 선택
comment : 식별자 이름
grant read permission on bucket : cloudfront가 bucket을 읽을 수 있는 권한 - yes면 못봄
restrict bucket access : 클라우드프론트만 접근할 수 있는 권한 설정
forward cookie : 쿠키를 클라이언트로 전달할건지
ec2인스턴스를 오리진으로 사용할때 ec2인스턴스에 eip연결햇는지 확인필요, ec2인스턴스 재부팅후 ip주소 변경으로 public dns사용 불가능, 이후 cloudFront에서는 오리진에 접속할 수 없어 캐시기능 동작하지 않음

>signed url이용
 
canned policy 를 사용한 sinedurl : 파일1개의 사용제한, 정책내용이 url에 포함되어있지않음
custom policy 를 사용한 sinedurl : 파일 여러개 사용제한, 특정ip ip대역대에서만 파일 받는 기능, 날짜 지나면 파일제한기능,날짜이후에 다운로드기능... 정책이 포함되어있음

signature 생성 후 : 접속

cloudFront를 signed url로 제한하더라도 s3의 접근권한이 열려있으면 접근가능함. Resctrict bucket access 설정
s3이외의 ec2인스턴스나 외부웹서버가 오리진이라면 웹서버레벨에서 http헤더의 user-agent 내용확인 -> cloudFront에서오면 Amazon CloudFront가 user-agent임

restrict viewer access: sined url로 클라우드프론트 사용 제한 설정

invalidation으로 cloudfront 콘텐츠 갱신

price class : 필요없는 지역을 제외할때 사용 (ex. use US only 등등)

forward query string

cloudfront 캐시유지시간 24시간, 오리진 http헤더 캐시설정을 이용해 캐시유지시간 설정가능

### Cloudfront log file 생성
> 참고 : https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html