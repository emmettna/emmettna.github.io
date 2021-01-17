---
id: scala-inmemory-repository-with-cats-ref
title: InMemory Repository with Scala Cats Ref
sidebar_label: InMemory Repository with Cats Ref
---
## What's Inmemory Repository

In Memory repository is, volitile repository. Something to be deleted when your system's power is off. Not sustainable nor fault tolable. 

But fast and easy to use.

## When to use

1. Not enough time to implement Real persistent storage.
2. But stub is too limited option for various cases.
3. When my boss tells me to do it (Duh!)

That's when I use InMemory storage. It's pretty handy when you run your test in your local device or any none production environment. It adds up and erase all the data every time you run it. Plus you can set the initial data for the test. Plus, it's easier(should I say faster?) to implement/refactor codes. Which leads to high productivity.

If you are reading this, you already decided to implement InMemory Storage. I guess I don't need to explain the benefits of it(My bad). Let's do some coding then.

## Dependency

You need only Cats Core for this, but if you need a quick effect type, then add cats effect too

```scala
...
val catsVersion = "0.2.2"
...
"org.typelevel" %% "cats-core"  % catsVersion,
"org.typelevel" %% "cats-effect" % catsVersion,
```

## Handling Concurrency

Just Right before type codes, One thing I'd like to mention about is concurrency. Which is why I and We are going to use `Cats.Ref` Well, it's not exactly called `Cats.Ref` but for the sake of brevity, Let's call it this way.

By using Cats.Ref, we can handle concurrency problem. the one who has the key will open the lock.
Yes, it takes care of concurrency problem behind the scene.

## Effect type

Honestly I'm not really good at explaining Effect type. So just to tell you the breif concept for now. 
Most commonly we use `F` for effect type. It's just convention. And `F[_]` means, F wraps effect inside which will be caused. But it will cary all the way until it reaches `~~.Run`. So effects can be safely kept.

We will deal with this later on. So don't worry about it too much. But for now, `Cats.Ref` is wrapped in an effect type. And at some point, it will need to call `Run`. So during your test, even if console doesn't print the actual content, don't get confused much. It's just natural because it's not run yet but kept in memory area.

## Simple Example

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

Our SimpleCrud repository can be implemented like so.

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

It's not so bad huh?

## Recap

I skipped one flatMap in order to make the code more shorter and clean. I wouldn't recommend using Ref.unsafe unless it's a toy project. Only difference is F[Ref[F, _]] and Ref[F, _]. Just the outer Effect type

You just need to use flatMap in real case in order to unwrap when you apply initiate InMemory. (feel free to leave a comment below if you still don't understand)

I also set the initial state as empty. But you can always set the initial state with something else as long as you know java Map, it won't be too difficult to swap it with your own.

It's pretty simple coding if you how things work in Scala and cats. But if you are only familiar with sequential programming, this simple coding is also challenging task. So no need to feel bad if you don't know it nor feel greater if you reckon this is way too simple. We all had the time when we just started.
