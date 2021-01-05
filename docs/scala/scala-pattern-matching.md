---
id: scala-pattern-matching
title: "Pattern matching"
---

If you are a Scala user, you probably use pattern matching pretty often. It's really power and useful feature. it's not like Java's asInstanceOf. It doesn't get runtime error without parsing try catch. Well, if you are a Scala user, you don't really use try catch tho.

Anyways, lets dive into it.

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

```scala
final case class IntegerParser(value: Int)

val prasedInt = IntegerPraser(value = 1)

parsedInt match {
  case IntegerParser(value) => value.toString
  case _ => "Invalid Int"
```

Looks familiar? yeah, for sure. you probably have been using this pattern already.
```scala
val optionValue = Option(1)

optionValue match {
  case Some(v) => ???
  case None => ???
```

Yeah, that's right. It is not limited to Option, Future or Either. It's for all classes.

How about multiple depths ?
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

Another useful example

```scala
val list: List[Option[Int]] = List(Some(1), None, Some(2))
val result: List[Int]=list.map{ numberOpt => numberOpt match {
  case Some(v) => v
  case None =>  0
}}
```

If you are tricking with List of String, You can pattern match over each values in the list

```scala
"1,2,3,4,5,6,7,8,9,0".split(",").toList match {
  case first :: second :: third :: fourth :: fifth :: sixth :: seventh :: eighth :: ninth :: zero :: Nil => "Counting Practice"
  case _ => throw new Exception("This is not what I expected")
}
```

Pretty cool isn't it ? This would be pretty handy if you are a heavy spark user?

Next but Last, you can put guards in it
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

I reckon the last example is pretty practical even though it looks simple. I personally use often when I have to deal with strings but make sure you turn the type into List of String. Because "split" returns Array[?] type.

To sum up,
1. you match the exact value which is simplest form. if you are using only this type of pattern matching only, you are missing so much benefits.0
2. you can pattern match over its type.
3. you can pattern match over multiple types which makes it pretty cool.
4. you can also pattern match List so it matches length of list as well (what a bonus)
5. you can put guard and put conditions there.

I hope you take advantage of type pattern matching really. It took me long time to know those exist. It does help you minimize typing.

This is one way of loving your precious fingers I guess.