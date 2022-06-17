---
categories:
    - Refactoring
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

> But I named my variable `string email = ...` so it's a big deal. I'm exposing the meaning of the variable.

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
Just imagine we create a `public static bool ValidateEmail(this string email)` method. 
How can you ensure the parameter is really an email? Well, you can't. I could use this method from the `country` or `postalCode` variables.

### Long list of primitive parameters is hard to understand and prone to errors
```csharp
this.UpdateAddress("221b", "Baker street", "London", "England");
```
Using the same method we have above, do you see the problem here? 
The second parameter is actually the PostalCode and not the Street. 

It's **easy** to make mistakes because you need to know what each string contains and in **which order** you have to provide them.

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

It also provides another nice benefit as we now can add a **specific behavior** to an address! Like validation... or event better [Parsing](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).

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
        bool isValid = // are parameters valid 
        return isValid 
            ? new Address(address, postalCode, city, country) 
            : throw new ParsingException(address, postalCode, city, country);
    }
}
```



<Explain how to start
Make it as visual as possible with subtitles, code examples, images
ValueObjects
- Immutability
- Value equality
- self-validation

## Constraint
<How to add this technique as a constraint in a kata / workshop>

## Resources
<Additional resources / curated resources (books, links)>