---
layout: default
title: Architecture Decision Record
parent: Xtrem TDD
problems:
    - How to capture important architecture or design decision made along with its context and consequences ?
tags: 
    - Architecture
nav_order: 2
---
# Architecture Decision Record (ADR)
An architecture decision record (ADR) is a document that captures an important architecture decision made along with its context and consequences.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Description
You can capture any kind of decision :
- Architectural Decision (**AD**) : a software design choice that addresses a functional or non-functional requirement
- Architecturally-Significant Requirement (**ASR**) : a requirement that has a measurable effect on a software system’s architecture

The collection of all ADRs created and maintained for a particular project, product or organization is called an Architecture Decision Log (**ADL**)

## Why ?
When adopting ADRs you will observe many benefits :
- **Alignment** : ADRs make it easier to structure design discussions for teams. It creates instant alignment on best practices. It has the benefit of removing duplicative efforts, making code reusable across projects and reducing discussions regarding the past (because each decision has clearly been justified).
- **On-boarding** : Future team members are able to read a history of decisions and quickly get up to speed on how and why a decision is made and its related impact.

`ADRs will save you from future discussions like: why did we implement? ... it's historic...`

## How to
- Define a small process with your team mates

![Example process](img/adr-states.png)
- Start with a template (Don't be too formal at the beginning)
    - Start with an existing one (check related resources)
- You can use a tool like [adr-tools](https://github.com/npryce/adr-tools)

## Template
```markdown
# Title
- Date : <date>
- Who were involved in the decision : <decides>

## Context
Describe the decision context :
- Business requirement
- Forces at play
- Related project(s) or product(s)
- Problem statement (what is the problem we want to solve)

`This is the story that explains the problem we want to solve.`

## Considered Options
Describe each available options here.
For each option, describe :
- ✅ Pros and ❌ Cons 
- The consequences of this option (you can use a [SWOT](https://en.wikipedia.org/wiki/SWOT_analysis) for example) : 
    - How are they measured?
    - How are they supported?

## Decision
In this context we decided for <option X> to achieve <goal> accepting <downside>.

## Status
Depending on your decision process it could be : proposed, accepted, rejected, deprecated ...

## Resources
Links on internal context documents, articles, websites, ...
```

Alternatively, you can use a visual canvas like this one :
![Architecture Decision Record Canvas](img/adr-canvas.png)

## Good practices
No matter your template, ADRs should be :
- **Dated** : When the decision was taken
- **Rationnal** : Explain why the decision was taken in a rational way (because we wanted to is not valid for example)
- **Immutable** : Just like an event, once written its content content should not be altered
- **Unique** : Ensure the Single Responsibility Principle and write onle one decision by record
- **Self explanatory** : Contains enough information regarding the context 

## Constraint
Identify a Design Decision to make and :
- Create your first ADR at the root of your repository
- Use the template presented

## Online resources
- [Lightweight Architecture Decision Records - Thoughtworks Tech Radar](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)
- [Architecture Decision Record Canvas](https://itabok.iasaglobal.org/architecture-decision-record/)
- [https://adr.github.io/](https://adr.github.io/)
- [https://github.com/joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record)