---
title: AWS-ELASTICACHE
date: 2018-08-03 00:52:48
tags:
- AWS
- ELASTICACHE
---

#Elasticcache

<img src = "https://q00.github.io/img/ElasticacheIcon.png" >

분산 인 메모리 캐시를 손쉽게 생성하고 확장할 수 있는 서비스
읽기중심의 서비스를 제공해야하는 환경, 고속으로 데이터를 분석해야하는환경 적합

인메모리캐시 : 모든 데이터를 메모리에만 올려놓고 사용하는 데이터베이스의 일종.
RDBMS는 디스크에 데이터를 영구적으로 저장해놓고 필요한 데이터만 메모리에 읽어서 사용

서버의 전원공급이 중단되면 데이터 소멸.

Memcached : 유명한 분산메모리 캐시시스템 , 스냅샷 , 레플리카 지원하지않음, 노드확장할때 클러스터 확장 용량 늘어남
REDIS : 다양한 데이터형식을 제공하는 KEY VALUE 데이터저장소 스냅샷 레플리카 지원함, 샤딩구현필요(분산) 용량 늘어나지않음
-> 마스터 노드와 슬레이브 노드 가 나눠져 (리드레플리카, 등등) 용량이 커지지않고 샤딩으로 다른 캐시노드를 만들어야함
-> failover 지원 - 마스터 장애일때 read레플리카 가 마스터로 승격되어 사용됨

telnet 에 endpoint로 접근가능함

인스턴스를 캐시노드 라고부름.

* rds와의 차이점
- rds는 생성된 db인스턴스의 인스턴스클래스를 변경할 수 있지만 엘라스틱 캐시는 생성된 캐시 유형을 변경할 수 없음 캐시노드 유형을 바꾸려면 삭제하고 생성

- 외부에서 rds서버 접근가능
  엘라스틱 캐시엔진 외부에서 접근 불가능

LIGHT 사용률, MEDIUM 사용률, HEAVY 사용률

prefered zone : 캐시가용영역
cached subnet group : 기존에 서브넷그룹이 존재해야 가능

* memcached cluster 추가설정
- vcp security group: vcp security group 따로 생성필요함
- maintenence window: 점검시간 00:00분 한시간
- 생성하더라도 endpoint로 접근이안됨 따라서 security group에 11211 port번호 열어줘야함
