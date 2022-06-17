---
categories:
    - Design
authors:
    - Yoan Thirion
problems:
    - How can I be more efficient when using my IDE?
    - How may I avoid mistakes when writing code?
---

# Generate Code From Usage

## Description
`Generate Code From Usage` feature available in every modern IDE enables you to use classes, members, methods, ... before you define them.

## Why
- This minimizes interruption to your workflow
- You can think about your code as a consumer it is particularly useful when you use `TDD`
    - It generates new types and members in the source code when you first reference them in your test cases, before they are defined
- Your IDE is more reliable and create code faster than us, so it will avoid you a lot of mistales

## Problems
    - How can I be more efficient when using my IDE?
    - How may I avoid mistakes when writing code?

## How to
Red stuff appears for undefined identifiers. 
When you rest the mouse pointer on the identifier, an error message appears in a tooltip. 

Depending on your IDE and Operating System shortcuts can differ but you should be able to access options like:
- Generate property
- Generate field
- Generate method
- Generate class
- Generate new type (for a class, struct, interface, record, or other data structures)

### Example
- Imagine we want to implement a test like this

![Scenario example](../../images/generate-code-scenario.png)

- We can create `Hunter` type directly from here
    - Go on the `red` part
    - From `Rider` contextual we can display available actions
    - You have the same kind of actions in every `good` IDE

![Create Hunter](../../images/generate-code-contextual-action.png)

- We can then create our methods directly from our tests as well

![Create Method](../../images/generate-code-method.png)

## Constraint
You are authorized to create new code `only from usage` (from a test or production code)

## Resources
- [Rider generate code from usage](https://www.jetbrains.com/help/rider/Code_Generation__Generating_Code_from_Usage.html)
- [Generate code from IntelliJ](https://www.jetbrains.com/help/idea/generating-code.html)
- [Visual Studio Generate from usage Feature](https://docs.microsoft.com/en-us/visualstudio/ide/walkthrough-test-first-support-with-the-generate-from-usage-feature?view=vs-2022)