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

Mutation Testing is a technique which enables us to evaluate the quality of a test suite. It works by mutating the source code and then running the tests to check whether the tests can detect the mutant. Mutating source code implies making a small change in the source code, for example by changing conditions, inverting negatives, etc.

- In a high quality test suite, mutating the source code results in failing test(s), thereby killing the mutant. 
- In a low quality test suite, the tests still pass even after the mutation, thereby the mutant has survived. 

Mutation score is the percentage of mutants killed, i.e. `Killed Mutant Count / Total Mutant Count * 100`. 
- A score of 100% is a good indicator for test suite quality.
    - It indicates that if we ever have a regression bug in our code, that it will be able to be detected by the test.
- Any score less than 100% indicates gaps in the test suite
    - It indicates missing behavioural assertions
    - It means that code exhibits behaviour which is not covered by any test

## Why?

Code Coverage metrics (e.g. line coverage, branch coverage) only provide feedback regarding the percentage of code executed by the tests. Unfortunately, they do not provide us feedback regarding the quality of our test suite.

In the case of Assertion Free Testing, whereby there are no assertions in the tests, it is possible to get a high Code Coverage score (even 100%) but we're not actually testing anything.

Mutation Testing helps us overcome some problems faced when using classical Code Coverage Metrics - because Mutation Testing is able to identify holes in behavioural assertions. In the case of Assertion Free Testing (or in the case of partial assertion), the Mutation Score will be low, thereby indicating a low quality test suite. 


## Problems
    - How to evaluate the quality of a test suite?
    - How to overcome the problems of Code Coverage metrics?

## How to

We will showcase how to add Mutation Testing in Java and .NET projects.
- Write an assertion-free test, which runs the code but no assertions
- Run code coverage metrics to show 100% code coverage
- Run mutation testing to show 0% mutation score
- Retroactively add the missing assertions and achieve 100% mutation score

## How to (Java)

We can run Mutation Testing in Java using the Pitest plugin.

The following example illustrates usage of Pitest with Gradle/Maven and JUnit5.
Versions shown are the current versions as at time of writing.

### Gradle
Pitest is registered within `build.gradle`:

```groovy
plugins {
    id 'info.solidsoft.pitest' version '1.7.4'
}

pitest {
    junit5PluginVersion = '0.15'
}
```

### Maven
Pitest is registered within `pom.xml`:

```xml
<properties>
    <pitest.version>1.8.0</pitest.version>
    <pitest.junit5.version>0.15</pitest.junit5.version>
</properties>
    
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>${pitest.version}</version>
</plugin>

<dependency>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-junit5-plugin</artifactId>
    <version>${pitest.junit5.version}</version>
    <scope>test</scope>
</dependency>
```

Suppose we have a poorly-written test. This test is executing code, but there are no assertions regarding expected behaviour (assertion-free testing):

```java
@Test
void should_add_two_numbers() {
    calculator.add(2, 3);
}
```

When we run pitest, we get a high score for Line Coverage but a low score for Mutation Coverage:

![Mutation Testing - Low Score - Summary](../../images/mutation-testing-java-low-score-summary.png)

![Mutation Testing - Low Score - Details](../../images/mutation-testing-java-low-score-details.png)

Suppose we have a well-written test, which has appropriate assertions regarding expected behaviour:

```java
@Test
void should_add_two_numbers() {
    var result = calculator.add(2, 3);
    assertThat(result).isEqualTo(5);
}
```

When we run pitest, we get a high score for Line Coverage a high score for Mutation Coverage:

![Mutation Testing - High Score - Summary](../../images/mutation-testing-java-high-score-summary.png)

![Mutation Testing - High Score - Details](../../images/mutation-testing-java-high-score-details.png)

Source: The above code samples are based on extracts from the GitHub repository [Calculator Kata (Java)](https://github.com/valentinacupac/calculator-kata-java).

## How to (.NET)

We can run Mutation Testing in .NET using Stryker.NET.

The Stryker tool can be installed as follows:

```bash
dotnet tool install -g dotnet-stryker
```

Suppose we have a poorly-written test. This test is executing code, but there are no assertions regarding expected behaviour (assertion-free testing):

```csharp
[Fact]
public void Should_add_two_numbers()
{
    calculator.Add(2, 3);
}
```

When we run Stryker, we get a low Mutation Score:

![Mutation Testing - Low Score - Summary](../../images/mutation-testing-dotnet-low-score.png)

Suppose we have a well-written test, which has appropriate assertions regarding expected behaviour:

```csharp
[Fact]
public void Should_add_two_numbers()
{
    var result = calculator.Add(2, 3);
    result.Should().Be(5);
}
```

When we run Stryker, we get a high Mutation Score:

![Mutation Testing - High Score - Summary](../../images/mutation-testing-dotnet-high-score.png)

Source: The above code samples are based on extracts from the GitHub repository [Calculator Kata (.NET)](https://github.com/valentinacupac/calculator-kata-dotnet).

## Constraint

To check the quality of your test suite:
- Run Code Coverage, and write any missing tests to ensure you have a high Code Coverage
- Run Mutation Testing, and write any missing tests to ensure you have a high Mutation Score

The following should be noted:
- If you are applying TDD, you will naturally reach high scores for both the metrics above
- If you are not applying TDD, you will likley get low metrics (especially for Mutation Testing), and will need to put more effort retroactively to get a high Mutation Score
- The reason for running Code Coverage metrics before running Mutation Testing metrics is because Code Coverage metrics are computed faster, and Mutation Testing takes longer to run

## Resources

The following are used for running Mutation Testing:
- [Pitest (Java)](https://pitest.org/)
- [Stryker (.NET)](https://stryker-mutator.io/docs/stryker-net/Introduction)

The following are the GitHub code samples used in this page:
- [Calculator Kata (Java)](https://github.com/valentinacupac/calculator-kata-java)
- [Calculator Kata (.NET)](https://github.com/valentinacupac/calculator-kata-dotnet)