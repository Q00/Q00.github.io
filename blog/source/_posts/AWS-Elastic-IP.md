---
title: AWS-Elastic-IP
date: 2018-07-15 16:42:59
tags:
- AWS
- Elastic_IP
---

# Elastic IP

<img src='../img/aws.png'>

동적 클라우드 컴퓨팅을 위해 고안된 고정 IPv4 주소
- IPv6 지원하지 않음

참고 :

https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html

elastic ip : 고정된 공인 ip 제공
>ec2인스턴스 배정된 ip는 ec2 인스턴스가 실행될때만 유효 , 그외에는 반납 다시시작하면 바뀔수있음 -> 유동 ip
따라서 이러한 공인 ip에대해 elastic ip로 연결을 시켜논다.
dns같은경우 유동ip하기가 힘듬 

### 프리티어에서 Elastic IP 1개를 무료로 사용 가능
하지만 Elastic IP는 EC2에 연결해두지 않으면 요금이 청구


elastic ip를 할당만받고 인스턴스에 사용하지 않는다면 요금이 부과됨(공인 ip주소 매우부족)
> ip가 부족한 상황에서 Elastic ip를 만들어두고 EC2에 연결하지 않으면 ip가 만들어져 있지만 사용되지 않고 있으므로 요금이 청구

> 또한, EC2에 연결해두었더라도 EC2가 stop되어있는 상태라면 요금이 청구

만약 Elastic ip를 만들어두고 할당을 하지 않은 상태라면 실행중인 EC2에 할당 혹은 Elastic ip 삭제 필요!

ec2인스턴스 생성하여 ssh접속해 한참 작업 후 
인스턴스재부팅했는데 ssh로접속이 안된다면 ip가 바뀐것임
