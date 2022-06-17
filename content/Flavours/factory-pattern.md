---
categories:
    - Design
authors:
    - Guillaume Faas
problems: 
    - How to avoid direct object construction?
---

# Factory Pattern

## Description
The **Factory Design Pattern** is one of the most used design pattern in modern programming languages.
You will find references as "**Factory Method**" and "**Abstract Factory**" in the well-known "Gang of Four"  patterns that describe how to solve recurring design problems.

These two variations aims towards the same goal: avoid direct object construction.

### Factory Method
![Factory method UML Diagram](https://upload.wikimedia.org/wikipedia/commons/4/43/W3sDesign_Factory_Method_Design_Pattern_UML.jpg "Factory method UML Diagram")

### Abstract Factory
![Abstract Factory UML Diagram](https://upload.wikimedia.org/wikipedia/commons/a/aa/W3sDesign_Abstract_Factory_Design_Pattern_UML.jpg "Abstract Factory UML Diagram")

## Why?
Avoiding direct object construction allows us to abstract the decision-making process from the calling class. The benefits are numerous:
- The calling class do not need to know how to construct a component. The factory holds this information.
- Open/Closed principle.
- Segregation of concerns.
- Reusability.
- Reduces coupling.
- Reduces duplication.

## Problems
    How to avoid direct object construction?

## Examples
Considering an `IShape` interface with several implementations such as `Circle`, `Rectangle` and `Square`.
```csharp
public interface IShape
{
    void Draw();
}

public class Circle : IShape
{
    ...
}

public class Rectangle : IShape
{
    ...
}

public class Square : IShape
{
    ...
}
```

### Without a factory
- The code contains strong coupling to each implementation. 
- Adding/altering behaviors will require to change the calling class.  

```csharp
public static void main(string[] args)
{
    IShape circle = new Circle();
    circle.Draw();
    IShape rectangle = new Rectangle();
    rectangle.Draw();
    IShape square = new Square();
    square.Draw();
}
```

### Applying the Factory pattern
- The code does not have a direct coupling to any `IShape` implementation, thanks to **Abstraction**.
- Adding/altering behaviors will only require to change the factory. Our code is open for extension but closed for modification (**OCP**).
- The factory is **reusable**, reducing duplication in the codebase.

```csharp
public class ShapeFactory
{
    public IShape Create(string type)
        => switch (type)
            {
                case "CIRCLE":
                    return new Circle();
                case "RECTANGLE":
                    return new Rectangle();
                case "SQUARE":
                    return new Square();
                default:
                    return null;
            };
}

public static void main(string[] args)
{
    ShapeFactory factory = new ShapeFactory();
    IShape circle = factory.Create("CIRCLE");
    circle.Draw();
    IShape rectangle = factory.Create("RECTANGLE");
    rectangle.Draw();
    IShape square = factory.Create("SQUARE");
    square.Draw();
}
```
## Online resources
- [Refactoring Guru](https://refactoring.guru/design-patterns/factory-method)
- [DotFactory](https://www.dofactory.com/net/factory-method-design-pattern)
- [Pragmatic Ways Blog](https://pragmaticways.com/factory-design-pattern/)
