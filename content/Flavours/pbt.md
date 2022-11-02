---
categories:
    - Design
    - Testing
authors:
    - Yoan Thirion
    - Guillaume Faas
problems: 
    - How can we write bullet proof code?
    - How could we unbiased our tests and identify edge cases?
---

# Property-Based Testing
## Description
Property-Based Testing verifies that a function, program or any system under test abides by a property.
To explain it as simple as possible: we identify and test invariants.

An invariant will always be true no matter what input we provide. To achieve this, we need to use a framework that will generate random data and verify the invariant remains true. Each time we run our test suite, it will test different combinations of values.

`It is essential to mention that a successful property test does not mean the implementation is correct.
It means that the framework has not been able to fault the implementation.`

## Why?
It can help you :
- Identify edge cases we did not think of (nulls, negative numbers, weird characters, etc.)
- Have a better business understanding: Identifying business invariants require a deep business understanding
- Run your tests with a broader range of values

## Problems
    - How can I write bullet-proof code?
    - How can I verify my tests are deterministic even with a broader range of values?
    - How could we unbiased our tests and identify edge cases?

### Example Based vs Property-Based
#### Example-Based Testing
Generally, when we write our tests, we focus on examples and the scope of the identified inputs.
We will define our tests as such :

```text
Given (x, y, ...) // Arrange
When I [call the subject under test] with (x, y, ...) // Act
Then I expect (output) // Assert
```

Thus we validate that our implementation is valid with what was expected (business requirements/acceptance criteria) but on a reduced scope of data (examples identified).

![Example based](../../images/pbt-example-based.webp)

#### Property-Based Testing
With Property-Based Testing, the promise is to be able to verify that our implementation is valid from a business point of view but with a much larger data scope.

```text
for all (x, y, ...)
such as precondition (x, y, ...) holds
property (x, y, ...) is satisfied
```

In other words :
- Describe the input
- Describe a `property` of the output
- Have the process try a lot of random examples and check if it fails

![Property based details](../../images/pbt-details.webp)

With PBT, the promise is to be on the top right of our previous quadrant :

![PBT quadrant](../../images/pbt-quadrant.webp)

### What does it mean if a test fail?
If the framework manages to find an edge case, there are three possibilities :
```text
✅ The production code is not correct
✅ We are not testing the invariant / property the right way
✅ The understanding and definition of the invariant are not correct
```

It is essential to have this reflection as soon as we identify a case, the framework will give you the data used to mess up your code, so you can quickly write a classic Unit Test to reproduce the issue.

## How to
The different libraries available in our languages are based on [QuickCheck](https://hackage.haskell.org/package/QuickCheck).
We demonstrate how to use this approach in `C#` using `FsCheck` + `FsCheck.XUnit` (for integration with XUnit)

```shell
dotnet add package FsCheck
dotnet add package FsCheck.Xunit
```

By adding those dependencies, we are ready to implement our first properties.

## Example
- Imagine there is a `Calculator` class you want to test :

```csharp
using System;

namespace PBTKata.Math
{
    public static class Calculator
    {
        public static int Add(int x, int y) => x + y;
    }
}
```

- By identifying examples, we could write Unit Tests as follows:
```csharp
namespace PBTKata.Tests.Math.Solution
{
    public class CalculatorTests
    {
        [Fact]
        public void Return4WhenIAdd1To3() => Add(1, 3).Should().Be(4);
        
        [Fact]
        public void Return2WhenIAddMinus1To3() => Add(-1, 3).Should().Be(2);
        
        [Fact]
        public void Return99WhenIAdd0To99() => Add(99, 0).Should().Be(99);
    }
}
```

- We can quickly identify three mathematical properties of addition:
    - Commutativity
    - Identity
    - Associativity

With FsCheck, we can express our properties in two ways :
- Use PropertyAttribute
    - We annotate our Properties with the `PropertyAttribute`
    - We define a `Property` : a `Predicate` on which we apply the extension method `ToProperty()`. Note that these tests do not return `void`, they return a `Property`.

```csharp
public class CalculatorProperties
{
    [Property]
    public Property Commutativity(int x, int y) => (Add(x, y) == Add(y, x)).ToProperty();
    [Property]
    public Property Associativity(int x) => (Add(Add(x, 1), 1) == Add(x, 2)).ToProperty();
    [Property]
    public Property Identity(int x) => (Add(x, 0) == x).ToProperty();
}
```

- Or use xUnit `Fact`
    - We use `Prop.ForAll` to define our properties
    - We check the properties by calling the `QuickCheckThrowOnFailure()` method
        - This method will notify xUnit there is a **failure** in case the property is **not satisfied**

```csharp
public class CalculatorPropertiesWithXUnitFact
{
    [Fact]
    public void Commutativity() => 
        Prop.ForAll<int, int>((x, y) => Add(x, y) == Add(y, x))
            .QuickCheckThrowOnFailure();
    
    [Fact]
    public void Associativity() => 
        Prop.ForAll<int>(x => Add(Add(x, 1), 1) == Add(x, 2))
            .QuickCheckThrowOnFailure();
    
    [Fact]
    public void Identity() => 
        Prop.ForAll<int>(x => Add(x, 0) == x)
            .QuickCheckThrowOnFailure();
}
```

There is also a way to return a `Property` using `Prop.ForAll`.
```csharp
public class CalculatorProperties
{
    [Property]
    public Property Commutativity() => 
        Prop.ForAll<int, int>((x, y) => Add(x, y) == Add(y, x));
    
    [Property]
    public Property Associativity() => 
        Prop.ForAll<int>(x => Add(Add(x, 1), 1) == Add(x, 2));
    
    [Property]
    public Property Identity() => 
        Prop.ForAll<int>(x => Add(x, 0) == x);
}
```

As you can see in those examples, QuickCheck generates **x** and **y** parameters itself.

> On a side note, using `.QuickCheckThrowOnFailure()` will reduce the information on each test (number of generated values, test failure data, etc.). 
> So, we encourage you to return a `Property` as often as possible.

### How to generate complex objects
FsCheck defines default generators and shrinkers for many types: bool, byte, int, float, char, string, DateTime, lists, array 1D/2D, Set, Map, and objects.
It uses reflection to build record types, discriminated unions, tuples, enums and "basic" classes (using only primitive types).

If needed, we can declare our generators and pass them explicitly to our properties.

```csharp
internal static class LetterGenerator
{
    public static Arbitrary<char> Generate() =>
        Arb.Default.Char().Filter(char.IsLetter);
}

// We can then use the Generator like this :
[Property(Arbitrary = new[] { typeof(LetterGenerator) })]
public Property Property(char c) => ...

// Or like this
[Fact]
public void Property() => 
    Prop.ForAll(letterGenerator, ...)
        .QuickCheckThrowOnFailure();
```

### How to apply preconditions between generated values
We've already seen generators to define how data is created, but it is also possible to set up preconditions between generated values.

Let's assume we have a generator to generate decimals between 0 and 1000000000.
```csharp
public class AmountGenerator
{
    public static Arbitrary<decimal> Generate() =>
        Arb.From<decimal>().MapFilter(_ => _, value => value is >= 0 and <= 1000000000);
}
```

What if we want this generator to generate two **different** values from this generator?
```csharp
public class AmountProperties
{
    [Property]
    public Property AmountPropertyTesting() => 
        Prop.ForAll(
            Arb.From<AmountGenerator>(),
            Arb.From<AmountGenerator>(),
            (amount1, amount2) => SomePropertyToVerify(amount1, amount2).When(amount1 != amount2);
}
```

We can use `.When()` on a boolean to provide a condition to a property.

## Use Cases
- Verify **idempotence**
    - `f(f(x)) == f(x)`
    - ex : UpperCase, Create / Delete
- Verify **roundtripping**
    - `from(to(x)) == x`
    - ex : Serialization, PUT / GET, Reverse, Negate
- Check **invariants** (universal properties)
    - `invariant(f(x)) == invariant(x)`
    - ex : Reverse, Map
- Check **commutativity**
    - `f(x, y) == f(y, x)`
    - ex : Addition, Min, Max
- Verify **re-writing / refactoring**
    - `f(x) == new_f(x)`
    - When rewriting, optimizing or refactoring an implementation
- To upgrade **parameterized tests**
    - To replace hardcoded values / discover new test cases (edge cases)

## Anti-patterns
- When a test fails: rerun the tests
    - Two executions of the same test will not generate the same inputs
    - Instead of rerunning: investigate the failure and capture through a Unit Test the identified example
- Re-implement the production code
    - This is often the drift when writing properties
    - Having all the implementation of the production code "leaked" in properties
- Filter inputs in an "ad-hoc" way
    - We should never filter input values by ourselves
    - Instead, we should use the framework support (filtering, shrinking)

![Shrinking / Generation](../../images/pbt-generator.webp)

## Constraint
Identify a first `Property` and implement it in your current language.
You can find a list of libraries per language [here](https://en.wikipedia.org/wiki/QuickCheck).

## Resources
- [FsCheck documentation](https://fscheck.github.io/FsCheck/)
- ["Functions for nothing, and your tests for free" Property-based testing and F# - George Pollard](https://youtu.be/8oALNLdyOyM)
- [An introduction to PBT - Scott Wlaschin](https://fsharpforfunandprofit.com/pbt/)
- [A journey to Property-Based Testing](https://yoan-thirion.gitbook.io/knowledge-base/software-craftsmanship/code-katas/improve-your-software-quality-with-property-based-testing/a-journey-to-property-based-testing)
- [Solving the Diamond Kata with PBT in F#](https://blog.ploeh.dk/2015/01/10/diamond-kata-with-fscheck/)