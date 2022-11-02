---
categories:
    - Practice
authors:
    - Yoan Thirion
problems: 
    - How to build a shared understanding on functionalities?
    - How to avoid misunderstandings, incorrect assumptions when developing new functionalities?
---

# Example Mapping

## Description
Example mapping is a technique for gaining clarity around the acceptance criteria for a given User Story. 
It is based on the idea that multiple examples of specific cases convey information better than a single bad abstraction of a concept.

## Why?
Example mapping should be used with the right people in the room to be able to explain:
- Business rules
- Example scenarios

You need to have business experts and technical knowledge people that can ask the right questions about those rules. 

It should be used as a tool to ensure that the team appropriately understands what is expected of the story, and to get the stakeholders involved in the development of acceptance criteria.

## Problems
    - How to build a shared understanding on functionalities?
    - How to avoid misunderstandings, incorrect assumptions when developing new functionalities?

## How to
1. Business experts (PO or BA) present the problem to solve
    - To illustrate the feature : walks through a couple of concrete examples
    - Explains why a user might want this feature, and what it allows users to do that they couldn't do previously. 
    - Lists the key business rules and constraints that he/she knows about
2. Others build their understanding together by asking questions about : 
    - The examples : `what if...`, `what else...`
    - The business rules : `so that means...`

> Developer(s) will be thinking of technical constraints and possible solutions.

> Tester(s) will be thinking of edge cases and testability concerns.

### Run an example mapping workshop
- Start by writing the User Story being discussed on a `yellow` post-it note and placing it at the top of the table.
- Then we write each of the acceptance criteria, or rules we already know, on a `blue` post-it and place them under the yellow post-it of the User Story.
- For each rule, we may need one or more examples to illustrate it. Write them on a `green` post-it note and place them under the relevant rule.
- When discussing these examples, you may discover questions that no one in the room can answer. 
    - These are written on a `red` post-it and the conversation continues.

![Example mapping format](../../images/example-mapping.webp)

We continue until the group is convinced that the scope of the User Story is clear, or we run out of time.

### Facilitation tips
- To avoid influencing and biasing each others it is highly recommended to let each participant think about the questions he/she would like to ask in his/her corner. This leads to richer discussions and make the place safer to run this workshop.
- Capture the [Ubiquitous Language](https://thedomaindrivendesign.io/developing-the-ubiquitous-language/).
    - During the session, discussions may occur on given words : it is the perfect time to enrich your Ubiquitous language
    - Capture those words in your favorite tool and agree on their definitions

### Outcomes
- New User Stories / split
- Refined rules / acceptance criteria
- Key examples
- Shared understanding

![Results](../../images/example-mapping-result.webp)

### Gherkin syntax
Just like with acceptance criteria we can use [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/) to describe clearly our examples :
```gherkin
Given <context> // Setup the context (can have multiple lines separated with AND)
When <action> // Perform an action on our system
Then <expectations> // What are the expectations
```

![Example Mapping by example](../../images/example-mapping-example.webp)

### An example
```markdown
Feature: Score Calculation 
  In order to know my performance
  As a player
  I want the system to calculate my total score
  
Scenario: Gutter / Children game
  Given a new bowling game
  When all of my balls are landing in the gutter
  Then my total score should be 0
  
Scenario: Beginners game
  Given a new bowling game
  When I roll 2 and 7
  And I roll 3 and 4
  And I roll 8 times 1 and 1
  Then my total score should be 32
  
Scenario: Another beginners game
  Given a new bowling game
  When I roll the following series:	2,7,3,4,1,1,5,1,1,1,1,1,1,1,1,1,1,1,5,1
  Then my total score should be 40
  
Scenario: All Strikes
  Given a new bowling game
  When all of my rolls are strikes
  Then my total score should be 300
  
Scenario: One single spare
   Given a new bowling game 
   When I roll the following series: 2,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
   Then my total score should be 29
   
Scenario: All spares
  Given a new bowling game
  When I roll 10 times 1 and 9
  And I roll 1
```

## Constraint
Stop writing code, in group challenge the current User Story / Feature you are working using this format
- Individually, write down your questions - 5'
- Answer the questions together
- Describe some examples together

## Resources
- [How to use Example Mapping](https://insideproduct.co/example-mapping/)
- [Cucumber and Example mapping](https://cucumber.io/docs/bdd/example-mapping/)
- [Specification by Example by Gojko Adzic](https://www.manning.com/books/specification-by-example)
- [Steering the conversation with Example Mapping](https://xebia.com/example-mapping-steering-the-conversation/)