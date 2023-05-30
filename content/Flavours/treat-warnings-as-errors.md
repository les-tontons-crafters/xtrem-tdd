---
categories:
    - Practices
authors:
    - Yoan Thirion
problems: 
    - How to ensure software quality as soon as possible?
    - How not to drown in warning messages from our tools?
---

# Treat Warnings as Errors
## Description
It can be really hard to identify and see new warnings when you already have a lot of them.
That is why this practice involves `treating all warnings as errors` so that they can be dealt with as quickly as possible.

Those warnings can come from different tools you use:
- Compiler
![Compilation Warnings](../../images/treat-warnings-as-errors/warnings.webp)
- I.D.E
![IDE Warnings](../../images/treat-warnings-as-errors/rider-warnings.webp)

- Linters
![Linter Feedback](../../images/treat-warnings-as-errors/sonarlint-feedback.webp)

- Static Code Analysis tools
![Sonar Warnings](../../images/treat-warnings-as-errors/sonar-smells.webp)

- Package manager (Security issues or Dependency freshness for instance)
![Libyear Warnings](../../images/treat-warnings-as-errors/libyear-warnings.webp)

## Why?
In a lot of projects, warnings are never resolved.

![AWS java sdk sonar](../../images/treat-warnings-as-errors/aws-sonar.webp)

By accumulating them, you can be sure that at one point it will create you problems like defects, weird side-effects and will make you `struggling for evolving your code base`.

The good news is that you can fight it simply by changing some habits and forcing you solve those warnings on the flow.

## Problems
    - How to ensure software quality as soon as possible?
    - How not to drown in warning messages from our tools?

## How to
### Configure your projects / compiler
You can simply configure your tools to `treat every warnings as errors`.

For example, in `dotnet` you can compile through:
```shell
dotnet build -warnaserror
```

or even better you can configure it in the `csproj` file:
```xml
<PropertyGroup Condition=" '$(Configuration)' == 'Debug' ">
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
</PropertyGroup>
```

Here is another example in `java` with `maven`:
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>${maven.compiler.version}</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <failOnWarning>true</failOnWarning>
        <showWarnings>true</showWarnings>
        <compilerArgs>
            <arg>-Xlint:unchecked</arg>
            <arg>-Xlint:rawtypes</arg>
        </compilerArgs>
    </configuration>
</plugin>
```

### Configure Static Code Analysis
In static code analysis tools like [`SonarCloud`](https://sonarcloud.io/) you can configure `Quality Gates` defining rules for making an analysis successful or not:
![Sonar Quality Gates](../../images/treat-warnings-as-errors/quality-gates.webp)

You should configure it to be the more drastic as possible and not authorizing any warnings in it.
If at one point the analysis fails apply the lean principle `Stop the line` and fix it.

You should really treat those warnings as defects on your production line.

### Have 0 tolerance for warnings
It is a team practice, everything can not be automated so you should really align inside your team on this principle of `0 tolerance for warnings`. 

## Constraint
- Configure your tools like explained above on your current project
- Fix every warnings in mob if necessary (you will learn a lot)

## Resources
- [Mark Seemann - Code That Fits in Your Head: Heuristics for Software Engineering](https://www.oreilly.com/library/view/code-that-fits/9780137464302/)
- [C# Compiler Options to report errors and warnings](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/errors-warnings)