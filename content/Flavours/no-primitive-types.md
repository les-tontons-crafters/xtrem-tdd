---
categories:
    - Design
authors:
    - Guillaume Faas
problems:
    - How to recognize objects in my domain?
    - How to find out where's the logic of a specific domain concept?
    - How to understand a method signature containing only primitives?
---

# No primitive types
## Description
`Primitive obsession is a code smell in which primitive data types are used excessively to represent your data models.`

## Why? 
[Primitive types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) are very general and could represent anything.
For example, an `int` could represent an identifier, a quantity, a number of elements or an index. Also, a `string` could represent a name, a description, an email or an address.

> But I named my variable `string email = ...` so it's not a big deal. I'm exposing the meaning of the variable.

Right? ...

Well, there's more to it. Let's dig deeper.

### Unable to represent a domain concept
```csharp
public void UpdateAddress(string address, string postalCode, string city, string country)
{
    ...
}
```
Whatever business sector this would come from, there's clearly an identifiable domain context grouping those four parameters together: an **address**.  

### Cannot contain any logic
```csharp
public void UpdateAddress(string address, string postalCode, string city, string country)
{
    ...
}
```
What if we want to apply specific logic to this address? At the moment, we cannot.

Extension methods are not an option either because a `string` variable could contain anything. 
Just imagine we create a `public static bool ValidatePostalCode(this string postalCode)` method. 
How can you ensure the parameter is really a postal code? Well, you can't. I could use this method from the `country` variable.

### Long list of primitive parameters is hard to understand and prone to errors
```csharp
this.UpdateAddress("221b", "Baker street", "London", "England");
```
Using the same method we have above, do you see the problem here? 
The second parameter is actually the PostalCode and not the Street. 

It's **easy** to make mistakes because you need to know what each string contains and in **which order** you have to provide them.

Another good indicator is to `x-out the code` as we can't get any valuable information from the method signature: `void xxx(string, string, string, string)`. 

## Problems
    - How to recognize objects in my domain?
    - How to find out where's the logic of a specific domain concept?
    - How to understand a method signature containing only primitives?


## How to
The first step is usually to look properties that could be grouped together, belong together and change together.

This example being pretty simple, all provided parameters leads us towards the `Address` idea. On top ot that, in case a person moves to another address, it's most likely we have to change all those values together.

So let's encapsulate this idea into its own class.

```csharp
public class Address
{
    public Address(string address, string postalCode, string city, string country)
    {
        ...
    }

    public string Address { get; set; }
    public string PostalCode { get; set; }
    public string City { get; set; }
    public string Company { get; set; }
}

public void UpdateAddress(Address newAddress)
{
    ...
}
```

Let's try to `x-out the code` again: `void xxx(Address)`. It's actually meaningful:
- I know the method is a `command` and generates a side-effect because it returns void.
- I know it's to create/update an Address because it's the only parameter. 

It also provides another nice benefit as we now can add a **specific behavior** to an address! Like validation... or even better: [Parsing](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).

```csharp
public class Address
{
    private Address(string address, string postalCode, string city, string country)
    {
        ...
    }

    public string Address { get; set; }
    public string PostalCode { get; set; }
    public string City { get; set; }
    public string Company { get; set; }
    
    public static Address ParseAddress(string address, string postalCode, string city, string country)
    {
        bool canParse = // verify address can be created 
        return canParse 
            ? new Address(address, postalCode, city, country) 
            : throw new ParsingException(address, postalCode, city, country);
    }
}
```

It starts to look nice. From now on, we can use the same idea to go further.

For example, should a PostalCode have it's own behavior too? Should it have it's own validation?

It could look like this:

```csharp
public class PostalCode
{
    private PostalCode(string value)
    {
        ...
    }
    
    public string Value { get; set; }
    
    public static PostalCode ParsePostalCode(string value)
    {
        bool canParse = // verify PostalCode can be created 
        return canParse 
            ? new PostalCode(value) 
            : throw new ParsingException<PostalCode>(value);
    }
}

public class Address
{
    private Address(string address, PostalCode postalCode, string city, string country)
    {
        ...
    }

    public string Address { get; set; }
    public PostalCode PostalCode { get; set; }
    public string City { get; set; }
    public string Company { get; set; }
    
    public static Address ParseAddress(string address, PostalCode postalCode, string city, string country)
    {
        bool canParse = // verify address can be created 
        return canParse 
            ? new Address(address, postalCode, city, country) 
            : throw new ParsingException<Address>(address, postalCode, city, country);
    }
}

public void UpdateAddress(Address newAddress)
{
    ...
}
```

We have been able to make domain concepts **emerge** from the code with **better segregation**. It will facilitate the evolution and maintenance of the codebase. This can go on and on as long as it provides value.

If you want to go further, the next step would to transform those classes into  [Value Objects](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/implement-value-objects) to get the most out of them. Here are a few important characteristics:
- They are [immutable](immutable-types.md)
- They have no identity
- Their equality is value-based

Here's what it could look like:

```csharp
public record PostalCode(string value)
{
    public static PostalCode ParsePostalCode(string value)
    {
        bool canParse = // verify PostalCode can be created 
        return canParse 
            ? new PostalCode(value) 
            : throw new ParsingException<PostalCode>(value);
    }
}

public record Address(string address, PostalCode postalCode, string city, string country)
{
    public static Address ParseAddress(string address, PostalCode postalCode, string city, string country)
    {
        bool canParse = // verify address can be created 
        return canParse 
            ? new Address(address, postalCode, city, country) 
            : throw new ParsingException<Address>(address, postalCode, city, country);
    }
}
```

## Constraint
Model your domain context using Value Objects.

## Resources
- [Primitive obsession](https://refactoring.guru/fr/smells/primitive-obsession)
- [Value Objects](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/implement-value-objects)
- [Immutable types](/Flavours/immutable-types)
- [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)