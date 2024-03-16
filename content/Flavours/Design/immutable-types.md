---
categories:
  - Design
authors:
  - Yoan Thirion
problems:
  - How could I represent only valid state object?
  - How may I write more predictable code?
  - How could I write thread-safe code?
---

# Immutable Types

An immutable type, is a type of object whose data cannot be changed after its creation.
An immutable type sets the property or state of the object as read only because it cannot be modified after it is assigned during initialization.

## Why

- Immutability makes it easier to write, use and reason about the code
  - Class invariant is established once and then unchanged
  - It makes it `impossible to represent an invalid state`
  - You can not mix [Command and Query](https://martinfowler.com/bliki/CommandQuerySeparation.html) anymore
    - It is more transparent on what is done and you can not mutate `accidentally` an object
    - The code is more predictable so it has a direct impact on the cognitive load when you read code
- An immutable type remains in exactly one state : the one in which it was created
  - Immutable objects are thread-safe so there is no synchronization issue
  - They cannot be corrupted by multiple threads accessing them concurrently
  - An easy approach to thread-safety

Like everything, immutability comes with a cost: `whenever you do need a modified object of that new type you must suffer the overhead of a new object creation` (causing more frequent garbage collections)

## Problems

    - How could I represent only valid state object?
    - How may I write more predictable code?
    - How could I write thread-safe code?

## How to

For creating an immutable type, we have to think about its properties or variables which will never change the value(s) after assigning the first time.

### Follow a checklist

- Make the variables `read-only` or `final` depending of your language so we can not modify it after assignment
- Use parameterized constructor for assigning values
- Use properties for getting the fields of the class and do not use setters
- Do not mutate internal state, create a new object based on it

### Example

- Imagine we work on a card game system, in which we have this `Player` class

```java
public class Player {
    private String name;
    private List<Card> cards;

    public Player() {
        cards = new ArrayList<>();
    }

    public void pickUp(Deck deck) {
        var card = deck.takeCard();
        cards.add(card);
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

- Let's apply the checklist

```java
public class Player {
    private final String name;
    private final List<Card> cards;

    public Player(String name, List<Card> cards) {
        this.name = name;
        this.cards = cards;
    }

    public void pickUp(Deck deck) {
        var card = deck.takeCard();
        cards.add(card);
    }
}
```

- Here we still have a problem with the `pickUp` method
  - We mutate the internal list (it is a reference type)
  - Here we could not be able to do the same with `String` (immutable by design)

```java
public class Player {
    private final String name;
    private final List<Card> cards;

    public Player(String name, List<Card> cards) {
        this.name = name;
        this.cards = Collections.unmodifiableList(cards);
    }

    public Player pickUp(Deck deck) {
        var newHand = new ArrayList<>(List.copyOf(cards));
        newHand.add(deck.takeCard());

        return new Player(name, newHand);
    }
}
```

- Now the `pickUp` method return a new instance of `Player` at each call
  - We do it by copying the list and add the taken card inside
  - Then we return a new instantiated `Player`
- In `java`, we can declare a list as unmodifiable
  - We do it directly in our constructor by using `Collections.unmodifiableList`
  - It is now impossible to mutate it accidentally
  - You can use `Immutable` collections in your current language / platform

### Value Object

In `Domain Driven Design`, a value object is a small object that represents a simple entity whose equality is not based on identity: i.e. two value objects are equal when they have the same value, not necessarily being the same object.

Value objects should be immutable:

- This is required for the implicit contract that two value objects created equal, should remain equal
- It is also useful for value objects to be immutable, as client code cannot put the value object in an invalid state or introduce buggy behaviour after instantiation

> “Objects that matter only as the combination of their attributes. Two value objects with the same values for all their attributes are considered equal.” - Martin Fowler

- Let's refactor our `Player` to fit the `Value Object` definition
  - We need to override `equals` and `hashCode` methods

```java
public class Player {
    ...

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return Objects.equals(name, player.name) && Objects.equals(cards, player.cards);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, cards);
    }
}
```

- Here is the associated test

```java
@Test
void assert2PlayerAreValueEquals() {
    var player1 = new Player("Alan Garner", List.of(new Card(2, Suit.CLUB)));
    var player2 = new Player("Alan Garner", List.of(new Card(2, Suit.CLUB)));

    assertEquals(player1, player2);
}
```

### Record types

In `java` or `C#`, records are immutable data classes that require only the type and name of fields :

- `equals`, `hashCode`, `toString` methods, as well as the private, final fields and public constructor, are generated by the Java compiler
- Equality is made by value : returns true for objects of the same class when all fields match

- Let's refactor again our `Player` to make it a `record`
  - It helps eliminate a lot of boilerplate

```java
public record Player(String name, ImmutableList<Card> cards) {
    public Player pickUp(Deck deck) {
        return new Player(name, cards.add(deck.takeCard()));
    }
}
```

- In a language like `kotlin` it would be even simpler to implement

```kotlin
data class Player(val name: String, val cards: List<Card>) {
    fun pickUp(deck:  Deck): Player = copy(cards = cards + deck.takeCard())
}
```

- In `C#` it would look like this

```csharp
public record Player(string Name, IReadOnlyList<Card> Cards)
{
    public Player PickUp(Deck deck)
        => this with {Cards = Cards.Append(deck.TakeCard()).ToImmutableList()};
}
```

Is not that beautiful and easy?
![Star in the eyes](/images/beautiful.webp)

## Constraint

The next object you need to create must be an `immutable type`

## Resources

- [Mutability & Immutability](https://web.mit.edu/6.005/www/fa15/classes/09-immutability/)
- [Value Objects to the rescue!](https://medium.com/swlh/value-objects-to-the-rescue-28c563ad97c6)
- [Immutability in Functional Programming](https://www.learningjournal.guru/article/scala/functional-programming/immutability-in-functional-programming/#:~:text=The%20literal%20meaning%20of%20Immutability,modify%20the%20existing%20object's%20state.)
- [Java record](https://www.baeldung.com/java-record-keyword)
- [Create C# record types](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/records)
