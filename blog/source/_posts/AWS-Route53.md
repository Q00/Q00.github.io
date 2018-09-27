---
title: AWS_Route53
date: 2018-08-04 00:09:55
tags:
- AWS
- Route53
---

# Route 53 

<img src = "http://exrecord.net/wp-content/uploads/sites/6/2016/09/aws_route53.png">출처 : http://exrecord.net/how-to-register-aws-route53

ec2, elb, s3 cloudfront와 연동가능한 dns서비스

- 대규모 글로벌서비스할때 유용
일반적인 dns 서버 : ip1개 이용(현재 50개 지원가능하나 이후 더 추가가능)
일반적인 dns 서버와 차이점
- Latency Based Routing, Weighted Round Robin, Dns Failover, Geo Routing => 도메인 하나를 쿼리하더라도 상황에 따라 다른 ip주소 응답
- Latency Based Routing 현재 위치에서 지연시간이 가장 낮은 리전의 ip주소 응답
- weightred Round Robin : 서버 ip주소나 도메인(ELB)마다 가중치를 부여하여 트래픽을 조절하는 기능.
- DNS Failover : 장애가 발생한 서버의 ip주소 또는 도메인(ELB)알려주지않음

A record : Address record : dns서버에서 ip주소를 알려주도록 설정하는 기능 - elb에도 연결가능하나 predefined된 ip가 없어 alias를 사용하여 사용해야함
alias 사용 가능
routing policy : simple, latency, weightred round robin, failover, geolocation

Route53은 CLoudFront또는 s3와 연결할때 zone APex를 통해 www.를 없애고 url접근
일반적인 dns에서는 CNAME으로 연결할때 루트도메인을 사용할 수 없음

zone apex 루트도메인, 네이키드 도메인, 이름그대로 서브도메인이 붙지 않은 상태

> Route53 지원 레코드
https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#CNAMEFormat

### CNAME Record & Alias Record
- charge for CNAME query
- zone apex 에서 CNAME 레코드 생성 불가능 , alias record 생성 가능
- 어떤 DNS 레코드든 CNAME 가리킬수 있음, alias record는 Aws 리소스중 하나, 해당 호스팅 영역의 레코드만 가리킬 수 있음