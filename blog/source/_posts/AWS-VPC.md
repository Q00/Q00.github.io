---
title: AWS-VPC
date: 2018-07-17 15:19:53
tags:
- AWS
- VPC
---

# VPC (Virtual Private Cloud)
<img src='https://q00.github.io/img/vpc.png'>

사용자만의 가상 네트워크 제공
> VPC는 무료, but VPC를 VPN에 연결할 경우 요금 부과

- AWS에 가입하면 이미 하나의 VPC 존재
- VPC 안에는 서브넷을 여러개 추가하여 네트워크 격리, 서브넷간의 접근제어(ACL) 설정가능(웹서버 -> 공개 서브넷, db서버 -> 사설 서브넷 보안 유리)

- VPC : 리전별 생성(최대 5개)
- 서브넷 : az별 생성
> CIDR 표기법으로 IP 대역 설정

- 서브넷에 있는 인스턴스 launch
- 각각 서브넷에 IP 대역 설정
- 서브넷 사이의 Route table 설정
- VPC당 한개의 Internet Gateway를 붙일 수 있음 (한개의 Internet gateway가 모든 az와 연결되어있음)
- aws resource에 대해 보안적인 관리가 가능함(ACL)
- Security group 설정 가능함


VPC에 속한 서브넷에서 외부 인터넷에 접속하려면 인터넷 게이트웨이가 필요하다.
> VPC 인터넷 게이트웨이 생성 후 VPC와 Attach

## VPC 구성 요소

- Network Interfaces
  - 기본적으로 인스턴스마다 VPC 대역내의 사설 IP가 할당된 Network Interface가 있음
  - 기본 사설 IP외에 추가적인 사설 IP를 가질 수 있음
  - eth0으로 이용하는 network interface에 한개의자동할당된 공인 IP를 이용할 수 있음 
  > VPC의 모든 인터페이스가 기본 네트워크 인터페이스(eht0) 을 가지며 분리할 수 없다
  - 사설 IP하나당 EIP 가질 수 있음
  - MAC 존재

- IP Address
  - primary private IP와 public IP가 NAT 를 통해 매핑되어있음
  - secondary private IP를 할당할 수 있음

- Subnet
  - 하나의 VPC에 여러개 subnet존재가능(최대 200개)
  - 1 Subnet = 1 AZ

- Route Table

- Internet GateWay
  - VPC가 기본생성되었을때 인터넷과 통신 불가
  - VPC에 Internet Gateway를 연결해줘야지 VPC내부 인스턴스에서 외부 통신가능
  
- Nat Instances
  - NAT 안에 있는 private subnet이 인터넷 통신을 하기 위해서는 source/destination check을 unable해줘야함

- Security group
  - allow 규칙만 생성
  - VPC당 백개 생성, 하나의 그룹에 50개 룰

- Network access control list(ACL)
  - 서브넷에 연결된 방화벽
  - allow deny 규칙 설정 가능
  - stateless()

- Virtual private gateway
  - AWS에 있는 VPN 커넥션
  - AWS VPC와 외부 사용자가 이용하고 있는 내부 네트워크 간의 연결

- Security Groups
  - Stateful -> server side에 응답, 요청에 대해 미리 정의해놓음(상태정보를 저장하는 형태) 
  - security group에 port 를 지정하면 그 port로 req,res 가능(해당 포트에 대해 inbound, outbount port를 열어둘 필요없음)

## Default VPC vs Custom VPC
- Default VPC는 바로 인스턴스 배포가가능
- Default VPC의 서브넷은 외부 인터넷과 통신이 가능
- Default VPC의 EC2 인스턴스는 public, private IP 어드레스를 둘다 가지고 있음

## EC2 인스턴스에 VPN 구축
VPN 하드웨어 장비나 서버를 구축하지 않고 개인 PC에서 VPN을 사용하려면 aws marketplace의 OpenVPN AMI를 사용(따로 PPTP 서버 구축해도 됨)
> EC2 인스턴스에 vpn으로 연결하는 것


> 참조 : http://arisu1000.tistory.com/27744

## VPC peering
- VPC와 다른 VPC를 Direct network route를 하는 것(private IP address를 통해)
- non-overlaping CIDR Block인 경우에 피어링 가능
- IPv6 인 경우에 불가능
- 다른 AWS 계정의 VPC와도 연결 가능
> https://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/PeeringGuide/invalid-peering-configurations.html
- No Transitive peering(이행성 안됨)
세개의 vpc 중 한쪽에만 나머지 두개의 vpc가 연결되어있고 나머지 두개의 vpc로 peering 하기 위해서는 직접 peering 연결이 필요하다

- edge 간 라우팅 불가 
> IGW, 회사 네트워크등 과 연결된 VPC에 peering을 통해 해당 네트워크 연결 불가

