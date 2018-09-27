---
title: AWS-Lambda
date: 2018-07-29 16:42:51
tags:
- AWS
- Lambda
---

# aws Lambda

<img src = "https://4.bp.blogspot.com/-zdiK_76g_HQ/Ws6-rU0JMHI/AAAAAAAAL-0/rgoLww4VrYkhx5K1mkW7dyVB9ZgP9lrWQCLcBGAs/s1600/AWS-Lambda.png"> (출처 :http://diego-pacheco.blogspot.com )

Code를 업로드하고 람다 펑션을 생성할 수 있게 해주는 이벤트 중심 컴퓨팅 서비스.

- OS, Patching, Scailing 등등을 신경쓰지 않아도된다.

- HTTP request에 대한 응답을 위해서는, AWS API Gateway나 AWS SDK로 만든 API를 사용해야 한다.

- Cold Start가 존재하여 리퀘스트 타임아웃 에러가 존재한다. 이를 해결하기 위해서는 python, golang등 performance가 좋은 언어를 사용하거나 주기적으로 request를 보내는 방법이 있다.

- 백만 콜까지 무료, 이후 백만콜당 0.2$ 매우 저렴

- API 게이트웨이를 이용하면 서버가 없어도된다.

- Continuous Scaling

- 자동으로 Scale out, not scale up
> Scale up : 서버 그자체를 증강하여 처리능력 향상 시킴
> Scale Out : 접속된 서버의 대수를 늘려 처리능력을 향상 시킴(수평스케일링)

- 람다펑션은 독립적, 1 event = 1 function

- 서버리스 서비스 : S3, API gateway, lambda, dynamo DB( EC2는 서버리스아님)

- 트리거 사용하여 람다펑션이 다른 람다 펑션 호출 -> 1 event = multiple function

- AWS X-ray를 통해 debug 가능