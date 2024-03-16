---
categories:
  - Architecture
authors:
  - Miguez Matias
problems:
  - How can I document the Architecture of a Software?
  - How could we explain important aspects of the software that needs explanation?
  - How could we ensure quality of the Software by avoid obscureness of functionality?
---

# Software Architecture Document

A `SAD` is a general purpose document that write down the intended architecture of the software in development.

Goes from a high level detail to a low level ADR list associated with the software.
It uses text description and a wide range of visual tools like diagrams, pictures, UML and others to express and communicate the underlying architecture.

## Why?

A SAD is a very important and helpful knowledge base for a Software development team.
It provides insight about how the system is made, how:

- it works
- its interfaces
- its components
  and all the decisions that were made during its development.

All this knowledge is useful to communicate the architecture, improve, review and fix it.

## Problems

    - How can I document the Architecture of a Software?
    - How could we explain important aspects of the software that needs explanation?
    - How could we ensure quality of the Software by avoid obscureness of functionality?

## How to

Start by using the simplest tool available, to document the Architecture of the Software.

**Examples**:

- Gitlab Wiki: allow diagram-as-code embedded into Markdown
- Github: allow diagram-as-code embedded into Markdown
- Plain Markdown

For simplicity, `Markdown` is very useful and generally available.

Create a Wiki inside the Software repository (or separated if needed).

For Diagrams, use the best fit for you and your team, the main intent being understand and clear communication. [MermaidJS](https://mermaid-js.github.io/mermaid/#/) is a reasonable good tool for `diagraming as code` in Markdown.

## Template

```markdown
- Title
- Introduction
- Scope
- Driving Requirements / Non Functional Requirements / Main Features
- Views
  - High level Architecture
  - Components view
  - Modules View
  - API specification
  - Integration / Deployment View
  - Other if Needed
- ADR(s)
- References / Additional Bibliography
```

## Constraint

- Start as soon as possible.
- Always is best to start now.
- Work on the SAD in a iterative and incremental manner.
- Always update the SAD when a change is made.

> Keep it Simple: avoid long text descriptions, make visual explanation instead.

## Resources

- [Software Arcchitecture description](https://en.wikipedia.org/wiki/Software_architecture_description)
- [SAD SEI](https://wiki.sei.cmu.edu/confluence/display/SAD/Main+Page)
- [Example SAD](https://github.com/jorgevgut/airquality-mx/wiki/High-level-System-Design)
