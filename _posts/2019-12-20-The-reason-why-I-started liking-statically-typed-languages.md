---
layout: post
title: "The reason why I started liking statically typed languages"
date: 2019-12-20 00:00:00 -0000
categories: jekyll update
author: Emmett Na
comments: true
---
Back when I landed my very first job as a developer, my Moto was 'As long as it works, it doesn't really matter' Since I didn't have any mentor nor any teacher to correct me, failure was the only way to learn something. Although it was difficult and hard way but clear way to carve  the lesson in my mind.

Back then I had to write in Python 2.7 which my employer didn't know why we needed to use 2.7 version but he reckoned it will be some how beneficial later on to analyze users data. Since it can be done in Python. Apparently he didn't know the fact that they can be two different services, well he didn't know it **should be** two different services. I understand back then, he wasn't in the industry that long. Just like me.

So one day, I had to make a cron job which pulls data from outside service and update internal database. then I started writing Python script job.  That's when I first faced the hell.

```python
def load_config(host, id, pass):
    ...

```

You can think of many possible ways that I fail in this code, but one of them was sequences of arguments.

```python
config = load_config("root", "1234", "localhost")
```

I never thought I'd make such a stupid mistake, but I was too stupid to think that way. We always make the same mistakes over and over.

This can be controversial tho,  Some may say,

> They always have to be string values, so it doesn't have to do with types actually.


That's not 100% wrong but probably 30% right I'd say.

```scala
final case class ConfigHost(value: String)
final case class ConfigId(value: String)
final case class ConfigPass(value: String)

def loadConfig(host: ConfigHost, id: ConfigId, pass: ConfigPass): Unit = ???

```

It will be a lie if I say that I always write codes like that. But I **do** make types when it takes same types in a row.

You may make mistakes when you parse the string type with Config* types. But it's a much safer way.

Another recommendable way would be named parameters.

```scala
val configHost = ???
val configId = ???
val configPass = ???

loadConfig(
  host = configHost,
  id = configId,
  pass = configPass)
```

it does require a bit more typing. also it looks messier sometimes. but again very recommendable way to save your ass most of the time. Trust me

I always thought good code is shortest code so it can be maintainable easier since there's not much code. but lately, a length of code is fine as long as it's understandable. I use other tricks to shorten codes. I hope to have a chance share my tricks some day.

> But why statically typed languages?

Let's say you need to carry water. and the water was sealed in the plastic bottle. it looks transparent. it was written water in the label. but when you open it, it's not water. what would you say or feel ? that's reason why I don't use dynamic types. you can never trust unless you taste it every time.

I do get feelings that it will be super easier to work and make faster outcome in some task, if I used dynamically typed languages. but I know myself that I **will** make mistakes.

I guess you should't trust yourself too much as well