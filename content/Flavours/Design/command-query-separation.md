---
categories:
  - design
authors:
  - Guillaume Faas
problems:
  - How do I know a method produces side effects without looking at its implementation?
---

# Command Query Separation

`Command Query Separation` is a programming principle brought by Bertrand Meyer in his book `Object Oriented Software Construction`.
Its purpose is to make code more transparent, easier to read and more understandable.

This principle is considered a major one to know when working with the Object-oriented paradigm.

While being related and sharing the same ideas and benefits, it differs from `Command Query Responsibility Segregation`, which focuses more on architecture.

## Why

> "the ratio of time spent reading versus writing is well over 10 to 1" - Uncle Bob in [Clean Code - A handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

Indeed, we spend much more time reading code than writing code.
So it means improving code clarity is a tremendous benefit to our productivity.

Let's look at a code example.

```csharp
public class MagicalNumber
{
    public int Value { get; private set; }
    public MagicalNumber(int initial)
    {
        this.Value = initial;
    }

    public bool TryUpdate(int nextValue)
    {
        bool canUpdate = this.Value < nextValue;
        if (canUpdate)
        {
            this.Value = nextValue;
        }

        return canUpdate;
    }
}

var magical = new MagicalNumber(10);
// magical.Value == 10
var success = magical.TryUpdate(15);
// magical.Value == 15
```

We have a magical number object that exposes a way of updating its value and returning whether the operation has succeeded or failed.

So, what's the problem here?

The scope of `TryUpdate` is unclear, and several things are happening.
Indeed, the state may change during the call, but we also have an output value telling us whether the value was updated or not.

Can you imagine what tests would look like for such method?

```csharp
[Fact]
public void TryUpdate_ShouldUpdateValueAndReturnSuccess_GivenNextValueIsHigher()
{
    var nextValue = 15;
    var magical = new MagicalNumber(10);
    var status = magical.TryUpdate(nextValue);
    status.Should().BeTrue();
    magical.Value.Should().Be(nextValue);
}
```

Something feels off.

The more we have side effects, the harder it is to tell what a method is doing.

### Commands and Queries

`Command Query Separation` states that a method can belong to two categories: `Commands` & `Queries`

|             | Returns  |           Side Effect           |
| ----------- | :------: | :-----------------------------: |
| **Query**   | a result |              None               |
| **Command** |   void   | changes the state of the system |

`Queries` should return a result without side effects on the system.
We can call queries from anywhere, multiple times and in various orders.

> "Asking a question should not change the answer" - Bertrand Meyer

On the other hand, `Commands` will affect the system but won't return any result. Therefore, we know the state will be different before and after a command.

Finally, a method cannot be both (returning a value and producing a side effect).
Our previous `TryUpdate` method precisely belongs to both categories.

So, we have different categories but what does it change?

### A step further towards transparency and predictability

Looking at the table above, we can define a straightforward way to identify a query from a method from its signature: `the return type`.

What if we `x-out` the code?

```csharp
// Command
void Xxx1(int value);
// Query
int Xxx2();
```

We are providing essential information to our consumers, just with the method signature without violating encapsulation.

## Problems

- How do I know a method produces side effects without looking at its implementation?

## How to

We can adapt our initial code without too much hustle.

```csharp
public class MagicalNumber
{
    public int Value { get; private set; }

    public MagicalNumber(int initial)
    {
        this.Value = initial;
    }

    public void TryUpdate(int nextValue)
    {
        if (this.Value < nextValue)
        {
            this.Value = nextValue;
        }
    }
}

var magical = new MagicalNumber(10);
// magical.Value == 10
magical.TryUpdate(15);
// magical.Value == 15
```

There was little to do.
`TryUpdate` being a `command`, we changed the return type to `void`.

The old result disappeared, but we're keeping this information.
So how do we know the operation was a success?
The value should have been updated.

Let's also look at the test.

```csharp
[Fact]
public void TryUpdate_ShouldUpdateValueAndReturnSuccess_GivenNextValueIsHigher()
{
    var nextValue = 15;
    var magical = new MagicalNumber(10);
    magical.TryUpdate(nextValue);
    magical.Value.Should().Be(nextValue);
}
```

Thanks to this principle, we expressed intent through a method signature and made the code cleaner.

## Not a silver bullet

No matter how important this principle is, there will be situations where it won't be applicable.

The most famous one is the `Stack` example.
Indeed, popping a stack is an excellent example of a query modifying a state or a command returning a value.
But there's not a perfect solution to this problem: we could first `Peek` (query) to return the element and `Pop` (command) to remove it, but there's no way to guarantee its safety because an element could have been added in the meantime.

We can find another good example with `bool SaveChanges()` from Entity Framework.

We must comply with CQS as much as possible while there's room to break the rule in case of absolute necessity.
The critical part is to know we're making a trade-off and why we're doing it.

## Constraint

- Make sure every method is either a query or command but not both.

## Resources

- [Martin Fowler - Command Query Separation](https://www.martinfowler.com/bliki/CommandQuerySeparation.html)
- [Tim Sommer - CQS, a simple but powerful pattern](https://www.dotnetcurry.com/patterns-practices/1461/command-query-separation-cqs)
- [Mark Seemann - CQS versus server generated IDs](https://blog.ploeh.dk/2014/08/11/cqs-versus-server-generated-ids/)
