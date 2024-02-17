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

Clean architecture is a software design approach that separates the elements of a design into ring levels.

![Clean Architecture](/images/clean-architecture.webp)

- `Entities`: encapsulate enterprise wide business rules
  - Can be: Object with methods, set of data structures and functions
  - Could be used by many different applications in the enterprise
- `Use Cases`: Capture application business rules
  - Structure should indicate what the application is, not how it does it
- `Interface adapters`: Set of adapters
  - Convert data from the format most convenient for the use cases and entities to the format most convenient for some external agency such as the Database or the Web
- `Frameworks & drivers`: Glue code that communicates to the next circle inwards
  - Frameworks and tools such as Database, Web Framework, ...
  - This layer is where all the details go, keep these things on the outside where they can do little harm

![Dependency rule](/images/clean-architecture-dependency-rule.webp)

Clean architecture was created by `Robert C. Martin` and is a mix of several ideas presented below.

### Hexagonal Architecture by Alistair Cockburn

Allow an application to equally be driven by users, programs, automated test or batch scripts, and to be developed and tested in `isolation` from its eventual run-time devices and databases.

![Hexagonal Architecture](/images/clean-archi-hexagonal-architecture.webp)

Also known as `Ports / Adapters`.

### Onion Architecture by Jeffrey Palermo

Between the layers of the Onion, there is a strong dependency rule:

> Outer layers can depend on lower layers, but no code in the lower layer can depend directly on any code in the outer layer.

![Onion Architecture](/images/clean-archi-onion.webp)

It is basically the `Dependency Inversion Principle` at the architecture level.

### Use-Case Driven approach by Ivar Jacobson

Ivar Jacobson defined use cases as `a special sequence of transactions, performed by a user and a system in a dialogue`.

In other words, a use case describes a system’s visible behaviour as seen from the point of view of the user.

The power of use cases lies in their ability to provide a general overview of the system’s behaviour. They give you the big picture of a system to be developed and provide orientation, and they help you to understand a system. Without this understanding, decisions regarding the scope as well as regarding costs and benefits of the system are impossible to make.

![Use Case Driven](/images/clean-archi-use-case.webp)

Here is an example in `java`:

```java
public class WithdrawFundsUseCase implements Command.Handler<WithdrawFundsRequest, VoidResponse> {

    private final BankAccountRepository repository;

    public WithdrawFundsUseCase(BankAccountRepository repository) {
        this.repository = repository;
    }

    public VoidResponse handle(WithdrawFundsRequest request) {
        var accountNumber = getAccountNumber(request);
        var amount = getTransactionAmount(request);

        var bankAccount = repository.findRequired(accountNumber);
        bankAccount.withdraw(amount);
        repository.update(bankAccount);

        return VoidResponse.EMPTY;
    }

    private AccountNumber getAccountNumber(WithdrawFundsRequest request) {
        return AccountNumber.of(request.getAccountNumber());
    }

    private TransactionAmount getTransactionAmount(WithdrawFundsRequest request) {
        return TransactionAmount.of(request.getAmount());
    }
}
```

[Code from Valentina Cupać](https://github.com/valentinacupac/banking-kata-java)

### Screaming Architecture

The term `screaming architecture` is used when we can, just by looking at a new project at a glance, get the core idea of what the project does and what it is about.

By using use cases are `first-class citizens` we can sucessfully implement a `screaming architecture`.

![Screaming architecture](/images/clean-archi-screaming.webp)

## Why?

An important goal of `Clean Architecture` is to provide developers with a way to organize code in such a way that it encapsulates the business logic but keeps it separated from the delivery mechanism:

- Independent of frameworks
  - Does not depend on the existence of libraries
  - Allow us to use frameworks as tools (not a constraint)
- Independent of the front-end
  - Can easily change the UI (from web to console)
- Independent of the database
  - Business rules not bound to Database logic
- Independent of any external agency
  - Business rules don’t know anything about outside world

## Problems

    - How may we cleanly encapsulate business logic?
    - How can we define clear architecture rules (dependency, layers independance, ...)?
    - How can we reach a screaming architecture?

## Constraint

- if you start working on a new product: let's use this approach to design your implementation.
- if working on an existing code base: you can introduce it step-by-step by starting with `use cases`

## Resources

- [Uncle Bob - The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [The Clean Architecture book - Robert C. Martin](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/)
- [Alistair Cockburn - Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Jeffrey Palermo - Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Ivar Jacobson - Use Case Driven Approach](https://www.ivarjacobson.com/publications/books/object-oriented-software-engineering-book)
- [TDD and Clean Architecture - Use Case Driven Development by Valentina Cupać](https://youtu.be/IZWLnn2fNko)
- [Screaming architecture](https://levelup.gitconnected.com/what-is-screaming-architecture-f7c327af9bb2)
