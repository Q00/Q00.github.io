---
title: AWS_ec2
date: 2018-07-05 23:44:58
tags: 
- AWS
- ec2
---

# ec2 : elastic compute cloud

<img src='https://q00.github.io/img/aws.png'>
aws에서 가장 기본적이면서 널리쓰이는 인프라 - 인터넷에 연결된 가상서버를 제공해줌

>프리티어 - linux,unix,rhel 마이크로 인스턴스 750시간, window 마이크로 인스턴스 750시간

리전당 20개씩 소프트 리밋 있음, 요청하면 늘어남

## 사용해야 하는 이유
효율성과 비용 절감

start : ec2 인스턴스 시작, 운영체제가 부팅되고 사용할 수 있는 상태, 시작하는 순간부터 요금 과금

stop : ec2 인스턴스 정지, 완전히 시스템 정지

terminate : ec2인스턴스 삭제

reboot : ec2인스턴스 재부팅

root : 운영체제가 설치되는 스토리지, root 장치로 ebs와 인스턴스 스토리지 사용할 수 있음

kernel Id : ec2 인스턴스가 사용하는 Linux 커널,, linux 반가상화 : 외부에서 리눅스커널 지정필요

## 운영체제에 따른 가상화 형태
>windows : os 의 커널을 수정할 수 없기 때문에 HVM(하드웨어 가상화) Full virtualization(전가상화)로 실행됨

>linux : os의 커널을 수정할 수 있음, Paravirtualization (반가상화) 로 실행됨 전가상화커널을 때에 따라 선택할 수 잇음

## ec2 sla(Service Level Agreement)
월 99.95% : 한달에 0.36시간 장애 발생가능

## ec2가 여러가지 사양인 이유
비용절감 효율성 -> 사용자에게 선택권을 줌

## 인스턴스 유형
m[0-9].medium (인스턴스 패밀리 : m, 세대를 뜻하는 숫자, .뒤에는 사양 규모를 뜻하는 단어)

범용 : M1, M3으로 시작 vcpu, 메모리 네트워크 저장공간 평균 사양

컴퓨팅최적화 : C로 시작하는 인스턴스 유형, 다른 인스턴스 패밀리에 비해 메모리 대비 vCpu 비율 높음

GPU 인스턴스 : G로 시작, 고성능의 nvdia gpu 장착, CUDA Opencl 등울 실행할때 사용됩니다

메모리 최적화 :M2와 CR1로 시작하는 인스턴스 유형, 메모리 용량이 훨씬 큽니다.

스토리지 최적화 : H와 I로 시작하는 인스턴스 유형, 스토리지 용량이 훨씬크거나, 초고속 I/O 제공

마이크로 인스턴스 : 가격이 가장 싼 인스턴스, 낮은 vCpu 성능과 적은 메모리 제공
vCpu : 가상화소프트웨어 제공되는 CPU

## 과금방식
ondemand instance : 사용률에 따른 결제방식, 약정 없이 시간당 고정 요금 지불 가능 
spot instance : 경매 인스턴스, flexible start and end times, EC2에 의하여 종료되면 부분적인 사용시간에 대하여 과금되지 않으나 직접 인스턴스를 삭제한 경우 인스턴스가 실행된 전체 시간에 대하여 과금됨 
reserved instance : 선결제방식 - > 환불불가, 할인 제공(ALL, partial, No upfront fee), specific instance family not type
dedicated hosts : not support multi tenant, 물리 ec2 serverr

## ec2 생성할 떄
t1.micro : 반가상화 Amazon Linux AMI 선택했으면 t1만 사용가능
t2.micro : 하드웨어 가상화 Amazon Linux AMI 선택했으면 t2만 사용가능

cpu 많이 쓰는 컴파일 작업을 할때는 t2인스턴스 유형이 유리함

### configure instance details
number of instances : 생성할 인스턴스 개수 
purchasing option : 스팟 인스턴스의 구매 옵션
network : vpc 네트워크를 선택하는 옵션
subnet :  Availability Zone(가용영역)을 선택하는 옵션
public ip : 공인 ip 할당하는 옵션
IAM role : IAM 역할 설정
shutdown behavior : ec2 인스턴스 안에 설치된 운영체제를 종료했을 때의 행동을 설정  (stop terminate)
enale Termination protection : 실수로 삭제하는 것을 방지하는 옵션
Monitoring : cloudwatch 세부 모니터링 사용 옵션
tenancy : 가상 서버 실행 방식을 설정하는 옵션: 공유 인스턴스(shared tenancy) 전용인스턴스(Dedicated tenancy)를 선택가능



### add storage
type: 루트장치(EBS)인지 추가장치(EBS, instance storage)인지
Snapshot :스냅샷id
size : 스토리지 크기 (gb단위)
Volume type: 스토리지 볼륨 유형 magnetic, general purpose(SSD) provisioned IOPS(SSD) 선택할 수있음
magnetic : 하드디스클 사용하는 스토리지 100IOPS
general purpose : ssd - 1GiB당 3IOPS를 제공하는 스토리지. 마그네틱보다추가요금발생
3600 초 동안 3000iops까지 성능이 높아지는 burst기능 제공(순간적으로 io가 몰릴때 iops를 높임)
provisioned iops : ssd를 사용하고, I/O 대역폭을 설정할 수 있음, 마그네틱보다 추가요금발생
IOPS : volume type 을 provisioned IOPS 로 선택했을때 IOPS를 설정가능
delete on termination : ec2 인스턴스가 실행되고 있을때 스토리지가 실수로 삭제되는 것을 방지.


### puuty ssh 접속
ec2 서버 인스턴스 생성 후 key value pem file 다운로드 후 puttygen -> ppt file 컨버전

>기본 사용자명
amazon linux : ec2-user
rhel: ec2-user
SuSE Linux : root
Ubuntu Linux : ubuntu

## ec2 기타 설정 및 기능
- placement group :
    - Clustered placement group: Clustering low-latency group of instances within a single AZ. 
    - spread placement group: 물리적으로 인접한 곳에 ec2인스턴스 생성 -> 네트워크 퍼포먼스 극대화'
- bundle instance(instance store ami) : 인스턴스 스토리지를 루트장치로 사용하는 windows instance의 내용을 s3버킷에 저장하는 기능
- bundle task : bundle instance가 처리되는 과정
- network interface : ENI(Elastic network interface) 생성하고 ec2인스턴스에 장착

## ec2 태그 지정
- 참고 : https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/Using_Tags.html#tag-resources

## 메타데이터
curl http://169.254.169.254/latest/meta-data/
curl http://169.254.169.254/latest/user-data/
인스턴스에 대한 정보를 얻을 수 있음
>https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ec2-instance-metadata.html