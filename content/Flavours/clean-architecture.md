---
categories:
    - architecture
authors:
    - Yoan Thirion
problems: 
    - How may we cleanly encapsulate business logic?
    - How can we define clear architecture rules (dependency, layers independance, ...)?
    - How can we reach a screaming architecture?
---

# Clean Architecture
## Description
Clean architecture is a software design approach that separates the elements of a design into ring levels. 

The main rule of clean architecture is that `code dependencies can only move from the outer levels inward`. 
Code on the inner layers can have no knowledge of functions on the outer layers. 

The variables, functions and classes (any entities) that exist in the outer layers can not be mentioned in the more inward levels. It is recommended that data formats also stay separate between levels.

Clean architecture was created by `Robert C. Martin` and is a mix of several ideas.

### Hexagonal Architecture by Alistair Cockburn
Allow an application to equally be driven by users, programs, automated test or batch scripts, and to be developed and tested in `isolation` from its eventual run-time devices and databases.

![Hexagonal Architecture](../../images/clean-archi-hexagonal-architecture.webp)

Also known as `Ports / Adapters`.

### Onion Architecture by Jeffrey Palermo
Between the layers of the Onion, there is a strong dependency rule:

> Outer layers can depend on lower layers, but no code in the lower layer can depend directly on any code in the outer layer.

![Onion Architecture](../../images/clean-archi-onion.webp)

It is basically the `Dependency Inversion Principle` at the architecture level.

### Use-Case Driven approach by Ivar Jacobson
1 Biz Use case / 1 Application Use case

![Use Case Driven](../../images/clean-archi-use-case.webp)

BCE - 
From the 80’s

## Why?
An important goal of `Clean Architecture` is to provide developers with a way to organize code in such a way that it encapsulates the business logic but keeps it separated from the delivery mechanism.

## Problems
    - How may we cleanly encapsulate business logic?
    - How can we define clear architecture rules (dependency, layers independance, ...)?
    - How can we reach a screaming architecture?

## How to
Make it as visual as possible with subtitles, code examples, images

## Constraint

## Resources
- [Uncle Bob - The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [The Clean Architecture book - Robert C. Martin](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/)
- [Alistair Cockburn - Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Jeffrey Palermo - Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Ivar Jacobson  - Use Case Driven Approach](https://www.ivarjacobson.com/publications/books/object-oriented-software-engineering-book)
- [TDD and Clean Architecture - Use Case Driven Development by Valentina Cupać](https://youtu.be/IZWLnn2fNko)
- [Screaming architecture](https://levelup.gitconnected.com/what-is-screaming-architecture-f7c327af9bb2)