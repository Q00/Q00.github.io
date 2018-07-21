---
title: AWS-Security_Group
date: 2018-07-15 16:30:31
tags:
- AWS
- Security_Group
---
# security group

<img src='../img/aws.png'>

# security group으로 방화벽 설정하기
security group : ec2 인스턴스에 적용할 수 있는 방화벽 설정

inbound : 외부에서 ec2인스턴스로 들어오는 트래픽 http https ssh rdp

Outbound : 외부로 나가는 트래픽. ec2 인스턴스안에서 인터넷을 할경우(파일다운로드, 외부 ssh접속)
-> outbount 정책에 대한 제어가 필요한 경우는 security group으로는 불가능하며 Network ACL 기능 사용해야함.
(Access control list) 
>방화벽열할을 하는 VPC를 위한 선택적 보안 계층

>참조 :
https://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/VPC_Security.html#VPC_Security_Comparison

type: 프로토콜 형태 tcp udp icmp

port : 포트번호  icmp는 포트번호 사용하지 않음

source, destination : 연결 혹은 접속 가능한 ip대역

rule : 위의 여러 것들을 세팅 조합한 것

## Security group의 기본정책
>Inbound Deny all, Outbound any Open
- EC2로 들어오는 트래픽은 아무런 정책을 넣지 않은 상태에서 모두 차단
- EC2 서버에서 나가는 트래픽은 기본적으로 모두 허용

참조 :
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html

http://faq.hostway.co.kr/AWS_HELP/7912