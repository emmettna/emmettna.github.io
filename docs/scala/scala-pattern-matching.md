---
id: scala-pattern-matching
title: "Pattern matching"
---
If you are a Scala user, you probably use pattern matching pretty often. It's really power and useful feature. it's not like Java's asInstanceOf. It doesn't get runtime error without parsing try catch. Well, if you are a Scala user, you don't really use try catch tho.

Anyways, lets dive into it.

## Basic matching

As we all know, simplest pattern matching

```scala
val integerSample: Int = 123

val stringInteger: String = integerSample match {
  case 123 => "123"
  case _ => ""
}

```
Yet pretty useful compare to java's switch

```java
Int integerSample = 123;

switch(integerSample){
  case 123:
    "123"
    break;
  default:
    ""
}
```

I believe Modern java has got a better way to match the values. It feels like any language is better than Java sometimes. So it's sort of meaningless of comparing with Java. But hey, My point is not to compare Scala with Java but just it may be equivalent to such a way if you implemented in Java

Let's take advantage of types this time.

## Using Types

### Case Class

```scala
final case class IntegerParser(value: Int)

val prasedInt = IntegerPraser(value = 1)

parsedInt match {
  case IntegerParser(value) => value.toString
  case _ => "Invalid Int"
```

Looks familiar? yeah, for sure. you probably have been using this pattern already.
### Option matching

```scala
val optionValue = Option(1)

optionValue match {
  case Some(v) => ???
  case None => ???
```

Yeah, that's right. It is not limited to Option, Future or Either. It's for all classes.

### Multi Depth Class

How about multiple depths?
Yeah we love those!

```scala
final case class DummyCaseClass(value: Int)

val dummyCaseClassOpt = Option(DummyCaseClass(1))

dummyCaseClassOpt match {
  case Some(DummyCaseClass(v)) => v.toString
  case Some(_) => ???
  case None => ???
}

// equivalent
dummyCaseClassOpt match {
  case v: Some[DummyCaseClass] => v.toString
  case v: Some[_] => ???
  case None => ???
}

// similar. But why would you ?
if (res19.isInstanceOf[Some[IntegerParser]]) "1" else ???
```

## Matching and Map
Once you are used to Types. It's time for taking more advantage of Map. It also applies to FlatMap and others which takes partial function.

You can combine pattenr matcning inside lambda function.

```scala
val list: List[Option[Int]] = List(Some(1), None, Some(2))
val result: List[Int]=list.map{ 
  case Some(v) => v
  case None =>  0
}
// Result: List(1,0,2)
```

## Handling List or other Iterable

If you are tricking with List of String, You can pattern match over each values in the list.

```scala
"1,2,3,4,5,6,7,8,9,0".split(",").toList match {
  case first :: second :: third :: fourth :: fifth :: sixth :: seventh :: eighth :: ninth :: zero :: Nil => "Counting Practice"
  case _ => throw new Exception("This is not what I expected")
}
```

Pretty cool isn't it ? This would be pretty handy if you are a heavy spark user.

## Guard Matcning

For last, you can use guards in pattern matching. `if` statments stays inside case boundary before arrow. Just wanted to tell you since I made that mistake pretty often.

```scala
val five = 5
five match {
  case v if v > 5 => ???
  case v if v == 5 => ???
  case v if v < 5 => ???
}

// more practical example
final case class FeeInquiry(user: UserId, amount: BigDecimal, currency: Currency)

val requestedFee: Option[FeeInquiry] = ???

requestedFee match {
  case Some(FeeInquiry(user, amount, currency) if currency === Currency.USD =>
    Right(amount)
  case Some(FeeInquiry(user, amount, currency) if currency === Currency.__ =>
    Left("We can't accept other than USD")
  case None  =>
    Right(BigDecimal(0))
}
```

I reckon this example is pretty practical even though it is simple. Only minus point is that it doesn't use the right Error type. it will be better if you can think of that as well.


To sum up,
#### 1. you match the exact value which is simplest form. if you are using only this type of pattern matching only, you are missing so much benefits.0
#### 2. you can pattern match over its type.
#### 3. you can pattern match over multiple types which makes it pretty cool.
#### 4. you can also pattern match List so it matches length of list as well (what a bonus)
#### 5. you can put guard and put conditions there.

I hope you take advantage of type pattern matching really. It took me long time to know those exist. It does help you minimize typing.

This is one way of loving your precious fingers.