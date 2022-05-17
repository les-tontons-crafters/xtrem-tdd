---
categories:
    - Testing
authors:
    - Julien VITTE
problems:
    - How to decouple object creation from implementation in your tests?
    - How to improve code readability in your tests?
    - How to speed up writing your test setup?
---

# Test Data Builders

## Description

The **Test Data Builder** pattern makes it easier to create input data or objects for unit tests

## Why

Using **Test Data Builders** in your tests will:

* Facilitate writing tests by allowing easy creation of inputs or expected data.
* Facilitate test maintainability by decoupling the creation of objects in tests, and isolating it in a single location (Single Responsibility Principle)
* Disseminate functional understanding in the team through the use of business terms
* Facilitate the readability of the tests by explaining only the data implied in the use case

## Problems

* `How to decouple object creation from implementation in your tests?`
* `How to improve code readability in your tests?`
* `How to speed up writing your test setup?`

## How to

### The 4 rules of test data builders

1. Have an instance variable for each constructor parameter
2. Initialize its instance variables to commonly used or safe values
3. Has a `build` method that creates a new object using the values in its instance variables
4. Has `chainable` public methods for overriding the values in its instance variables


## Examples

Considering the following command to create a property :
```csharp
public class CreatePropertyCommand
{
    public string Label { get; set; }
    public bool? IsRanged { get; set; }
    public bool? IsNumeric { get; set; }
    public bool? IsMultiple { get; set; }
    public IEnumerable<string> Choices { get; set; }
}
```

### Without usage of test data builder

In each test on property creation, you will include quite the same command creation:

```csharp
var command = new CreatePropertyCommand ("label", true, false, true, new string[] {1, 2});
```

- Every time your object creation will change, you have to fix all tests the class is implied
- What does the `false` value means?!?
- What if the constructor arguments were not primitive types but required the creation of other objects ?

### With test data builders

```csharp
public class CreatePropertyCommandBuilder
{
    private string _label;
    private bool _isMultiple = true;
    private bool _isRanged = false;
    private bool _isNumeric = true;
    private string[] _choices = new string[0];

    public static CreatePropertyCommandBuilder APropertyCreation 
        => new CreatePropertyCommandBuilder();

    public CreatePropertyCommandBuilder WithLabel(string label)
    {
        _label = label;
        return this;
    }

    public CreatePropertyCommandBuilder WithChoices(string[] choices)
    {
        _choices = choices;
        return this;
    }

    public CreatePropertyCommand Build()
    {
        return new CreatePropertyCommand(_label, _isMultiple, _isRanged, _isNumeric, _choices);
    }
}
```

### Using your builder in the tests
- Decouple object construction from its implementation, reducing refactoring effort on changes
- Explains data implied in the test case

```csharp
//Arrange
var command = CreatePropertyCommandBuilder
                .APropertyCreation
                .WithLabel("Ma nouvelle propriété")
                .Build();

// ...

// Assert
property.Label
    .Should()
    .Be("Ma nouvelle propriété");
```

## Constraint
Replace redundant object creation by test data builders


## Resources
- [Test Data Builders: an alternative to the Object Mother pattern](http://www.natpryce.com/articles/000714.html)
- [Growing Object-Oriented Software Guided by Tests](http://www.growing-object-oriented-software.com/)
- [Test Data Builders in C# by Mark Seemann](https://blog.ploeh.dk/2017/08/15/test-data-builders-in-c/)
- [How to Create a Test Data Builder](https://www.arhohuttunen.com/test-data-builders/)
