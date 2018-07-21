---
title: AWS-ELB
date: 2018-07-18 00:28:00
tags:
- AWS
- ELB
---

# ELB ( Elastic Load Balancer )

<img src = '../img/elb.png'>

부하분산과 고가용성을 제공하는 프로그램으로서 일종의 L4와 같은 로드밸런서

* 최소 2개 이상의 인스턴스가 각기 다른 AZ에 존재해야함

- L4(OSI Layer 4) : OSI 레이어에서 4번째 전송계층을 뜻함, TCP UDP 등의 프로토콜이 대표적이며 포트번호로 구분함, OSI레이어에서 네트워크 계층의 IP와 묶어서 처리
> IP주소와 포트번호를 기준으로 트래픽 분배

- L7 : OSI레이어에서 7번째 어플리케이션계층을 뜻함
http프로토콜이 대표적 http헤더의 내용을 기준으로 트래픽 분배
> Application Load Balancer

- 로드밸런싱 알고리즘 : 트래픽을 각 ec2 인스턴스로 분배할때 사용하는 알고리즘, 라운드로빈이라는 알고리즘을 사용, 우선순위를 두지 않고 순서대로 분배하는 방식

- Multiple zone support
Cross-zone load balancing
