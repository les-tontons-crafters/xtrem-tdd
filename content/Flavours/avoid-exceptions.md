---
categories:
    - design
authors:
    - Yoan Thirion
problems: 
    - How can I create more explicit methods or functions?
    - How can I deal with errors in code?
---

# Avoid Exceptions
## Description
> "Exception handling is the process of responding to the occurrence of exceptions – anomalous or exceptional conditions requiring special processing – during the execution of a program." - Wikipedia

### Exceptions vs Errors
Exceptions and errors are not the same thing:
- Exceptions should be only used for exceptional situations, which by definition can not be many
    - Fewer exceptions - the better
- Exceptions should not leave the sysem boundaries in their original form
    - It is not user friendly and gives attackers a way to further explore possible system weaknesses
- If the thrown exception is processed by our application, we should not use an exception
    - It is slow and we can deal with it within our boundaries
    - Use another mecanism like `Result`, a Monad like `Either`, a callback, ...
- Error/Result explicitly declares the possibility of an error and allows “linear” processing
    - An implementation on exceptions will be a hidden goto statement
    - The worse the processing code is from the exception code of an exception, the worse it will be

## Why?
We should avoid avoid the intensive usage of `Exceptions` for:
- Making our code the more transparent possible, and so the more readable possible
    - Avoid lies in our method / function definitions
- Keeping them for exceptional situations

## Problems
    - How can I create more explicit methods or functions?
    - How can I deal with errors in code?

## How to
- We have different options to avoid exceptions
- Let's take this example and present a few of them:
    - Imagine we have a simple `Divide` method in our code
    - This method contains a lie in terms of contract / public API
        - It says that for 2 given `double` the method returns a `double`: `double -> double -> double`
        - What happens if we pass 0 as a denominator?
        - The defintion contains a `lie` (maybe by omission)

```csharp
public static double Divide(double numerator, double denominator) 
    => numerator / denominator;
```

### Extend the output
We can do it by using a `Result` type:
- Here is a simple one created for this example

```csharp
public static Result<double, string> Divide(double numerator, double denominator) 
    => denominator == 0
        ? Failure("Invalid denominator")
        : Success(numerator / denominator);
```

- Its basic implementation
```csharp
public record Result<TSuccess, TFailure>
    where TFailure : class
{
    private readonly TSuccess? _success;
    private readonly TFailure? _failure;

    private Result(TSuccess success) => _success = success;
    private Result(TFailure failure) => _failure = failure;

    public static Result<TSuccess, TFailure> Success(TSuccess success) => new(success);
    public static Result<TSuccess, TFailure> Failure(TFailure failure) => new(failure);

    public void Match(Action<TSuccess> onSuccess, Action<TFailure> onFailure)
    {
        if (IsFailure())
            onFailure(_failure!);
        else onSuccess(_success!);
    }

    private bool IsFailure() => _failure is { };

    public TSuccess IfFailure(TSuccess ifFail) 
        => IsFailure()
            ? ifFail
            : _success!;
}
```

- As a consumer / caller of this method we now have to deal with the return type:
    - We have to be exhaustive in the treatment of the result
    - Our method does not contain lie anymore and express explicitly that the operation can fail: `double -> double -> Result`

```csharp
result.Match(success => Console.WriteLine($"Success {success}"),
            failure => Console.WriteLine($"Failure: {failure}"));
```

> Alternatively you may use monads like `Either`, `Try`, `Option`, `Maybe`, ...

### Constrain the input
It has huge advantages of constraining inputs / arguments:
- You don't need to write preventive code anymore (No more guard clause everywhere)
- We make it impossible to represent invalid state
- We have a more business related concepts that are expressed in our code

```csharp
public static double Divide(double numerator, NonZeroDouble denominator) 
    => numerator / denominator.ToDouble();
```

- Here we express the fact that for instantiating a `NonZeroDouble` we need to pass a valid `double` different from 0

```csharp
public record NonZeroDouble
{
    private readonly double _value;

    private NonZeroDouble(double value) => _value = value;

    public static NonZeroDouble From(double value) 
        => value == 0
            ? throw new ArgumentException("0 is not allowed for NonZeroDouble")
            : new NonZeroDouble(value);

    public double ToDouble() => _value;
}

public static class DoubleExtensions
{
    public static NonZeroDouble ToNonZeroDouble(this double value) => NonZeroDouble.From(value);
}
```

- We centralize its instantiation logic of this kind of data structure through
    - A `Factory Method`
    - A `private constructor`
    - An `extension method` to convert from `double`
- We could return a default value instead of throwing an `Exception` as well
    - It is a business decision at the end

- As a consumer / caller of this method we now have to deal with the new input type
    - Our method expresses explicitly what is accepted as input: `double -> NonZeroInteger -> double`

```csharp
var result = Divide(9, 3d.ToNonZeroDouble());
```

### Hollywood principle
> Don't Call Us, We'll Call You

![Hollywood principle](../../images/hollywood-principle.jpg)

- One of the most popular way to implement this principle is to use `events` or `callbacks`
- The basic idea behind it is `let the caller decide what happens next`

- Let's use callbacks / continuation functions in our `Divide` method

```csharp
public static void Divide(
    double numerator,
    double denominator,
    Action<double> onSuccess,
    Action<string> onError)
{
    if (denominator == 0) onError("Invalid denominator");
    else onSuccess(numerator / denominator);
}
```

- As a consumer / caller of this method we now have to pass callback methods for success and failure
    - The method returns `void` now: `double -> double -> (double -> void) -> (string -> void)` -> void

```csharp
Divide(9,
    0,
    success => Console.WriteLine($"Success {success}"),
    failure => Console.WriteLine($"Failure : {failure}"));
```

- As a side effect, continuation has complexified our method signature
- Use this principle with care to avoid callback hell 

![Callback hell](../../images/callback-hell.jpg)

> Other alternatives exist and can depend on your programming language / paradigm

## Constraint
- If you are already using `Exceptions` to handle `errors` remove them using one of the alternative presented or another
- If not, think about a first edge that you do not support yet and use one of the alternative presented to manage it

## Resources
- [Don't throw exceptions in C#. Do this instead](https://youtu.be/a1ye9eGTB98) by Nick Chapsas
- [Don't throw Generic Exceptions](https://wiki.c2.com/?DontThrowGenericExceptions)
- [How to work with exceptions in DDD](https://sudonull.com/post/7531-How-to-work-with-exceptions-in-DDD)
- [Hollywood Principle](https://wiki.c2.com/?HollywoodPrinciple)
