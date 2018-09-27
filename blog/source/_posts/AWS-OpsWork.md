---
title: AWS-OpsWork
date: 2018-07-19 00:05:57
tags:
- AWS
- OpsWork
---

# OpsWork

<img src='https://q00.github.io/img/aws.png'>

> 참고 : http://arisu1000.tistory.com/27736?category=477480
> https://docs.aws.amazon.com/ko_kr/opsworks/latest/userguide/welcome.html

특징 : Elastic BeansTalk와는 다르게 컨테이너 수정가능, 덜 편리함

- 기본 EC2 인스턴스에서 제공하는 메트릭 외에 CPU, 메모리 사용률, load average 등등 1분 단위 모니터링 제공

- 스택 삭제할 시에 스택에 포함되어있는 app, 인스턴스 지운 후 삭제

- ELB 는 직접 생성해서 스택에 추가해줘야함

## 기본 개념

OpsWork ( Stack ( Layer ( instance ( app ))) back-end)
^
|
v
another resource( chef cookbook)

* 스택 (STACK)
기본 구성요소로서 그룹화해서 관리함. 스택을 vpc안에 두어 사용자와 격리할 수 있음
스택 수정 : region, vpc id 빼고는 모든 설정을 수정할 수 있음
스택 복사 : region을 변경할때 사용할 수 있음

- 스택에서 어플리케이션을 배포하고 모니터링할 수 있음(인스턴스 집합(공통인스턴스)인 layer를 이용함 => 비용절감, 서버 분리를 통한 관리 이점을 얻을 수 있음)

- Auto Healing, Auto Scailing을 사용하여 인스턴스상태 모니터링, 새 인스턴스 provisioning

- 여러 스택을 사용하여 공통의 목적을 가진 인스턴스를 관리하는 것이 좋다.
  - 개발 스택
  - 업데이트, 버그 수정 QA 스테이징 스택
  - 퍼블릭 버전 스택


* 레이어(LAYER)
chef recipes 따라 설치 업데이트 배포함, 인스턴스 설정 포함.
- 비용절감, 서버 분리를 통한 관리 이점을 얻을 수 있음
- 하나 이상의 인스턴스를 가질 수 있음

- Elastic Load Balancing Layer
> 참고 : https://docs.aws.amazon.com/ko_kr/opsworks/latest/userguide/layers-elb.html
각 계층에 로드 밸런서를 하나만 연결할 수 있습니다.

각 로드 밸런서는 한 계층만 처리할 수 있습니다.

AWS OpsWorks Stacks는 Application Load Balancer를 지원하지 않습니다. Classic Load Balancer만 AWS OpsWorks Stacks와 함께 사용할 수 있습니다.


* 인스턴스

EC2 인스턴스에 에이저트 설치 -> 레이어 레시피 설정, 레이어 소프트웨어 시작
- 종류
  - 24/7 인스턴스 : 수동으로 시작하고 정지하는 인스턴스
  - load-based 인스턴스 : CPU 사용률 같은 로드메트릭에 따라 자동으로 시작하고 정지하는 인스턴스
  - Time-based 인스턴스 : 지정된 일정에 따라 자동으로 시작하고 정지하는 인스턴스
- 인스턴스를 여러 Layer에 할당하게 되면 데이터베이스서버와 로드밸런서를 단일 인스턴스에서 호스팅-> 비용 절감
- 어플리케이션 서버중 하나를 관리에 사용
- 스팟 인스턴스 지원되지 않음
