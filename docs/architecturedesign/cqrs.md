---
layout: post
title: "CQRS"
date: 2020-1-23
categories: [programming, software development, CQRS]
author: emmett
comments: true
hidden: true
nav_order: 2
parent: Architecture&Design
---
# CQRS

Before I knew what CQRS(Command and Query Responsibility Segregation) was about, the name just scared me first. I didn't know what Command meant nor the Query. The Query I know was only SQL. I was pretty bad at things I knew only codings but patterns and architectures. But finally learned from practices, and realized things I do/practice have names and one of them is CQRS. So, let me share my story how I got to know CQRS.

When I first started programming, I didn't even know about ORM(Object-relational mapping). I was/am just allergic to fancy names. But then later I realized things I was practicing was actually ORM and CQRS. I guess it all needed names to communicate. I guess that's fair enough. But I wish they were more novice friendly.

So there's no need for fears of fancy names like I did. And there aren't such specific ways that you need to code. As long as your application does what it's gotta do, that's all it matters.

So let's get on with it

We gonna talk about the simplest version. which divide command and query only. If you are looking for a storage divided model, we will talk about it in next session.

### 1. Meaning of CQRS
### 2. How to segregate
### 3. Little bit of coding

---

### 1. Meaning of CQRS

Rather than explaining the meanings, let me give you an example. When my wife and I go out for coffee, I usually make order for both of us because I'm the one who need to pay (with love). Since I made the order, she picks up coffee from counter. So that's command and query segregation. I command and my wife queries. Back to programming world, I ordered to Command Domain, and my wife queried Query Domain. So Input's domain and output's domain is different. If you don't understand what `domain` is, it's just a class that is consist of cores of each service.

So command and query responsibility segregation means, if one domain command and queries at the same time, apart it into two. That's all about it

### 2. How to segregate
if you have a crud model, it's pretty simple. Anything read from db separate from the others.
For example, if you have a REST Api Server, GET will be separated from others in domain layer. I guess it will be a good practice to segregate the api layer too. I haven't tried to segregate the api layer but let me know if you have an experience with it.

### 3. Little bit of codes

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

