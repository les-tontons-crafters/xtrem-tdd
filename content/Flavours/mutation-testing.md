---
categories:
    - Testing
authors:
    - Valentina Cupać
problems: 
    - How to evaluate the quality of a test suite ?
    - How to overcome the problems of Code Coverage metrics?
---

# Mutation Testing
## Description

Mutation Testing is a technique which enables us to evaluate the quality of a test suite. It works by mutating the source code and then running the tests to check whether the tests can detect the mutant. In a high quality test suite, mutating the source code results in failing test(s), thereby killing the mutation. In a low quality test suite, the tests still pass even after the mutation, thereby the mutant has survived. Mutation score is the percentage of mutants killed, i.e. Killed Mutant Count / Total Mutant Count * 100. A score of 100% is a good indicator for test suite quality. Any score less than 100% indicates gaps in the test suite.

## Why ?

Code Coverage (e.g. line coverage, branch coverage) only provides feedback regarding the percentage of code executed by the tests, but it does not provide us with feedback regarding the quality of our test suite, whether our tests are able to detect bugs.

In the case of Assertion Free Testing, whereby there are no assertions in the tests, it is possible to get 

Mutation Testing helps us overcome some problems faced when using classical Code Coverage Metrics. 


## Problems
TODO: VC: Duplicate your problems questions from the yaml part --- We need to work on it

## How to
TODO: VC: Explain how to start
TODO: VC: Make it as visual as possible with subtitles, code examples, images

## Constraint
TODO: VC: How to add this technique as a constraint in a kata / workshop

## Resources
TODO: VC: Additional resources / curated resources (books, links)

https://pitest.org/