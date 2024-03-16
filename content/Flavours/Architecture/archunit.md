---
categories:
  - Architecture
authors:
  - Yoan Thirion
problems:
  - How to capture important architecture or design decision made along with its context and consequences?
---

# Architecture Unit Tests

Architecture Unit Tests are tests for checking the architecture you are using is respected at any time.
Such tool can check dependencies between packages and classes, layers and slices, check for cyclic dependencies and more.

## Why?

Those kind of tests can act as a safety net that helps teams (and newjoiners) to :

- Maintain clear architecture boundaries
  - Your team rules can easily be broken by inadvertence
- Document your team architecture decisions (at least structural ones)
  - With a clear DSL
- Automate architecture checks and ensure to respect them at any point in time
  - Out-of the box integrated in your test suite and so your CI 😉

## Problems

    How could we ensure we respect our architecture decisions?

## How to

You can really make your architecture and its related rules explicit through your test suite by describing architecture rules.
You can use `ArchUnit` for that, it is pretty well integrated with `JUnit` in `java` and `xUnit` in `.NET`.

You can automate checks like :

- Inward dependency rule

  - `Use Cases` ---> `Domain` but the opposite is forbidden

- Cycle dependencies
  - class `A` depends on `B` that depends on `C` that depends on `A`
  - This kind of dependencies are pretty hard to identify
- Namespace containment rules :
  - every `Controller` classes should be contained a given namespace
- Keep your Domain "pure"
  - No technical related stuff -> attribute / annotations

You can also check other rules in your code :

- Naming conventions
- Coding guidelines :all the interface should start with a big I in C# for example
- Return types for public methods on given classes
  - Check that your Controller public methods all return your own API Envelop for example
- Detect some linguistic anti-patterns
  - `is` / `has` functions should return a `boolean`
  - `get` functions should not return `void`
  - Other anti-patterns can be checked

### ArchUnit in C#

Here are the steps to follow to implement some rules in C# :

- Add project dependencies

```xml
<PackageReference Include="TngTech.ArchUnitNET.xUnit" Version="0.10.1" />
<PackageReference Include="TngTech.ArchUnitNET" Version="0.10.1" />
```

- Create an `ArchUnitExtensions` class to make your life easier :

```csharp
public static class ArchUnitExtensions
{
    private static readonly Architecture Architecture =
        new ArchLoader()
            // You can load as many as assemblies as you want
            .LoadAssemblies(typeof(<ATypeFromAFirstProject>).Assembly)
            .Build();

    public static void Check(this IArchRule rule) => rule.Check(Architecture);
}
```

- Describe your architecture rules using the DSL :
  - Do not forget to call the `Check` method to run the rule / hypothesis against your current `Architecture`

```csharp
private static GivenMethodMembersThat Methods()
    => MethodMembers()
        .That()
        .AreNoConstructors()
        .And();

[Fact]
public void NoGetMethodShouldReturnVoid() =>
    Methods()
        .HaveNameMatching("Get[A-Z].*", useRegularExpressions: true).Should()
        .NotHaveReturnType(typeof(void))
        .Check();

private static GivenTypesConjunction DomainTypes() =>
    Types()
        .That()
        .ResideInNamespace(Namespaces.Domain, true);

[Fact]
public void DomainCanOnlyAccessDomainItselfAndExceptions() =>
    DomainTypes()
        .Should()
        .OnlyDependOnTypesThat()
        .ResideInNamespace(Namespaces.Domain, true)
        .Check();
```

## Constraint

Identify an architecture rule your want to ensure in your code :

- Create your first Architecture rule
- Automate its check through your favorite test runner

## Resources

- [ArchUnit documentation](https://www.archunit.org/)
- [Code examples in C#, java, scala](https://github.com/ythirion/archunit-examples)
