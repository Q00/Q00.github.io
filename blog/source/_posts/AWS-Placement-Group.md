---
title: AWS-Placement_Group
date: 2018-07-29 19:43:36
tags:
- AWS
- Placement_Group
---

# Placement Group

<img src = 'https://q00.github.io/img/aws.png'>


>참고 : https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/placement-groups.html#concepts-placement-groups

- Clustered Placement Group 
    - 대체적으로 Placement Group이라고하면 Clustered Placement Group을 뜻함
    - 높은 대역폭, 낮은 지연 시간의 연결을 통해 EC2 인스턴스(Compute Optimized, GPU, Memory Optimized, Storage Optimized)를 Grouping
    - low inter-node latency에서 컴퓨터 클러스터 퍼포먼스를 올려줌
    - <b>single az 안에서만 존재</b> , Can't span multiple AZ
- Spread Placement Group
    - 다른 기본 하드웨어에 각자 배치된 인스턴스의 그룹
    - 서로 떨어져있어야 하는 중요인스턴스의 수가 적은 애플리케이션에 권장됨
    - can span multiple az(가용영역당 최대 7 실행 인스턴스 지원)