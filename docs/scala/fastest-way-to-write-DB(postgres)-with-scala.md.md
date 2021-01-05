---
id: fastest-way-to-write-DB(postgres)-with-scala
title: Fastest way to write DB(postgres)
sidebar_label: Fastest way to write DB(postgres)
---
Back when I first started connecting persistent storage, I had no idea absolutely. It was a nightmare literally. Things I googled didn't work for some reasons. Most of them were too outdated and some are just not working codes. I didn't know how to customize sample codes since I didn't know the tricks of Type. And things like Resouces or Managed? They just drove me insane.

But I hope you don't walk the hard way i did. Here's minimal tutorial with [example project](https://github.com/emmettna/scalapostgrestutorial). So no one needs to crack foreheads against wall which i did.

1. Connecting Single transactor
2. Connecting with Transactor as Resource
3. Writing SQL using Doobie
4. Execute Transaction


First thing first, We need add dependencies in `build.sbt` file. If you were following the sequels you just need to add
```scala
        ...
        val doobieVersion = "0.8.8"
        ...
      "org.tpolecat" %% "doobie-core" % doobieVersion,
      "org.tpolecat" %% "doobie-postgres" % doobieVersion,
      "org.tpolecat" %% "doobie-hikari"    % doobieVersion
```

in `build.sbt` `root.settings()`. But if you just opened this page, you'd want to add http4s and cats etc. it's too long to paste in here, so please visit the example [githup page](https://github.com/emmettna/scalapostgrestutorial/blob/master/build.sbt) kindly.

Then we are ready to implement a single transactor.

### 1. Connecting Single transactor
make a package for transactors which deals with databases so you can manage the files efficiently.

We are going to implement using _Doobie_. It's pretty much standard as far as i know. Let me know if you know any better library.
Anyway,
```scala
import cats.effect.{Async, Blocker, ContextShift}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux

def xa[F[_]](implicit cs: ContextShift[F], async: Async[F]): Aux[F, Unit] =
    Transactor.fromDriverManager[F](
      driver = "org.postgresql.Driver",
      url = "jdbc:postgresql://localhost:5432/"
      user = "tutorial",
      pass = "1234",
      blocker = Blocker.liftExecutionContext(ExecutionContexts.synchronous)
    )
```

I hope you don't get stressed with F type. it's just effect type which runs in main method.

In my case, i set the user name as 'tutorial' and password '1234'. it would be a better idea if you used PureConfig. but for the simplicity, i hardcoded. as you can see i ran the postgres on 5432 port which is default port.

you'd want to prepare postgres server in advance otherwise use docker-compose i added on [githup](https://github.com/emmettna/scalapostgrestutorial/blob/master/docker-compose.yml).
Just run on the project root
```
emmett$ docker-compose up -d
```

But in real world, you'd want to use Resouce. resource releases its connection when it finishes its uses. So it prevents leaks.

### 2. Connecting with Transactor as Resource
I recommend you to use Hikari Connection Pool this is also standard and you can find references easily. For me it was difficult to understand references and documentations and use in real life. So feel free to leave comments if you don't understand.

```scala
import cats.effect.{Async, Blocker, ContextShift, Resource}
import doobie.hikari.HikariTransactor
import doobie.util.ExecutionContexts
def loadTransactor[F[_]: Async: ContextShift](
      driver: String,
      url: String,
      user: String,
      password: String): Resource[F, HikariTransactor[F]] =
    for {
      ce <- ExecutionContexts.fixedThreadPool[F](4)
      xa <- HikariTransactor.newHikariTransactor[F](
        driver,
        url,
        user,
        password,
        ce,
        Blocker.liftExecutionContext(ce)
      )
    } yield xa
```

It depends how freqeunt your transactions are, but 4 is more than enough it seems :)

in the main class, use resource by mapping.`xa` is common way of calling transactor.

```scala
  val pgResource: Resource[IO, HikariTransactor[IO]] =
    HikariCpConnectionPool.loadTransactor("org.postgresql.Driver",
                                          "jdbc:postgresql://localhost:5432/",
                                          "tutorial",
                                          "1234")

  def run(args: List[String]): IO[ExitCode] =
    pgResource.use { xa =>
      TutorialServer.stream[IO](xa).compile.drain.as(ExitCode.Success)
    }
```

### 3. Writing SQL using Doobie

Now let's write some PostgreSQL queries.

```scala
import com.example.tutorial.tutorial.domain.User
import com.example.tutorial.tutorial.persistent.UserRepository
import doobie.free.connection.ConnectionIO
import doobie.implicits._

  def select(id: BigDecimal): doobie.Query0[User] =
    sql"""
         | SELECT id, name, email FROM  "user" WHERE id = $id
         |""".stripMargin.query[User]

  def add(u: User): doobie.Update0 =
    sql"""
         | INSERT INTO "user" (id, name, email) VALUES (${u.id}, ${u.name}, ${u.email})
         |""".stripMargin.update
```

`doobie.implicits._` has got most of necessary things. so don't forget to import. and there are `doobie.postgres.implicits._` as well, it's useful when you transform case class into postgres objects. I just didn't need it in this example. but this will be usefuli guerantee.

as you could see above, query's return type is `doobie.???` which is not expected type we wanted.
we need to make ConnectionIO type. this case the `F` type is ConnectionIO.

```scala
  override def find(id: BigDecimal): ConnectionIO[Option[User]] =
    PostgresUserRepository.select(id).option

  override def add(u: User): ConnectionIO[Unit] =
    PostgresUserRepository.add(u).run.map(_ => ())
```

### 4. Execute Transaction
Once you got the connectionIO type, you can put transactor with it.

```scala
val xa: transactor.Transactor[F]  // in this project we used `cats.effect.IO` type. so eventually the `F` type will turn into `IO` type

userRepository.add(user).transact(xa) // F[Unit]
userRepository.find(userId).transact(xa) // F[Option[User]
```

you might wonder why use `F` instead of adding `IO` straight. I had the same question back then but just didn't have anybody to ask.

There are many effects types along with `cats.effect.IO`. Since catsIO is generic, it's not very optimized to performance. So it's mostly used for toy progject or low latency projects like, less than 10 requests although it would matter what kind of service it is.
Along with that, there are `ZIO`, `Monix` and others.

Anyways, this is pretty much it. I highly recommend you to check the example repo. since my explanation is not enough. Developers learn from codes i think.

check the transactors in [`com.example.tutorial.tutorial.common.persistent`](https://github.com/emmettna/scalapostgrestutorial/tree/master/src/main/scala/com/example/tutorial/tutorial/common/persistent)
and repository in [`~~.tutorial.persistent.postgresrepository`](https://github.com/emmettna/scalapostgrestutorial/blob/master/src/main/scala/com/example/tutorial/tutorial/persistent/postgresrepository/PostgresUserRepository.scala)
then finally sewing services in [`TutorialServer`](https://github.com/emmettna/scalapostgrestutorial/blob/master/src/main/scala/com/example/tutorial/tutorial/Main.scala) file and [`Main`](https://github.com/emmettna/scalapostgrestutorial/blob/master/src/main/scala/com/example/tutorial/tutorial/TutorialServer.scala)




