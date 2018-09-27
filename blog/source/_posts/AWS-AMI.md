---
title: AWS-AMI
date: 2018-07-16 23:38:36
tags:
- AWS
- AMI
---

# AMI(Amazon Machine Image)

<img src='
'>

EC2 인스턴스를 생성하기 위한 기본파일

> 모든 설치와 설정이 완료된 AMI를 이용하여 EC2인스턴스를 늘리는 자동횡적확장(auto scailing) 가능

## AMI 사용 케이스
- 설치 및 설정이완료된 ec2인스턴스를 신속하게 생성해야할 때
- auto scailing 등으로 자동화할때
- ec2 인스턴스를 다른 리전으로 이전해야할 때
- 상용 솔루션을 사용하고자할때

### VM import/Export
빈 ec2 인스턴스에 직접 os를 설치할 수 없지만 가상화 소프트웨어(vm)를 이용해 설치한뒤 vm 이미지를  AMI로 변환가능

## AMI Charateristic
- Region
- Operating System
- Arcitecture(32bit or 64bit)
- Launch Permission
 - public -> all AWS account
 - explicit -> specific AWS account
 - implicit -> 암묵적
- Storage for the Root Device
 - Amazon EBS backed AMI
   - 데이터지속성 : 인스턴스종료시 루트 볼륨삭제( 기본적으로 Amazon EBS 기반 인스턴스 루트 볼륨의 DeleteOnTermination플래그는 true 로 설정 )
   - 수정 : 인스턴스 유형, 커널 , RAM 디스크, 사용제 데이터 변경 가능
   - 정지상태 : 인스턴스가 실행되고 있지 않지만 EBS에서 루트볼륨이 지속되는 정지상태로 배치 가능
 - Amazon Instance-store backed AMI
   - 데이터지속성 : 인스턴스 저장 영역 볼륨의 데이터는 인스턴스 수명동안만 지속
   - 수정 : 인스턴스 수명동안 고정
   - 정지상태 : 정지상태일수 없음. 실행중이거나 종료
   
