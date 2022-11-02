---
categories:
    - Design
authors:
    - Yoan Thirion
problems:
    - How may I write more expressive code?
    - How may I avoid a lot of null checking that ruins code readability?
    - How may I avoid `NullPointerException` in my applications?
---

# Monads
## Description
> A monad is a software design pattern with a structure that combines program fragments (functions) and wraps their return values in a type with additional computation. [...], monads define two operators: one to wrap a value in the monad type, and another to compose together functions that output values of the monad type (these are known as monadic functions).

General-purpose languages use monads to reduce boilerplate code needed for common operations (such as dealing with undefined values or fallible functions, or encapsulating bookkeeping code). 

Functional languages use monads to `turn complicated sequences of functions into succinct pipelines` that abstract away control flow, and side-effects.

## Why?
Often code contains lie due to `bad encapsulation` and `lack of transparency`
Let's take examples in C#:

```csharp
public static Seq<Person> Filter(
    this Seq<Person> persons,
    Func<Person, bool> predicate)
    => persons.IsEmpty
        ? throw new ArgumentException("Can not filter an empty collection")
        : persons.Filter(predicate);
```

If you take a look at the public API level this method has a signature like `Seq<Person>` -> `Func<Person, bool>` -> `Seq<Person>`

```csharp
class CreatePersonUseCase
{
    public CreatePersonResponse Handle(CreatePersonCommand command)
    {
        if (string.IsNullOrWhiteSpace(command.FirstName))
        {
            throw new ArgumentException("First Name can not be empty");
        }

        if (string.IsNullOrWhiteSpace(command.LastName))
        {
            throw new ArgumentException("Last Name can not be empty");
        }

        return new CreatePersonResponse();
    }
}
```

This one has the signature `CreatePersonCommand` -> `CreatePersonResponse`

> Both of them are lying to their callers. They can throw exceptions and are not explicit on it. 

Sometimes it can fail but this failure is not visible from the outside.

To fix this kind issue we have a couple of options:
- Constrain the inputs (with only valid inputs)
- Extend the output to represent the possible failure by using a monadic container


## Problems
    - How may I write more expressive code?
    - How may I avoid a lot of null checking that ruins code readability?
    - How may I avoid `NullPointerException` in my applications?

## How to
### Context
To easily understand monads graphics can really help.

Here are the essential but if you want to go deeper we really encourage you to read the full article available in this article resources.
Code demonstrated here is in `C#` using the great library [`language-ext`](https://github.com/louthy/language-ext) and `scala` (monads are in the language itself)

![Wrapper](../../images/monads/1.webp)

### Functors
![Functor and Map](../../images/monads/2.webp)

In `C#`:
```csharp
Some(2).Map(x => x + 3); // Some(5)
Option<int>.None.Map(x => x + 3); // None
```

In `scala`:
```scala
Some(2).map(x => x + 3) // Some(5)
None.asInstanceOf[Option[Int]].map(x => x + 3) // None
```

![Functors magic](../../images/monads/3.webp)
![Lists are functors too](../../images/monads/4.webp)

In `C#`:
```csharp
List(2, 4, 6).Map(x => x + 3); // 5, 7, 9
```

In `scala`:
```scala
List(2, 4, 6).map(x => x + 3) // 5, 7, 9
```

![Function composition](../../images/monads/5.webp)

In `C#`:
```csharp
Func<int, int> add2 = x => x + 2;
Func<int, int> add3 = x => x + 3;
Func<int, int> add5 = add2.Compose(add3);

add5(10); // 15
```

In `scala`:
```scala
val add2: Int => Int = x => x + 2
val add3: Int => Int = x => x + 3
val add5: Int => Int = add2.compose(add3)
add5(10) // 15
```

![Wrap](../../images/monads/6.webp)

In `C#`:
```csharp
static Option<int> Half(int x)
    => x % 2 == 0 ? Some(x / 2) : None;
```

In `scala`:
```scala
def half(x: Int): Option[Int] =
  if(x % 2 == 0)
    Some(x / 2)
  else None
```

### Monadic Bind
![Monadic Bind](../../images/monads/7.webp)

In `C#`:
```csharp
Some(3).Bind(Half); // None
Some(4).Bind(Half); // Some(2)
```

In `scala`:
```scala
Some(3).flatMap(half) // None
Some(4).flatMap(half) // Some(2)
```

![Monadic Bind](../../images/monads/8.webp)

In `C#`:
```csharp
Some(20)
    .Bind(Half) // Some(10)
    .Bind(Half) // Some(5)
    .Bind(Half) // None
```

In `scala`:
```scala
Some(20)
  .flatMap(half) // Some(10)
  .flatMap(half) // Some(5)
  .flatMap(half) // None
```

![Example](../../images/monads/9.webp)

```csharp
private static Try<string> GetUserInput()
{
    WriteLine("File :");
    return () => Try(ReadLine)!;
}

private static Try<string> ReadFile(string filePath)
    => () => File.ReadAllText(filePath);
    
public static void Process() 
    => GetUserInput()
        .Bind(ReadFile)
        // Forced to handl both cases: Success and Failure
        .Match(WriteLine,
            ex => WriteLine($"FAILURE : {ex.StackTrace}")
        );
```

### Example
Let's refactor a small piece of code to use a monad to make the code safer and express a potential failure:

```csharp
private static Person FindPerson(string fullName) =>
    People
        .FirstOrDefault(x => x.Named(fullName));
```

From the usage we could call it like this because its public api looks like this: `string`->`Person`
```csharp
var pets = FindPerson("Unknown person")
        .Pets
        .Select(pet => pet.Name);
```

Here you would receive an exception if no element is found in the collection for the given `fullName`.
![Failure](../../images/monads/failure.webp)

#### Use a Monad

Let's change it by using an `Option` for example, it will represent the fact that the find function may not find anything

```csharp
private static Option<Person> FindPerson(string fullName) =>
    People.Find(p => p.Named(fullName));
```

The usage is now safe (No `NPE` possible)
```csharp
var pets = FindPerson("Unknown person")
    // Called only when Something (Some) inside the Option
    .Bind(person => person.Pets)
    .Map(pet => pet.Name);
```

## Constraint
Find a place in your code base where:
- You throw an `Exception`
- Check for `null` then continue
- any other use case for a monad

Refactor to use an existing monad.

## Resources
- [Functors, Applicatives, And Monads In Pictures](https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html#just-what-is-a-functor,-really?)
- [Functional Programming - Learning Hours](https://github.com/katalogs/learning-hours/tree/main#functional-programming)
- [C# Functional Programming Language Extensions](https://github.com/louthy/language-ext)
- [Vavr Java Functional Library](https://www.vavr.io/)