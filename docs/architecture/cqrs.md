---
id: cqrs
title: CQRS
---

Before I knew what CQRS(Command and Query Responsibility Segregation) was about, the name just scared me first. I didn't know what Command meant nor the Query. The Query I know was only SQL. I was pretty bad at things I knew only codings but patterns and architectures. But finally learned from practices, and realized things I do/practice have names and one of them is CQRS. So, let me share my story how I got to know CQRS.

When I first started programming, I didn't even know about ORM(Object-relational mapping). I was/am just allergic to fancy names. But then later I realized things I was practicing was actually ORM and CQRS. I guess it all needed names to communicate. I guess that's fair enough. But I wish they were more novice friendly.

So there's no need for fears of fancy names like I did. And there aren't such specific ways that you need to code. As long as your application does what it's gotta do, that's all it matters.

So let's get on to it

We gonna talk about the simplest version. which divide command and query only. If you are looking for a storage divided model, we will talk about it in next session.

### 1. What is CQRS
### 2. How to segregate
### 3. A bit of coding

---

## What is CQRS

Rather than plain explanation, let me explain to you by an example.
Every sunday morning, my wife and I, we go out for coffee. When it comes to our turn to order, it's me who making orders for both of us because I'm the one who needs to pay for coffee(for good). Since I made the order, she picks up coffee from the counter. So that's command and query segregation. I command and my wife queries. Back to programming world, I ordered to Command Domain, and my wife queried Query Domain. So the vehicle of input and output is different. But the vehicle doesn't always have to be different. But thinking about why it's gotta be the same. Not much reason.

In coding, if you use the same model or data structure in command and query, you can save time writing extra code. But that will result in overheads of unneccessary data.

So command and query responsibility segregation means, if one domain command and queries at the same time, apart it into two or more if needed. 

That's pretty much about it. Simple concept but we've forgotten for a long time.

## How to segregate
### In CRUD service
Just try to separate command(insert) model from query(select) model. Let's say you have a `User` domain which has `name` and `age`. if you want to show only `age` but `name`, you don't need to query name. so you will need to query only `age`.

For this reason, ORM is a pretty bad practice. Better write queries than overhead and security vulnerability.

## A bit of coding

Let's try small segregations


This is command model
```scala
trait UserCommand {
	def add(u: User): F[Unit]
	def update(u: User): F[Unit]
	def updateNameById(id: UserId, newName: String): F[Unit]
	def removeById(userId: UserId): F[Unit]
}
```
Insert, Update and delete are all in command model

And this is query(presentation) model

```scala
trait UserPresentation {
	def find(userId: UserId): F[option[User]]
	def findByName(name: String): F[Option[User]]
}
```

Simply divide them.

You might ask

> _What's the benefits of it ? It just seems like more codes_

Well, yeah right there are more codes involved but just a little bit more.

##### 1. But you can separate the responsibilities. That's the main reason. In the beginning of a project, we don't realize how complex things are going to be but soon we realize, things are too complex so it's difficult to remember what does what.

##### 2. You can code in two different models. This is pretty big I tell ya. Sometimes my IntelliJ runs out of breath because of complexity of the codes probably too much implicits. But if you separate the models, it doesn't have to index other files. Which leads to productivity. Unless you are using a note pad, you will understand.

##### 3. If you segregated as two persistent storages along with models, which is good practice, you can read faster. Especially if you read very often, benefits will be doubled.

This is the simplest version I can think of I may write more about advanced version later.

##### Useful links

- [CQRS patttern from ms](https://docs.microsoft.com/ko-kr/azure/architecture/patterns/cqrs)

