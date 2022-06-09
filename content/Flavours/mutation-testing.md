---
categories:
    - Testing
authors:
    - Valentina Cupać
problems: 
    - How to evaluate the quality of a test suite?
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
`How to evaluate the quality of a test suite?`
`How to overcome the problems of Code Coverage metrics?`

## How to

We will showcase how to add Mutation Testing in your Java and .NET projects.
- Write an assertion-free test, which runs the code but no assertions
- Run code coverage metrics to show 100% code coverage
- Run mutation testing to show a less than 100% mutation score
- Retroactively add assertions, re-run mutation testing until you get a 100% mutation test score

## How to (Java)

You can add Mutation Testing in a Java Project. The following example shows it with Gradle and JUnit5 (though similar principles apply for Maven too).

Include pitest in build.gradle (version shown is the current latest, you can replace it):

```
plugins {
    id 'info.solidsoft.pitest' version '1.7.4'
}

pitest {
    junit5PluginVersion = '0.15'
}

```

Here's our Calculator class:

```

public class Calculator {
    public int add(int first, int second) {
        return first + second;
    }
}

```


Here's our CalculatorTest class. Notice that the test method is executing the production method, but that there are no assertions regarding expected results at all!

 In this example, to illustrate assertion-free testing, we will not have any assertions regarding expected results, but only executing the code.


```

public class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void init() {
        this.calculator = new Calculator();
    }

    @Test
    void should_add_two_numbers() {
        var first = 2;
        var second = 3;

        calculator.add(first, second);
    }
}

```

When we open up the scores produced by pitest, we can see a high score for code coverage, but a low score for mutation testing.

![Mutation Testing - Low Score - Summary](../images/mutation-testing-java-low-score-summary.png)

Furthermore, we can look at the details:

![Mutation Testing - Low Score - Details](../images/mutation-testing-java-low-score-details.png)

Now we will add assertions to our test:

```

public class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void init() {
        this.calculator = new Calculator();
    }

    @Test
    void should_add_two_numbers() {
        var first = 2;
        var second = 3;
        var expectedResult = 5;

        var result = calculator.add(first, second);

        assertThat(result).isEqualTo(expectedResult);
    }
}

```

We can run mutation testing again. Now we will see a high score for mutation testing:

![Mutation Testing - High Score - Summary](../images/mutation-testing-java-high-score-summary.png)

Furthermore, we can look at the details:

![Mutation Testing - High Score - Details](../images/mutation-testing-java-high-score-details.png)

Source: The above code samples are extracts from the GitHub repository [Calculator Kata (Java)](https://github.com/valentinacupac/calculator-kata-java), [MIT License](https://github.com/valentinacupac/calculator-kata-java/blob/main/LICENSE).


## How to (.NET)

You can add Mutation Testing in a .NET Project:

An example of failing mutation testing:


TODO: VC: Explain how to start
TODO: VC: Make it as visual as possible with subtitles, code examples, images

## Constraint
TODO: VC: How to add this technique as a constraint in a kata / workshop

Run mutation testing after 100% code coverage score, to ensure that assertions are covered too.

## Resources
TODO: VC: Additional resources / curated resources (books, links)

https://pitest.org/


