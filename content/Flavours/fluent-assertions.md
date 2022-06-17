---
categories:
    - Design
authors:
    - Guillaume Faas
problems: 
    - How could we make our tests more understandable?
---

# Fluent Assertions

## Description
We spend more time reading code than writing code. 
If you can make code easier to read, you can improve productivity and keep a sustainable pace of development (Code that fits in your head, Mark Seemann). 

This is true as much for production code than test code. Test code should not neglected just because it's not run in a production environment.

Does any of these situations seem familiar?
- You wondered what's expected in this assertion.
- Which value is expected and which one is the result.
- You encountered a failure message that provide no valuable information.

## Why?
FluentAssertions is a set of extension methods that allow you to more naturally specify the expected outcome of a TDD or BDD-style unit tests.
- Makes assertions easier to write.
- Helps to reveal intention during the assertion phase.
- Provides better failure messages.

## Problems
    How could we make our tests more understandable?

## Examples

### Without FluentAssertions
This test is quite straightforward. We're verifying that `saveOperationResult` is `true`.
```csharp
public void Test_bool_output()
{
     bool saveOperationResult = false;
     Assert.True(saveOperationResult);
}
```

Still, the failure message is not really helpful when you don't have eyes on the code. You don't really know what went wrong nor what was verified.
```
Assert.True() Failure
Expected: True
Actual: False
```

### With FluentAssertions
Considering the same scenario than before, we still manage to get something more natural to read.
```csharp
public void Test_bool_output()
{
     bool saveOperationResult = false;
     saveOperationResult.Should().BeTrue();
}
```

But the real benefit comes from the failure message that indicates precisely what went wrong.
```
Expected saveOperationResult to be true, but found False.
```

If we were able to get benefits from a simple scenario, imagine what you can gain from a complex one.

## Online resources
- [FluentAssertions (C#)](https://github.com/fluentassertions/fluentassertions)
- [AssertJ (Java)](https://github.com/assertj/assertj-core)