---
id: tuple-type-alias-and-case-class
title: Tuple, Type Alias and Case Class in Scala
sidebar_label: Tuple, Type Alias and Case Class
---
In a situation when you can't decide what type to use for your function and return, You are left to make a decision.

> <i>Should I use Tuple or type alias in order to make my intention clearer ? Or Case class ? So there won't be type collision?</i>

Let's figure out that answer I often face. I hope you have that question often too so I won't feel lonely.

## Advantage of Type
We are lucky to use Scala since we can take big advantage of Types. Scala is well designed Statically typed language. If your function returns the right type, it's most likly working as you intended.
But one pit fall is, you need to state the Types whether you want it or not. So sometimes you need to deal with simpler and risky way than safe way.

Let's analyze the pros cons.


```scala
// We want to return two string types which contains userName and BigDecimal which contains pocket money
def getCustomerPocketMoney( name: String): ???

```

### Tuples

If we are about to use Tuple, this is the fastest way.
```scala
def getCustomerPocketMoney( name: String): (String, BigDecimal)
```

But if the pocket money is meant to return in String, guess what kind of human error can be found
```scala
def getCustomerPocketMoney( name: String): (String, String) =
	val pocketMoenyAmount = BigDecimal(0).toString
	(pocketMoenyAmount, name) // Oops?! They are switched!
```

it happens pretty often at least for me. So I love taking the a little safer approach.

### Case Class

You can use case class for this. Case class is meant to be used in date type.

```scala
final case class NameMoneyPair(name: String, pocketMoney: String)

def getCustomerPocketMoney( name: String): NameMoneyPair =
	val pocketMoenyAmount = BigDecimal(0).toString
	NameMoneyPair(name = name, pocketMoney = pocketMoneyAmount)
```

Obviously a little bit more coding. But less chance of making mistakes.

Let's get back to Tuple example. We can see what type of value is returning from the call but if you don't have a look inside carefully, you can't know what the pair means. So I love giving it name

### Type Alias

Witnout declaring Case class, you can alias you tuple to some type

```scala
type NameMoneyPair = (String, BigDecimal)

def getCustomerPocketMoney( name: String): NameMoneyPair

```
So you get to a point that if you need to name every tuple types. It's just too much.  Yeah I think you should give it names as much as you can. It just helps you get away from complexity. But I give it an exception if it's used in a very limited scope like inside a function
```scala
import java.util.Random

def getSum() = {
	val random = new Random
	val list = List("James", "Bond", "Alicia", "Eva", "Green")

	def getPair(): (String, BigDecimal) = list.map((_, BigDecimal(random.nextInt()))

	getPair.map(_._2).sum
}
```
It makes sense that it's encapsulated in the function so no other element knows what it does. 
As long as you name the higher function name properly, it won't matter much. Which is the most difficult part(no one likes naming)

## ADT

So, do I always code like this ? The answer is No. I use ADT too.

A little more codes than case class. But much more readable. you need to write codes for someone who will read the code in the future. In that case ADT is a better way.

```scala
sealed trait CustomPair
object CustomPair {
	case class NamePocketMoney(name: String, pocketMoney: BigDecimal) extends CustomPair
	case class NamePocketMoneyStr(name: string, pocketMoneyStr: String) extends CustomPair
}
```

But sealed trait must be declared in one file. it's a hard job when it makes cycle inside the file. In cycle, compiler takes long time to find the implicits. So I don't recommed to make mulitiple depth of ADT.

## Conclusion

So the reason why I ask myself what to use is, not because I don't know which is the best way. But because how much time do I have or how much resource do I have.