---
id: sql-recipe-for-data-analysis
title: SQL Recipe For Data Analysis
sidebar_label: SQL Recipe(in Korean)
---
### Author
- 가사키 나가토, 다미아 나오토(加嵜 長門, 田宮 直人)

### 원본
- [Amazon JP](https://www.amazon.co.jp/%E3%83%93%E3%83%83%E3%82%B0%E3%83%87%E3%83%BC%E3%82%BF%E5%88%86%E6%9E%90-%E6%B4%BB%E7%94%A8%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AESQL%E3%83%AC%E3%82%B7%E3%83%94-%E5%8A%A0%E5%B5%9C-%E9%95%B7%E9%96%80-ebook/dp/B06XRWPPC9/ref=as_li_ss_tl?ie=UTF8&qid=1490933410&sr=8-1&keywords=%E3%83%93%E3%83%83%E3%82%B0%E3%83%87%E3%83%BC%E3%82%BF%E6%B4%BB%E7%94%A8%E3%80%80SQL%E3%83%AC%E3%82%B7%E3%83%94&linkCode=sl1&tag=mythang-22&linkId=04fb8969845d07478c7fcc69e6a12c71)

## Summary

- 데이터 분석을 해야 하는 실무자가 어떤 상황에서 어떤 데이터를 뽑아야 하는지 나오며, 그에 해당하는 SQL예제가 나와 있다. 예제는 다양한 **빅데이터 SQL** 쿼리들이 나와 있다. 케이스들이 많이 나와있고, 각각의 상황에 맞는 데이터 전처리 방법이 순차적으로 나와있다.
- 목차 기준으로 25개의 작은 챕터들이 있는데 90% 는 상황에 맞는 데이터 분석 예제와 방법들이 나와있다.
- 예제 코드는 [한빛 미디어 홈페이지에](https://www.hanbit.co.kr/store/books/look.php?p_code=B8585882565)서 다운로드 가능하다.

## What I liked about

- 각각의 **상황에서 어떠한 분석**을 해야하는지 자세히 나와있다.
- 예제 코드가 정제된 형태이긴 하지만, 개념만 안다면 바로 **실전에 적용** 가능하다.
- **업무에서 써보고 싶은 분석**들이 가득 담겨져있다.
- 현재 보유하고 있는 데이터 부터 **어떻게 시작하면 될지** 나와있다.
- 데이터의 종류에 따라 분석 방법이 달라질 수 있는데, 그에 대한 가이드가 친절히 설명되어있다.
- 글을 잘 읽히게 썼다.(혹은 번역이 잘되었거나)
- 그래프들이 나와 있어서 어떤 상황에 어떤 **그래프를 사용하면 좋을지 감**을 잡기 쉽다.

## What I didn't like about

- 책이 좀 길다.
- NoSql은 없다.
- 예제의 한계인 성능 Optimization과는 약간 거리가 있어보인다.

## Recommend to

- 빅데이터 쿼리들을 연습해보고싶은 사람
- 매일 보며 쓰던 쿼리들 말고 실전에서 다른사람들은 어떤 쿼리를 쓰는지 보고 싶은 사람
- 데이터분석은 하고 싶은데 어디서 부터 시작해야 할지 모르겠는사람
- 개발 지식은 있는데, 어떤 분석을 해야 하는지 모르는 사람

## Memo

### 평소에 잘 쓰지 않았던 SQL

#### Unique row count

```sql
SELECT COUNT(DISTINCT user_id) FROM table_a
```

#### Partition average value

```sql
SELECT score - AVG(score) OVER (PARTITION BY user_id)FROM table_a
```

- 유저의 점수들에 대한 평균값을 뺀 현재값

#### Rank

```sql
SELECT row_number() OVER(ORDER BY score DESC) FROM table_a
```

#### Previous and following row

```sql
SELECT LAG(product_id, 2) OVER(ORDER BY score DESC) FROM table_a
-- LAG(column, number) number 는 생략 가능 defaut 1

SELECT LEAD(product_id, 2) OVER(ORDER BY score DESC) FROM table_a
```

#### Table join condition

```sql
.. LEFT JOIN table_a AS t2 ON t1.id = t2.id AND t2.rank = 1
```

- On 이하 절이 키 값 매칭하는걸로 인식하고 있었는데, 다시 생각해보면 컨디션 절인걸 알 수 있다.
- 그런 이유로 볼 때, 조인을 아무리 잘해도 N^2 일수밖에 없다.

#### Virtual table with values

```sql
WITH master_device(device_id, device_name) AS(VALUES(1, 'PC'),(2,'SP')) 
SELECT * FROM master_device
```

- 빠른 테스트 데이터 입력

#### Moving Average

```sql
WITH table_a(date, amount) AS
    (VALUES ('2020-08-14', 10),
            ('2020-08-15', 11),
            ('2020-08-16', 10),
            ('2020-08-17', 11),
            ('2020-08-19', 12),
            ('2020-08-20', 13),
            ('2020-08-21', 14),
            ('2020-08-22', 15),
            ('2020-08-23', 16),
            ('2020-08-24', 17),
            ('2020-08-25', 18)
            )
SELECT AVG(SUM(amount)) over
    (ORDER BY "date" ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) FROM table_a
GROUP BY "date"
```

- group by 를 해야하는 재약조건이 들어간다.

#### Every case vs limited cases

```sql
-- ROLLUP
WITH table_a(date, amount) AS (VALUES ('a', 1))
SELECT date, amount, SUM(amount) AS result FROM table_a GROUP BY ROLLUP (date, amount)
ORDER BY "date"
-- (a, 1, 1), (a, null, 1), (null, null, 1)

-- CUBE
WITH table_a(date, amount) AS (VALUES ('a', 1))
SELECT date, amount, SUM(amount) AS result FROM table_a GROUP BY CUBE (date, amount)
ORDER BY "date"
-- (a, 1, 1), (a, null, 1),(null, 1, 1) (null, null, 1)
```

- ROLL UP 은 root를 포함한 경우의 수
- CUBE 는 가능한 모든 조합

#### Width_bucket

```sql
SELECT WIDTH_BUCKET(price, min, max, n) FROM table_a
```

- 버켓 안에 값들이 얼마나 들어가는지 분포를 확인 할 수 있다.

#### Ntlie

```sql
SELECT "date", amount, 
NTILE(10) OVER (ORDER BY amount DESC) AS decile FROM table_a
```

- 값을  N개 그룹으로 나눈다.

### 데이터 분석 팁

#### 분석은 단순한 숫자가 아니라 문맥이 중요

- 매출액이라 하면, 매출액이 증감한 이유에 대한 숫자들과 그래프가 함께 동반되어야 한다.
- 카테고리별 매출액이 합이 전체 매출액임으로 세부적으로 함께 리포팅 해야한다.

#### ABC 분석

- 잘 팔리는 상품과 그렇지 못한 상품에 등급을 나눌 수 있게 해준다
- 차트 예시

#### Decile 분석

- N 개 값을 나누어 분석한다.
- 보통 10개로 등분해서 표기한다.

#### RFM(Recency, Frequency, Monetary) 분석

- Decile 분석에서 발생하는 Naive 한 값으로 블록을 나눠서 생기는 과거 데이터와 현재 데이터의 이격을 줄일수 있다.
- 예를 들어 년 말 한번의 큰 구매가 월간의 꾸준한 구매와 같지 않다는 걸 분석 가능하게 해준다.
- 차트예시

#### 팬 차트 분석

- 기준점 대비 매출액이 어떻게 변화하는지 분석 가능하다.
- 차트 예시

#### 도수 분포표 분석

- 값들의 분포도를 확인 가능
- [버킷 위스](https://www.notion.so/SQL-33a921c89d6045efb169e1ac8054b852)

#### 비율값 분석

- 비율값이 나오는 분석에서는 Cumulative한 값을 함께 넣어 줘서 해당 값이 몇 분위에 해당하는지 함께 표시하면 좋다.

#### 리드타임 분석

- 한 행동이 다음 행동으로 이어지는 기간의 시간이 얼마나 걸리는지 분석 가능하다. 매출까지 가는 타임을 줄일 목적으로 분석 가능

#### 컨텐츠 분석

- 완독률 분석을 통해 고객이 원하는 콘텐츠 인지 어디서 제일 많이 이탈하는지 확인 가능하다.
- 개인적으로 Hotjar 가 어떻게 분석하는지 궁금했는데, 키보드 스크롤다운이나 마우스 휠다운 혹은 스와이핑으로 고객이 대략 어느 페이지를 보고 있는지 짐작 가능 할거같다.

#### 아이피 로그 분석

- Geolite2 라는 서비스를 사용하면 아이피주소별 국가 위치를 볼 수 있는데, 그것을 통해 어느 나라에서 서비스에 접속했는지 확인 가능하다.

#### 이상 값 검출 분석

- 노이즈나 빠진 부분을 찾아내는게 목적이다.
- percent_rank 값을 통해 상위 몇 퍼센트와 하위 몇 퍼센트 값들이 특이한 행동을 보이고 있는지 필터링 가능하다.

#### 어소시에이션 분석

- 상품 A를 구매한 사람은 상품 B를 구매할 확률도 높을것 이라는 연관성 분석을 할 수 있다.
- 지지도, 확신도, 신뢰도, 리프트 지표를 사용해 분석한다.
- 크게 item to item 과 user to item 갈래가 있다.(ecommerce)

#### 비율 값 해석

- 비율을 계산 할 때 평균 값을 많이 사용하는데, 산술 평균인지, 기하평균인지, 조화평균인지 구분해서 사용해야 한다. [위키독스 설명](https://wikidocs.net/23088)

#### 시그모이드 함수

- 모집단의 크기가 바뀜에 따라 x축과 y 축이 요동치는 것을 방지하기 위해 시그모이드 함수를 사용하여 값을 1 ~ -1 사이로 그림으로써 도표상 S자 곡석으로 값을 확인 가능하다.

### 빅데이터

#### 빅데이터 고민

- 빅데이터를 활용하려는 주체의 고민은 크게 4가지 단계로 나눌 수 있다.
- [구상자체가 없다] 데이터를 어떻게 활용해야 할지 감을 못 잡겠다.
- [환경이 없다] 데이터를 다룰 수 있는 인재를 확보하지 못했다.
- [데이터가 없다] 어떤 데이터를 어떻게 수집해야 할지 모르겠다.
- [스킬이 없다] 데이터를 제대로 활용하지 못한다.

#### 빅데이터 활용 방법

- 문제 발견 → 문제 해결 → 가치창조로 이어지는 이터레이션이 형성되어야 한다.
- 빅데이터는 데이터 축적 → 데이터 가공 → 데이터 집계 → 데이터 시각화 의 단계로 활용 되어야 한다.
- 예시) [문제발견] 리포트 기반으로 문제를 찾고 개선할 부분 탐색 → [문제 해결] 인력의 한계를 넘어 자동화와 정밀도 향상 → [가치 창조] 시스템 제공

#### 데이터 계층화

- 각 계층은 로그계층, 집약 계층, 집계 계층으로 구분하면 된다.
- 데이터 분석의 직접적인 소스가 되는 계층은 로그 계층인데, 꼭 로그 데이터만을 지칭하는 것은 아니다.업무데이터를 포함한 다른 데이터 소스도 로그계층으로 포함 시킬 수 있다.
- 집약계층으로는 데이터 클렌징을 한 데이터 예를 들어, 크롤러 로그를 제거하고, 상태 이상값들을 제거한 데이터이다.

#### 데이터 분석의 4가지 과정

- 서비스 이해
    - 서비스에 대한 이해가 부족한 상태에서 자세한 수치 산출을 시도하면 서비스에서 주력하고 있는 내욕과 상관 없는 내용만 분석할 여지가 있다. (일명 삽질)
- 그래프
    - 시각적으로 정보를 주기 때문에 이해도가 빠르다 (직관적이다)
    - 각 분석값(데이터)마다 사용해야 하는 그래프가 다르기 때문에 해당 분석에 맞는 그래프를 선택해야 한다.
- 여러 수치를 함께 분석
    - 단적인 수치는 큰 그림을 보기 어렵고, 선후관계에 대한 정보 없이는 주어진 수치를 이해하기 어렵다.
    - 매출액은 있는데 항목별 판매 갯수가 없다면 반쪽짜리 보고서이다.
- 가설을 세우고 검증하면 대책을 마련할 수 있다.

#### 독자에 맞춘 리포트

- 모든 글이 그러하듯 독자에 맞춰서 리포트를 작성해야 한다.
- **임원/경영층**에게는 어디에 주력해야 하는지, 사업을 존속할지에 대한 정보를 제공해야 하기 때문에 페이지 이탈률이나 페이지 이동률 같은 지나치게 세부적인 정보는 필요가 없다. 대신 타사 대비 매출액 추이, 매출 구성, 사용자 수 등을 제공하는게 좋다.
- **서비스 기획/개발 담당**은 KPI를 중요하게 생각하기 때문에 전체적인 지표보다는 구체적으로 어떠한 액션을 취해야 하는가와 같은 내용이 담기면 좋다. 이탈률, 직귀율등을 개선하기 위해 어떠한 액션이 필요할지 제시해 주면 좋다.
- **마케팅 담당자**에게는 예산이 얼마나 투입되었는지, 예산이 매출로 이어졌는지에 대해 알려주는게 중요하다.