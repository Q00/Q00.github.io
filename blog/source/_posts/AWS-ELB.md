---
title: AWS-ELB
date: 2018-07-18 00:28:00
tags:
- AWS
- ELB
---

# ELB ( Elastic Load Balancer )

<img src = 'https://q00.github.io/img/elb.png'>

부하분산과 고가용성을 제공하는 프로그램으로서 일종의 L4와 같은 로드밸런서

* 최소 2개 이상의 인스턴스가 각기 다른 AZ에 존재해야함

- L4(OSI Layer 4) : OSI 레이어에서 4번째 전송계층을 뜻함, TCP UDP 등의 프로토콜이 대표적이며 포트번호로 구분함, OSI레이어에서 네트워크 계층의 IP와 묶어서 처리
> IP주소와 포트번호를 기준으로 트래픽 분배

- L7 : OSI레이어에서 7번째 어플리케이션계층을 뜻함
http프로토콜이 대표적 http헤더의 내용을 기준으로 트래픽 분배
> Application Load Balancer

- 로드밸런싱 알고리즘 : 트래픽을 각 ec2 인스턴스로 분배할때 사용하는 알고리즘, 라운드로빈이라는 알고리즘을 사용, 우선순위를 두지 않고 순서대로 분배하는 방식

- Connection Draining : Auto Scailing이 사용자의 요청을 처리중인 ec2 인스턴스를 바로 삭제하지 못하도록 방지하는 기능

- sticky sessions:  사용자의 세션을 확인하여 적절한 ec2인스턴스로 트래픽을 분배하는 기능(http쿠키를 이용한 세션) *l7의기능
> sticky session을 사용하려면 ELB에서 SSL이 종료된(terminated) HTTPS listener가 필요함
- SSL 인증방식을 쓰려면 TCP 프로토콜을 사용
- ELB HTTPS listener does not support Client-Side SSL certificates
- latency : elb 로드밸런서와 ec2인스턴스간 지연시간
- Surge Queue Length : 큐에 남아잇는 요청의 개수
- splitover Count  :서지큐가 꽉차서 로드밸런서가 거부한 요청의개수
- controller servcie : responsible for monitoring the Load Balancers

# Route 53과 elb
로드밸런서의 dns name 대신 자신이 구입한 도메인을 사용하려면 route 53에서 A레코드를 생성할때 alias 를 yes로 선택하고 alias target에서 elb로드 밸런서를 선택하면 됨

- elb로 한 가용영역안에서도 타겟에 트래픽 분산함. healthy check
를 하며 healthy한 것에만 분산

- ec2인스턴스중 security group에 http 정책이 잇어야함

- 외부 도메인 사용할 경우에 cname을 해당 도메인 네임서버에 추가해야함

- enable cross-zone load balancing : 여러 가용 영역에 생성된 ec2인스턴스에 부하를 분산하는 옵션  Multiple zone support Cross-zone load balancing
