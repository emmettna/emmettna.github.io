---
id: crud-vs-eventsourcing
title: CRUD vs EventSourcing
sidebar_label: Crud vs EventSourcing
---

## First hand, What are CRUD and Event Sourcing?

Let's start with something we are familiar with first.

CRUD stands for Create, Read, Update and Delete. And it's a pattern  that we use very common. Back in the primitive days, I guess we didn't really do anything special complicated with backend server. All it needed to do was storing data then get it back. For example like boards, galleries and comments. Your program just needed to save the data, load the data, update the data and delete the data. Pretty straight forward. All it needed simply CRUD.

On the other hand, Services like Bank Account, it can't just CRUD. Let's say that your bank updated wrong amount of money in your account  by mistake like -1000 bucks. Then guess what? There's no trail that you can prove your money is stolen !

> Oh why not leave a trail in every update call in a different table?

Yeah that can work. But Are you sure that you can handle all those complexity? How about we give more priority in the trail and just use the  updated value as cached data. So when the data is polluted, it can re-calculate it all the times, like when your server is down all of sudden, you don't need to worry about data loss.

Like this kind of trouble.

You made a payment for your Christmas present. But before the website executes update query for update of unpaid amount, it lost connection. Oh then they deducted money from your account by updating balance, but unpaid balance is still the same.

```scala
def payment(): F[Unit] =
  for {
    _ <- updateAccountBalance(-1000)
    _ <- updateUnpaidBalance(-1000)
  } yield ()
```

Leaving trail is always a good practice like documentation. You can read it again anytime and execute it again. It's pretty much like the same paper account back in the days, it leaves all the trails in your paper. So it lets your remind where you spent money(unfortunately)

So yeah, Event sourcing is making the current state from the records, that's pretty much it.

Anyways, back to the beginning. 
## What are the benefits ?

CRUD is light weighted than  Event sourcing comparably. Although it can vary. So if you want to make a simple website I would recommend CRUD. But if the execution trails are important like Account or like any money involved applications. I would recommend Event sourcing.

When we talk about Event sourcing, there's a friend called CQRS. They are best friends really. Event sourcing can't have strong power without its best friend. CQRS is well, it's just generally good practice I reckon. Especially if you like FP, you will get along with CQRS better actually.

If you are not familiar with CQRS, follow the link and have a quick look since it's not so complicated concept.

## So why Event sourcing gets more power with CQRS?

If you still don't get the point why they get along well, it's simple.

- it reduces complexity
- it's better performance

I mean so much by reduce complexity actually it contains, domain model simplicity, query model complexity, easy to test, decoupling data model with domain model and so on.

Once you get used to it you will know why you shouldn't. My only complain about CQRS is typing a bit more codes and syncing models. Although they don't have to be the same model, they need link at least. Say that we change the age from BigDecimal to Int

```scala
final case class User(name: String, age: Int)
final case class UserCommand(name: string, age: BigDecimal)
```
You need to change manually. Compiler will catch the type difference in the end but when you change the name, you really need to do all manually.

Briefing up,

##### 1. Employ CRUD for simple data storing app
##### 2. Event Sourcing is not MacGyver but it's really good when you deal with state.
##### 3. [CQRS](/docs/architecturedesign/cqrs) is a good help for Event Sourcing.