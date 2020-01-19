---
layout: post
title: "Things I didn't know that were important when I was working alone"
categories: [Codereview, personal, teamwork]
author: emmett
comments: true
---
I'd like to share some of my mistakes that I didn't know that were important when I was working alone. Especially if you are the only developer in your team or company, probably starting start up company, you may have made the same mistakes.

I read many articles when I was working alone. Even though I was throttled by dead lines. Because I thought it is very important to catch up with new techs and paradigms. I didn't think I can be so called rockstar developer but I wanted to be somebody who doesn't get blames at least.

When I fist landed a job that I could work with dozens of other developers, I was very fascinated full of expectation of having coding and tech conversations with teammates. But unfortunately, the team was only focusing on making a single product and neglecting to employ new technologies. Besides, everyone was junior developers who just finished bootcamps. They were to make products, to be employed. But no love nor desire for programming.

Only places I could share and learn were study groups. But it was pretty limited since we studied once a week only. So I couldn't stay in the company for a long time. I had to find somewhere I can develop myself. My boss said he will raise my salary so stay. But man knew when to leave.

A couple of years later, I landed another job that has very different developing culture. Pretty hardcore developers. Although Not everyone was ready to embrace the new techs, the Dev team was ready to draw sword to fight whatever obstacle they face, in order to establish IT company cultures.

Unfortunately, I didn't quite fit in the team. I've been always in traditionally structured organizations. bosses distributes tasks, and finish by deadlines. I was a coding monkey. And to be honest, it wasn't so bad. I enjoyed make codes lean and short.

But when I arrived this job, They slapped my face with words, what I mean by that was, I got hundreds of comments in code reviews. Not to mention I never had code reviews before, no one corrected my codes.

First I was so humiliated for how stupid I was. my ears turned red, and they were all right about my codes, I didn't follow the coding styles which I didn't think it was important. I always thought it was like a chain making things more difficult. But when I needed to understand other's codes, it's pretty difficult when it wasn't  following the same styles.
And especially naming conventions. I named whatever comes in mind first, then it didn't suit for the function at all.

```scala
// name says taking Id but parameter takes name
def findById(name: String): Entity = ???
```

As a result, I slowed down my entire team's productivity. And everyone was mad at me. I wanted to runaway. I was so embarrassed. If I defend myself, I've never been working in the good developer's culture. I guess only few companies are privileged to have it in Korea. Anyway, my teammates gave me another chance thankfully. Now I give it better names but still difficult. As you know, naming is the hardest part in programming.

As I mentioned earlier, I sort of enjoyed being a coding monkey. But as you can expect, I never concerned about architectures and patterns. I wasn't even familiar with using interfaces. Back then, I often wondered why I needed to use interfaces. But again, you don't really think about these when you work alone.

My domain model was coming all the way from back to front moving back and forth. Nothing hidden back, all the logic was tangled and coupled so hard. This part again, I still struggle but I try to follow some guidelines.

It would've been much easier if one senior developer reviewed my code and gave me some hints that I'm running toward wrong way. So I need to lift my head up and find the goal first.

If I make my points clear,

1. Make function names which suit the behavior of a function or a variable. So your teammate(s) can know what the function does better. It's never enough to mention its importance.

2. Coding is great but design matters much more. Coupled codes can't be structured properly. Divide the responsibility first.

