---
categories:
    - Design
authors:
    - Guillaume Faas
problems:
    - How to avoid grouping calls for validation and instantiation everywhere?
    - How to I ensure having always valid data?
    - How to express meaningful out when wrong data is provided?
---

# Parse, don't Validate

## Description
"Parse, don't validate" is a modeling approach which guarantees only valid data will be created.

## Why

### Validate
What's wrong with `Validation`?
While it's crucial as you want to verify the data entering your system, there may be better ways to do it.

Let's look at how we could validate a social security number:
```csharp
var socialSecurityNumber = new SocialSecurityNumber(input);
if (socialSecurityNumber.IsValid())
{
    // Do something with the valid number
}
else
{
    // Invalid entity 
    // Log, user feedback, exception, etc.
}

public class SocialSecurityNumber
{
    public bool IsValid(string input)
    {
        // Validation logic
        return isValid;
    }
}
```

This code snippet is trivial.
A new value object is created based on user input, and we do something depending on whether the provided number is valid or not.

But even trivial, we have multiple points to address:
- We do something if the number is invalid without knowing **why**, as `bool IsValid()` encapsulates the logic. So every side-effect (log, feedback, exception, etc.) will not be explicit about the problem.
- Data validation can happen lower in the call stack when processed by a specific method. However, it means we expose invalid information to all upper layers.
- `Validation` is an additional process. Again, there's a **risk** of using an invalid number if we forget to call `IsValid()`.
- This pattern will appear every time we create a new `SocialSecurityNumber`.

### Parsing to the rescue...
> What is a Parser?
> 
> Really, a parser is just a function that consumes less-structured input and produces more-structured output. 
> 
> (Alexis King)

Assuming we decide to parse instead of validate, what could be the benefits?

- No further validation is necessary as soon as we have an instance of `SocialSecurityNumber`. There's no such thing as an invalid instance.
- More cohesion and less overhead when creating a new instance. Validation and instantiation are **always** done at the same time. An excellent way to **force** this is to hide the constructor.
- `SocialSecurityNumber` becomes more than just a DTO.
- Reasons for parsing issues are exposed and force the consumer to act upon them.

### ... With monads!
You may have noticed we tend to return multiple pieces of information as a result of our parsing operation:
- Whether the parsing worked
- The valid number when the parsing worked
- The reason why the parsing didn't work

We can return only one thing from our parsing method and produce a `SocialSecurityNumber`.
[Monads](monads.md) can help us build upon that.

Unstructured data comes in and has two different possible outputs:
- Either it satisfies our parsers, yielding a successful parse result
- Either something fails, and that something becomes our unsuccessful

Indeed, we can use a structure that returns an `Either<Failure, Success>`.

## Problems
  - How to avoid grouping calls for validation and instantiation everywhere?
  - How do I ensure always having valid data?
  - How to express meaningful output when I provide incorrect data?

## How to
Let's look at the same snippet as before but using a monad.
We will use [language-ext](https://github.com/louthy/language-ext) as it already contains a predefined set of data structures.

```csharp
SocialSecurityNumber
    .Parse(input)
    .Match(
        success => // Process valid number,
        error => // Deal with error message 
    );

public class SocialSecurityNumber
{
    private SocialSecurityNumber(string input) { ... }
    
    public static Either<string, SocialSecurityNumber> Parse(string input)
    {
        // Validation logic
        return isValid
            ? new SocialSecurityNumber(input)
            : "Reason for invalid number";
    }
}
```

## Constraint
- Avoid validation methods such as `IsValid()`
- Use monads to expose multiple results of an operation 

## Resources
- [Alexis King - Parse, don't Validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)
- [Mark Seemann - Code that fits in your head](https://blog.ploeh.dk/2021/06/14/new-book-code-that-fits-in-your-head/)
- [Rafal Studnicki & Simon Zelazny - Parse, don't Valide - Elixir version](https://well-ironed.com/articles/parse-dont-validate-elixir-edition/)