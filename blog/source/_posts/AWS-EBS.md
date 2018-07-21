---
title: AWS-EBS
date: 2018-07-07 20:06:07
tags:
- AWS
- EBS
---


# EBS(Elastic Block Store)

<img src='../img/aws.png'>
ec2인스턴스에 장착하여 사용할 수 있는 가상 저장 장치
ec2인스턴스에서 제공하는 기본용량보다 더 사용해야할때, 운영체제를 중단시키지 않고 용량을 자유롭게 늘리고 싶을때, 영구적인 데이터보관이 필요할때, RAID등의 고급기능이 필요할때 사용

>프리티어에서 ebs 스토리지 30gb, ebs 200만io무료로 사용

ec2에 설치된 os에서 그냥 일반적인 하드디스크나 ssd처럼 인식, 원하는 크기로 만들 수 잇음, iops 원하는 수치

Block은 unix/linux계열 os에서 일정한 크기단위로 읽고 쓰는 저장장치를 부르는말, 자기테이프, 플로피디스크, 하드디스크, 광학디스크, ssd등의 플래시메모리가 대표적

volume: ebs의 가장 기본적인 형태, os에서 바로 사용가능, 동시에 여러개 ec2에 붙일수 없음
image : AMI(Amazon machine image)를 줄여부르는말, os가 설치된 형태, AMI로 ec2인스턴스 생성
snapshot : ebs볼륨의 특정시점을 그대로 복사해 저장,스냅샷을 이용하여 ebs볼륨과 AMI 생성
=> 과금됨 주의(다른 리전 냅뒀을 경우)
IOPS(Input Ouput Per Second) 저장장치의 성능측정장치(100~4000IOPS) - 16kb단위로 처리, 크기가 작은파일이 있다면 16kb로 묶어서 처리하면 높은 성능


## ebs 볼륨과 RAID
ebs도 RAID구성을 할 수 있음 RAID0 RAID1 RAID 1+0(RAID10) 타입 구성

## EBS 스냅샷 :
프리티어 1기가 무료사용
스냅샷으로 ebs 볼륨 생성(다른 AZ에 생성가능)
스냅샷으로 AMI생성
스냡샷을 다른 리전으로 복사
저장요금 -> s3데이터 저장요금에 합산

## ebs 스냅샷 생성하기
ebs 볼륨목록에서생성하는방법, ebs스냅샷목록에서 생성하는방법 2가지

## 볼륨 상태 모니터링
EBS 볼륨 모니터링하는데 사용할 수 있는 데이터를 자동 제공
- basic : 자동으로 5분 기간 동안 데이터 무료사용
- detailed : 프로비저닝된 IOPS SSD 볼륨이 1분지표를 CloudWatch에 자동으로 보냄

