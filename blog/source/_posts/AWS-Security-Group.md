---
title: AWS-Security_Group Network_Access_List
date: 2018-07-15 16:30:31
tags:
- AWS
- Security_Group
- ACL
- Network_Access_List
---
# security group

<img src='https://q00.github.io/img/aws.png'>

# security group으로 방화벽 설정하기

security group : ec2 인스턴스에 적용할 수 있는 방화벽 설정

inbound : 외부에서 ec2인스턴스로 들어오는 트래픽 http https ssh rdp
Outbound : 외부로 나가는 트래픽. ec2 인스턴스안에서 인터넷을 할경우(파일다운로드, 외부 ssh접속)
-> inbound, outbound에 대해 특정 IP address에 대한 deny가 필요한 경우는 security group으로는 불가능하며 Network ACL 기능 사용해야함.(서브넷 방화벽)
(Access control list) 
>방화벽역할을 하는 VPC를 위한 선택적 보안 계층(subnet)

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
- Security group 변경시 즉시 적용
- stateful - 서비스에 대한 특성 및 통신상태를 관리가능하여 Inbound에 대한 규칙을 생성했을 시에 Outbound에 대한 규칙이 없더라도 동적으로 접근 규칙을 자동으로 생성한다. ( 연결이 끝날 때까지 연결 유지)

## ACL의 기본정책
default network ACL : all outbound, inbound traffic allow
custom netowrk ACL : Inbound Deny all, Outbound deny all
- can block specific IP address -> rule number control ( DENY CASE가 있는 경우 ALLOW 규칙보다 RULE NUMBER를 앞에 둔다) => Security Group은 못함
- CAN asscociate multiple subnets.(1대 다 관계) 만약 ACL변경시 이전 ACL removed
- stateless : 각각 요청을 독립적인 요청으로 파악( 요청할때마다 새로 연결 )


참조 :
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html

http://faq.hostway.co.kr/AWS_HELP/7912

https://blog.naver.com/popqser2/221035576390