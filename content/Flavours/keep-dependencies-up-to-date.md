---
categories:
    - Practices
authors:
    - Yoan Thirion
problems: 
    - How to ensure dependencies freshness of our projects?
    - How can we prevent project dependencies to rot as time passes?
    - How can we quickly measure and communicate our dependencies debt?
---

# Keep Dependencies Up-to-Date
## Description
In this flavour, we will present some strategies and tools that can help you keep your project dependencies up-to-date.

No matter the language nor package manager you use, having a strategy regarding dependencies management inside your team is a must have.

## Why?
`Keep things up-to-date takes time and energy!`

That's a fact, but what is the risk of not doing it?

Here is a non-exhaustive list of issues you could encounter if you do not put some effort on it:
- Can not update a dependency (to use a new feature) because some other old dependencies are not compatibles
- Infrastructure changes may force you to upgrade versions you’re running on (java, PHP, .NET, ...)
- Lack of skills / documentations on some dependencies because they are too old
- Dependencies may contain some [CVEs](https://www.cvedetails.com/)
- Library not maintained anymore

## Problems
    - How to ensure dependencies freshness of our projects?
    - How can we prevent project dependencies to rot as time passes?
    - How can we quickly measure and communicate our dependencies debt?

## How to
### Automatic upgrades
Tools like [Dependabot](https://github.com/dependabot) or [Renovate](https://github.com/renovatebot/renovate) can automate some of the work for us:
- Monitor new releases of oour dependencies
- Create automatically Pull / Merge Requests to update our dependencies
- Configure tools behavior (scheduling, hosting, PRs, ...)

![Dependabot](../../images/keep-dependencies-up-to-date/dependabot-example.webp)

To be honest, it works pretty well for new projects (when you have configured this kind of tools from the beginning) but not for big legacy projects.

Be careful with the usage of those tools, it can create a lot of PRs behind your back, adding some noise to your repository...

`The best way to keep dependencies up-to-date is to dedicate time regularly for it.`

### Create a team routine
No matter the tooling, you have to create some kind of hygiena regarding this topic.
Tools won’t replace a proper strategy from the team to maintain the dependencies.

You should schedule some time in your weekly routine (start with 1 hour for example) for it:
- Identify outdated dependencies
- Upgrade them one by one

It is better to make small upgrades often than spending entire weeks one time doing that. It will be way much easier to do it that way.

### Libyear - Identify Outdated Dependencies
`Libyear` is "a simple measure of *software dependency freshness*. It is a *single number* telling you how up-to-date your dependencies are."

![Libyear](../../images/keep-dependencies-up-to-date/libyear.webp)

#### Examples
Here is an example in `java`
![Libyear in java maven](../../images/keep-dependencies-up-to-date/libyear-java.webp)

And another one in `C#`
![Libyear in csharp](../../images/keep-dependencies-up-to-date/libyear-csharp.webp)

More info [here](https://libyear.com/)

`We highly recommend to track libyear scores over time to be able to communicate dependencies debt with all stakeholders`

## Constraint
- Run `libyear` on your current project
- Discuss the result of it within your team
- Schedule a first hour to work on outdated dependencies (everyone is welcome)

## Resources
- [Libyear Documentation](https://libyear.com/)
- [Keeping dependencies up-to-date by Nicolas Carlo](https://understandlegacycode.com/blog/keeping-dependencies-up-to-date/)