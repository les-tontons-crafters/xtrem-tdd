---
categories:
    - Design
    - Testing
authors:
    - Yoan Thirion
problems: 
    - How can we write bullet proof code?
    - How could we unbiased our tests and identify edge cases?
---

# Property-Based Testing (PBT)
## Description
Property based testing relies on properties. It checks that a function, program or whatever system under test abides by a property.
To explain it as simple as possible : we identify and test invariants.

An invariant is something that will always be true no matter what data you provide as an input. To do this, we need to use a framework that will generate random data and check if the invariant remains true. Each time we run our test suite, it will test different combinations.

`It is important to note that a successful property test does not mean that the implementation is correct, it means that the framework has not been able to fault the implementation.`

## Why ?
It can definitely help you :
- Identify Edge-cases that we did not think of (nulls, negative numbers, weird characters, ...)
- Have a better business understanding: identify business invariants require a deep business understanding

## Problems
- `How can I write bullet proof code?`
- `How could we unbiased our tests and identify edge cases?`

### Example Based vs Property-Based
#### Example-Based Testing
Generally when we write our tests, we will focus on examples and a scope of inputs that we have identified.
We will define our tests as such :

```text
Given (x, y, ...) // Arrange
When I [call the subject under test] with (x, y, ...) // Act
Then I expect (output) // Assert
```

Thus we validate that our implementation is valid with what was expected (business requirements / acceptance criteria) but on a reduced scope of data (examples identified).

![Example based](../images/pbt-example-based.png)

#### Property-Based Testing
With PBT the promise is to be able to verify that our implementation is valid from a business point of view but with a much larger data scope.

```text
for all (x, y, ...)
such as precondition (x, y, ...) holds
property (x, y, ...) is satisfied
```

Basically, we :
- Describe the input
- Describe a `property` of the output
- Have the computer trying a lot of random examples and check if it fails

![Property based details](../images/pbt-details.png)

With PBT, the promise is to be on the top right of our previous quadrant :

![PBT quadrant](../images/pbt-quadrant.png)

### What does it mean if a test fail ?
If the framework manages to find an edge-case, there are 3 possibilities :
```text
✅ The production code is not correct
✅ The way the invariant / property is tested is not correct 
✅ The understanding and definition of the invariant is not correct
```

It is important to have this reflection as soon as a case is identified, the framework will give you the data used to mess up your code, so you can easily write a classic Unit Test to reproduce the case.

## How to
The different libraries available on our languages are based on [QuickCheck](https://hackage.haskell.org/package/QuickCheck).
We demonstrate how to use this approach in `C#` using `FsCheck` + `FsCheck.XUnit` (for integration with XUnit)

```shell
dotnet add package FsCheck
dotnet add package FsCheck.Xunit
```

With adding those dependencies we are ready to implement our first properties.

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

- By identifying examples, we could write UTs as follows:
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

- We can easily identify 3 mathematical properties of addition:
    - Commutativity
    - Identity
    - Associativity

With FsCheck we can express our properties in 2 ways :
- Use PropertyAttribute
    - We annotate our Properties with the `PropertyAttribute`
    - We define a `Property` : a `Predicate` on which we apply the extension method `ToProperty()`

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

- Or use xunit `Fact`
    - We use `Prop.ForAll` to define our properties
    - We check the properties by calling the `QuickCheckThrowOnFailure()` method
        - This method will notify xunit there is a **failure** in case the property is **not satisfied**

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

As you can see in those examples, x and y parameters will be generated by QuickCheck itself.

### How to generate complex objects
FsCheck defines default generators and shrinkers for a large number of types: bool, byte, int, float, char, string, DateTime, lists, array 1D/2D, Set, Map, objects.
It uses reflection to build record types, discriminated unions, tuples, enums and "basic" classes (using only primitive types).

If needed we can declare our own generators and pass them explicitly to our properties

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
- When a test fails : rerun the tests
    - 2 executions of the same test will not generate the same inputs
    - Instead of rerunning : investigate the failure and capture through a Unit Test the identified example
- Re-implement the production code
    - This is often the drift when writing properties: 
    - Having all the implementation of the production code "leaked" in properties
- Filter inputs in an "ad-hoc" way
    - We should never filter input values by ourselves
    - Instead we should use the framework support (filtering, shrinking)

![Shrinking / Generation](../images/pbt-generator.png)

## Constraint
Identify a first `Property` and implement it in your current language.
You can find a list of libraries per language [here](https://en.wikipedia.org/wiki/QuickCheck).

## Resources
- [FsCheck documentation](https://fscheck.github.io/FsCheck/)
- ["Functions for nothing, and your tests for free" Property-based testing and F# - George Pollard](https://youtu.be/8oALNLdyOyM)
- [An introduction to PBT - Scott Wlaschin](https://fsharpforfunandprofit.com/pbt/)
- [A journey to Property-Based Testing](https://yoan-thirion.gitbook.io/knowledge-base/software-craftsmanship/code-katas/improve-your-software-quality-with-property-based-testing/a-journey-to-property-based-testing)
- [Solving the Diamond Kata with PBT in F#](https://blog.ploeh.dk/2015/01/10/diamond-kata-with-fscheck/)