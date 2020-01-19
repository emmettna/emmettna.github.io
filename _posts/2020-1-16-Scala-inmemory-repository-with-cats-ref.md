---
layout: post
title: "Scala InMemory Repository with Cats Ref"
date: 2020-1-16
categories: [programming, scala, software development, in memory, cats, ref]
author: emmett
comments: true
image: assets/images/cats-logo.png
featured: true
---
1. Not enough time to implement Real persistent storage.
2. But stub is too limited option for various cases.
3. When my boss tells me to do it (Duh!)

That's when I use InMemory storage. It's pretty handy when you run your test in your local device. It adds up and erase all the data every time you run it. Plus you can set the initial data for the test. Plus Plus easier(should I say faster?) to implement/refactor codes. Which leads to  productivity.

If you are reading this, you already decided to implement InMemory Storage. I guess I don't need to explain the benefits of it(My bad). Let's do some coding then.

Just Right before type codes, One thing I'd like to mention about it concurrency. Which is why I and We are going to use `Cats.Ref` Well, it's not exactly called `Cats.Ref` but for the sake of brevity.

Honestly I'm not really good at Cats effect types but let me share at least as much as I know for now. I will abstract Effect type. But it won't matter as long as you use any cats implemented effect types like CatsIO, Zio or what not.

Let's say we have such repository

```scala
final case class Human(name: String, age: Int)

trait SimpleCrud[F[_]] {
  val simpleCrudService: SimpleCrud.Service[F]
}
object SimpleCrud {
  trait Service[F[_]] {
    def add: F[Unit]
    def find(name: Name): F[Option[Human]]
  }
}
```

Then InMemory storage can be implemented such way

```scala
import cats.Applicative
import cats.effect.concurrent.Ref
import cats.implicits._
import cats.effect._

class InMemorySimpleCrud[F[_]: Applicative](ref: Ref[F, Map[String, Human]])
    extends SimpleCrud.Service[F] {

  override def add(human: Human): F[Unit] =
    ref.update(_.updated(human.name, human))

  override def find(name: String): F[Option[Human]] =
    ref.get.map_.get(name)
}
object InMemorySimpleCrud {
  def apply[F[_]: Applicative](implicit FF: Sync[F]): InMemorySimpleCrud[F] =
    new InMemorySimpleCrud[F](Ref.unsafe[F, Map[String, Human]](Map[String, OrderHistory]().empty))
}

```

It ain't so bad huh?

I skipped one flatMap in order to make the code more shorter and clean. I wouldn't recommend using Ref.unsafe unless it's a toy project. Only difference is F[Ref[F, _]] and Ref[F, _]. Just the outer Effect type

You just need to use flatMap in real case in order to unwrap when you apply initiate InMemory. (feel free to leave a comment below if you still don't understand)

I also set the initial state as empty. But you can always set the initial state with something else as long as you know java Map, it won't be too difficult to swap it with your own.

It's pretty simple coding if you how things work in Scala and cats. But if you are only familiar with sequential programming, this simple coding is also challenging task. So no need to feel bad if you don't know it nor feel greater if you reckon this is way too simple. We all had the time when we just started.
