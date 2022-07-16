---
categories:
    - Testing
authors:
    - Matias Miguez
problems: 
    - Testing Strategy
    - Testing Process
    - Software Quality
---

# MTP - Master Test Plan
## Description
A MTP is a documents that write down the Testing Strategy for a software product. Includes the Process, methodology, tools, criteria and all the general aspects associated with the Quality Assurance.

## Why?
Define the Testing "strategy" is a key aspect in software Engineering. A MTP will define the Quality of the software, not only at proper functionality level, but beyond, event at Customer Value level and profit.

At a technical view, a MTP helps the Organization reducing futuro cost, failures, impruvement of confident and creates a base of trusth among the people that develop products.

## Problems
A MTP help on:
 - Defines a clear strategy to ensure quality during all the SDLC.
 - Defines the testing process, stages and flows.
 - Defines the set of tools needed to flow the process.
 - Define the flow of work for the development of the product.
 - Ensures the Quality of the prodcut.

## How to
As with the ADR or SAD, a MTP need to be simple, well defined, available for everyone, need to be in constant change and improvement.

A good way to start is with the integrated Wiki on platforms as Gitlab, Github (to be stored in the same repository as the source code) o even in a shared folder in OneDrive, GoogleDrive or any useful tool used in the organization.

## Example Template

The following is a example structure:

```markdown
1. Introduction
1.1. Proyect description
1.2. Product Description
2. Scope
2.1. SUT - Software Under Test Overwie
<Here is useful a high level diagram, like the used in the SAD>
2.2. Functionality to be Tested
2.3. Out of Scope
<define clearly, what will NOT be tested>
3. Testing Strategy
3.1. Criticity Level
3.2. Test Categories
3.3. Test Identification (TestID)
3.4. Test Pass/Fail Criteria
3.5. Test Traceability Schema
<Here you specify how to link: Test to Features, Bugs, Design, Implementation, releases and so on>
4. Testing Process
4.1. Flow of Execution
5. Tools and Environments
6. Issues Management and Feedback
7. Resources Management
```

**IMPORTANT**: Each section need to be short, concise, and unambiguous. Try define each aspect as simple as possible.

## Constraint
 - Start as soon as possible.
 - Always is best to start now.
 - Work on the MTP in a iterative and incremental manner.
 - Always update the MTP when a change is made.

> Keep it Simple: avoid long text descriptions, make visual explanation instead.

## Resources
 - [MTP Examples](http://www1.scdhhs.gov/tcoe/worksoft_sdlc/workproducts/master_test_plan_BC36C914.html)
