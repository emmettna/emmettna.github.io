---
layout: post
title: "(Tutorial) Fastest way of write Http4s server"
date: 2020-2-25
categories: [programming, software development, http4s]
author: emmett
comments: true
image: assets/images/http4slogo.png
hidden: false
parent: Scala
nav_order: 4
---
Fastest way to deploy Http4s

There are a few options when it comes to deploy http server using Scala. If your server is to be a full stack server which needs to deploy webpage and server at the same time, Play will be a good option. But if your intention is to deploy a rest api server and if you wanna use more type stricter  codings, Http4s is the best option I believe.

1. Generate Http4s Server by Sbt commands
2. Set basic infos and run
3. Trick it by your taste

We will use following versions, in sbt settings
```scala
val scalaVersion = "2.13.1"
val http4sVersion = "0.21.1"
Val circeVersion = "0.13.0"
```

1. Generate Http4s Server by Sbt Commands

	I hope you have Sbt and JDK are installed already :)

```
temp sbt new http4s/http4s.g8
[info] Loading settings for project global-plugins from metals.sbt ...
[info] Loading global plugins from /Users/???/.sbt/1.0/plugins
[info] Set current project to temp (in build file:/Users/???/temp/)
[info] Set current project to temp (in build file:/Users/???/temp/)
name [quickstart]: tutorial
organization [com.example]: com.example.tutorial
package [com.example.tutorial.tutorial]:
scala_version [2.13.1]:
sbt_version [1.3.8]:
http4s_version [0.21.1]:
circe_version [0.13.0]:
logback_version [1.2.3]:
specs2_version [4.8.3]:

Template applied in /Users/???/temp/./tutorial

```

I set the name `tutorial` if you have a specific project name, then that will be the one for name.

We are not dealing with logbook and specs2 so it didn't matter much.

2. Set basic infos and run
In my device 8080 is in use with different project so I changed port 8090 at `src.main.scala.com.example.tutorial.tutorial.TutorialServer`

> I hope you don't use hard coded port number and host. That's not the best practice as far as I can tell

Since this template project contains revolver already, you can simply run the project `reStart`

Then you will see

```
sbt:tutorial> root [ioapp-compute-0] INFO  o.h.b.c.n.NIO1SocketServerGroup - Service bound to address /0:0:0:0:0:0:0:0:8090
root [ioapp-compute-0] INFO  o.h.s.b.BlazeServerBuilder -
root   _   _   _        _ _
root  | |_| |_| |_ _ __| | | ___
root  | ' \  _|  _| '_ \_  _(_-<
root  |_||_\__|\__| .__/ |_|/__/
root              |_|
root [ioapp-compute-0] INFO  o.h.s.b.BlazeServerBuilder - http4s v0.21.1 on blaze v0.14.11 started at http://[::]:8090/
```

You can try the already implemented endpoint

```
curl localhost:8090/hello/emmett
{"message":"Hello, emmett"}%
```

This is pretty much just deploying a sample Http4s server. Wasn't so hard actually.
But you always need to bake your own breads with extra sugars. So let's try that.

3. Trick it by your taste

Let's make some requirements.
- it should be able to return `case class` defined object
- it should be able to take post request body as `case class UserName`
- it should return Forbidden for anonymous accessing user level request

first of all, I defined tutorial case class for return on GET request
```scala
package com.example.tutorial.tutorial.presentation

import io.circe.generic.JsonCodec

@JsonCodec
final case class Tutorial(id: BigDecimal, name: String)
```

JsonCodec is annotated you will want to add `-Ymacro-annotations` in scalacOptions in `build.sbt` otherwise it won't compile
Along side with that, add `import org.http4s.circe.CirceEntityCodec._` in Routes file
in my case `src.main.scala.com.example.tutorial.tutorial.TutorialRoutes`

So far so good ?

Then I implemented
```scala
  def tutorialRoutes[F[_]: Sync] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> Root / "tutorial" =>
        val tutorial = Tutorial(BigDecimal(1), "Http4s")
        for {
          resp <- Ok(tutorial)
        } yield resp
    }
  }
```

Just returning tutorial on GET request. Pretty simple
Then add your new route to httpApp on TutorialServer file

After you restart your project, if you run commands
```
Emmett> curl localhost:8090/tutorial
{"id":1,"name":"Http4s"}%
```
You will get result like this

If you got NotFound, you probably forgot to `reStart` the server or, didn't add in httpApp.

Apparently requirement 1 is checked.

For the second requirements,
```scala
package com.example.tutorial.tutorial.presentation

import io.circe.generic.JsonCodec

@JsonCodec
final case class UserName(id: BigDecimal, name: String)
```
Such case class added. We will be using as input data in Post Request

```scala
  def userNameInputRoutes[F[_]: Sync] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case req @ POST -> Root / "user-name" =>
        for {
          body <- req.as[UserName]
          _ = println(body)
          resp <- NoContent()
        } yield resp
    }
  }
```
What's different from the others is, Obviously POST from GET then I added `req@` in pattern matching

After that, add in httpApp just like before,

run command
```
Emmett> curl --header "Content-Type: application/json" --request POST --data '{"id":1, "name":"Emmett Na"}' localhost:8090/user-name
```
You won't get any result but you will have your UserName class printed on console
```
root UserName(1,Emmett Na)
```

Seems like Requirement two is checked!

We defined a dummy RegisteredUser list we will consider whoever not in the list is not registered.


```scala
  def userLoginRoutes[F[_]: Sync] = {
    val registeredUser = List(UserName(BigDecimal(9999), "Emmett Na"))

    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case req @ POST -> Root / "user-access" =>
        for {
          body <- req.as[UserName]
          resp <- registeredUser.contains(body) match {
            case true  => Ok("Welcome")
            case false => Forbidden("Unauthorized User")
          }
        } yield resp
    }
  }
```

Then we curl with data
```
Emmett> curl --header "Content-Type: application/json" --request POST --data '{"id":1, "name":"Emmett Na"}' localhost:8090/user-access
"Unauthorized User"%

Emmett> curl --header "Content-Type: application/json" --request POST --data '{"id":9999, "name":"Emmett Na"}' localhost:8090/user-access
"Welcome"%
```

So, all the requirements are met.
I hope you got the concept of the usage of Http4s. It was really vague for me when I first entered Scala world. Especially with the `F` type. But don't despair there's no enlightenment  without struggle.

I added repository on reference that i worked you can match with yours if you can't catch up

Good Code!

**Reference**

Http4s giter8 template : [github](https://github.com/http4s/http4s.g8)

Http4s document : [document](https://http4s.org/latest/)

repository : [http4stutorial](https://github.com/emmettna/http4stutorial)


