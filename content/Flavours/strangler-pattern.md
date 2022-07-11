---
categories:
    - Refactoring
authors:
    - Guillaume Faas
problems:
    - How to add new features in legacy code without breaking the existing code?
    - How to change a method signature without generating compilation errors?
---

# Strangler Pattern

![Strangler Fig](../../images/StranglerFig.png)

## Description
The strangler pattern comes from a plant that grows while "strangling" their host.
They can be found in areas where competition for sunlight/water is intense. 
They need to find a "host" to grow on in order to consume all the light they can, preventing the host to do so and slowly killing it.

The idea is to follow the same logic with code we consider "outdated" until we consider it "dead code" (and remove it). 
This technique is extremely useful when working on legacy code in order to smoothly transition to new code without generating side-effects on the existing one.

On this page, we'll focus on this pattern at codebase level but it's also a known pattern at architecture level.

## Why
> If I can refactor all these parameters in an object, I believe the code is going to be easier to read. Let's try!
> 
> ...
> 
> [Build failed: 27 errors.] 

Have you ever been in a similar situation? 

In case you haven't, trying then to fix all 27 issues at once will:
- require a lot of effort
- keep you out of the green zone **for a while**
  - it means you have no idea if one change is working or not
- most likely fail at some point

We can mitigate the hustle by applying the strangler and work step-by-step while keeping a working product until the change is done. 

## Problems
    - How to add new features in legacy code without breaking the existing code?
    - How to change a method signature without generating compilation errors?

## How to
Let's assume we have the following method being used extensively:

```csharp
public class User
{
    public void UpdateAddress(string address, string postalCode, string city, string country)
    {
        ...
    }
}

public class UserTest
{
    [Fact]
    public void UpdateAddressShouldUpdateAddress()
    {
        User user = UserBuilder.Build();
        string address = "Central Perk";
        string postalCode = "12834";
        string city = "Greenwich Village";
        string country = "United States";
        user.UpdateAddress(address, postalCode, city, country);
        user.Address.Should().Be(address);
        user.PostalCode.Should().Be(postalCode);
        user.City.Should().Be(city);
        user.Country.Should().Be(country);
    }
}
```

After a while, we realize that it should be refactored in something more domain-oriented (maybe to fight [primitive obsession](Flavours/no-primitive-types)?) like the following:

```csharp
public class User
{
    public void UpdateAddress(Address address)
    {
        ...
    }
}
```

Knowing changing the method's signature would impact dozens of files with changes in the code, what do we do?

We can **strangle** `UpdateAddress` with a new method and start using the [generated](Flavours/generate-code-from-usage) method.

> Remember that doing TDD requires you to **always** use a test as a driver!

```csharp
public class User
{
    public void UpdateAddress(string address, string postalCode, string city, string country)
    {
        ...
    }
    
    public void UpdateAddressNew(Address address)
    {
        throw new NotImplementedException();
    }
}

public class UserTest
{
    [Fact]
    public void UpdateAddressShouldUpdateAddress()
    {
        User user = UserBuilder.Build();
        Address newAddress = AddressBuilder
            .WithAddress("...")
            .WithPostalCode("...")
            .WithCity("...")
            .WithCountry("...")
            .Build();
        user.UpdateAddressNew(newAddress);
        user.Address.Should().Be(newAddress.Address);
        user.PostalCode.Should().Be(newAddress.PostalCode);
        user.City.Should().Be(newAddress.City);
        user.Country.Should().Be(newAddress.Country);
    }
}
```

We need to call `UpdateAddress` from `UpdateAddressNew`:

```csharp
public void UpdateAddressNew(Address address)
{
    this.UpdateAddress(address.Address, address.PostalCode, address.City, address.Country);
}
```

Our new method is just calling the old one so the behavior is guaranteed.


Then, the idea is to repeat the process to **test code & production code** that are using `UpdateAddress` until the method is only used by `UpdateAddressNew`.

At this time, we can move the logic from `UpdateAddress` to `UpdateAddressNew` and remove `UpdateAddress` (which is basically dead code at this stage).

The final step is to rename `UpdateAddressNew` to `UpdateAddress` [using your IDE](Flavours/generate-code-from-usage).

## Constraint
Use Strangler when changing method signatures.

## Resources
- [Martin Fowler - Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Cloud Design](https://docs.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [Strangler in practice](https://accesto.com/blog/strangler-pattern-in-practice/)