---
title: AWS-RDS
date: 2018-07-21 16:41:08
tags:
- AWS
- RDS
---

# RDS

<img src='https://q00.github.io/img/rds.png'>

관계형 데이터베이스(rdbms)를 손쉽게 생성하고 확장할 수 있는 서비스

- single tenant -> 하나의 ec2 host에서 하나의 rds client사용 가능

- RDS를 사용해야하는 이유
손쉽게 db인스턴스 생성가능, 사용량 늘어나면 스토리지 용량과 iops를 증가, faliover기능 통해 장애 해결, read replica이용해 읽기성능 향상

### RDS 인스턴스:  
형식 : db.로 시작 인스턴스 패밀리인 m+세대숫자, 사양규모 (db.m3.medium)
인스턴스 클래스: 마이크로인스턴스 : 가격싼 인스턴스 무료임
스탠다드 : vCPU 메모리 네트워크 등이 평균적인 사양으로 제공됨
메모리 최적화 : 다른인스턴스클래스보다 메모리 용량 큼

인스턴스 기본구매옵션 : 온디맨드 인스턴스 - aws.amazon.com/kr/rds/details

RDS 예약 인스턴스 : 선불로 내면 가격대폭하락
light 사용률 인스턴스 : 가장 저렴 사용시간 적을때사용
meium 사용률 예약 인스턴스: 항상 사용하지만 사용량에 약간의 변화가 있을때 유용
heavy 사용률 인스턴스 : 시간당 가장 저렴(선결제금액은 비쌈) 24시간 상시 가동되어야 할때


### RDS 데이터베이스 엔진과 라이선스 모델

- mysql = general public license 추가요금 x
- postgreSQL = postgreSQL license 이며 추가요금 발생 x, mysql보다 조금 높음
- oracle = license include : aws에서 미리 구매한 라이센스 사용, 라이센스 요금 추가발생 (oracle standard edition one)
	- Bring-Your-Own-License(BYOL) : 오라클 라이센스 따로구매
- Microsoft sql server : 프리티어 : 매월750시간 무료 마이크로인스턴스에 단일 가용영역으로만 SQL server Express edition 사용시
	- license include : aws에서 미리 구매한 라이센스 사용
	- BYOL : 추가요금 발생안함

RDS DB 세부설정 : 
- multi-AZ Deployment : 장애에 자동대처하는 failover 기능을 위한 다중가용영역 복제옵션 (good for DR strategy > backup)
> 예비인스턴스에서 백업 진행하므로 메인인스턴스의 io 활동이 일시 중단되지 않는다. 그러나 지연시간이 증가할 수 있음( 오로라 db는 지원안함, 대신 read replica 를 승격시켜서 사용함)
> https://aws.amazon.com/ko/rds/details/multi-az/ 
allocated storage : db에서 데이터를 저장할 스토리지 용량
use provisioned IOPS : 고성능 I/O옵션, 이 옵션을 사용하면 스토리지의 읽기/쓰기 성능을 원하는대로 조절할수있음, 추가비용추가(100,200GB~16TB)


추가설정 :
VPC (virtual private cloud) : DB인스턴스가 위치할 네트워크
subnet group : db인스턴스가 위치할 서브넷, vpc를 default를 선택하지 않았을때 설정가능
publicy Accessible : db를 외부에서 접근할수잇게하는 옵션 NO 설정 시 내부에서만 접근가능함
availity zone : db인스턴스가 생성될 가용영역, ec2인스턴스가 db에 접속한다면 같은 az에잇는게 좋음
vpc security group : 방화벽 설정, 나중에 db인스턴스전용으로 따로 생성
parameter group : mysql을 실행할때 필요한 매개변수 집합(my.cnf 생성하는 것과 동일)
option group : db옵션 - mysql 특별히 설정하지 않아도됨
backup : 자동백업옵션을 사용하면 복구사용가능(pit point in time) 최근 5분전상태로 되돌릴수잇음, 1초단위로 설정가능 - 기본적으로 true
backup retention period : 백업 데이터 유지기간, <b>최대 35일<b/> 설정가능
> DB instance 새로 만들었을 경우 기본적으로 백업 유지기간 1일.
Auto Minor version Upgrade : 자동으로 db 마이너버전 업데이트 기본값그대로사용
inno db사용
backup window: 백업시간, 기본값 no reference, duration 0.5로 설정 starttime 00:00으로 설정 maintenance window와 겹치지 않게 하기위함, immediately effect
Maintenance Window : 점검 시간 : 기본값 : no reference backupwindow시간과 겹치지않게해야함
- 이 시간에 auto minor version upgrade 를 설정햇다면 db버전 업데이트 패치 적용, 이시간에 db인스턴스 중지
- db 인스턴스 클래스를 변경햇다면 이시간에 적용됨, 이시간에 인스턴스중지
- 다음 Maintenance Window에 업데이트가 반영이 되는 경우 지금 당장 업데이트하고 싶을 시에는 ApplyImmediately 옵션 사용


- endpoint로 접근가능하나 securiy group으로 인해 접속안됨 - security group에서 포트 입력 필요
ex)oracle : 1521 postegresql : 5432
> 참조 : https://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html
> ec2 classic일때는 무조건 security group에 포트번호 추가해야함
> ec2 vpc일때는 추가하지 않아도됨


- HTTPS를 통해서만 SOAP API 통신 가능

#### 자동복구 
db인스턴스 action중 restore을 이용함
-> 자동 백업의 특정시점으로 db인스턴스가 생성됨 10분 15분정도
-> db인스턴스가 새로생성된 후 엔드포인트 새로 생성
>db인스턴스 삭제시에 db스냅샷은 남아있으나 자동백업은 남아있지않음

#### read replica

- db인스턴스의 읽기 복제본을 만들어 성능향상 -> 읽기위주 작업이많을경우 최대 5개를 만들어 부하분산
약간의 시간차를 가지고 복제해 데이터가 일치하지않을 수 있음

- read replica 를 db instance로 승급시킬때 새로운 db instance가 생성되더라도  전 읽기 전용 복제본 원본의 백업 보존 기간, 백업 기간, 파라미터 그룹은 그대로 보존됨

- read replica의 read replica를 만드는 것은 MySQL based RDS에서만 허용됨

- 생성 설정
destination region : 여러 리전에 생성가능하여 지역별로 읽기성능 높일수잇음
db instance class : 생성할 read replica 인스턴스의 클래스 , 생성할때 더 좋은 인스턴스 클래스로 바꿀수잇음
 ->  복사될때 마스터 db인스턴스도 modifying상태가 됨

