---
title: AWS-EFS
date: 2018-07-29 16:17:51
tags:
- AWS
- EFS
---

# EFS( Elastic File System)

<img src = "https://www.boylesoftware.com/blog/wp-content/uploads/2016/07/Screen-Shot-2016-07-07-at-3.32.10-PM.png"> (출처 : https://www.boylesoftware.com)

EFS는 EC2인스턴스의 파일 스토리지 서비스로서 파일시스템에 대해 편리한 인터페이스를 제공한다.

- NFSv4 프로토콜 제공
- no pre-provisioning required
- 페타바이트까지 확장 가능
- 수천개의 NFS 커넥트 지원
- Multiple az에 저장됨
- Read After write Consistency

EC2 인스턴스에 마운트 해서 사용 여러 인스턴스들이 같은 파일서버 마운트하여 파일을 공유 후 ELB 사용
