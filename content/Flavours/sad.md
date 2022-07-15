---
categories:
    - Architecture
authors:
    - Miguez Matias
problems: 
    - Document the Software Architecture
    - Visibilice the Software Architecture
    - Communicate the Software Architecture
---

# SAD - Software Architecture Document
## Description
A SAD is a general porpouse document that write down the intended architecture of the software in development. Goes fron a high level detail to a low level ADR list associated with the software. It uses text description and a wide range of visual description (diagrams, pictures, UML and others) to express and communicate the underling architecture.

## Why?

A SAD is a very important and helpful knowledge base for a Software development. Provides insight about how the system is made, how its work, its interfaces, componentes and all the desitions that were made during its development.

All this knowledge is useful to communicate the architecture, inprove, review and fix it.

## Problems
Generate and mantain a SAD, solve the following problems:
 - Document the architecture of a Software
 - Explain important aspects of the software that needs explanaition, by writing down.
 - Detail complex solutions, algoriths, process.
 - Knowledgebase of the Software
 - Visibility, communication, collaboration.
 - Ensure quality of the Software by avoid obscurences of funcionality.

## How to
Start by using the simplest tool available, to document the Architecture of the Software. Example:
 - Gitlab Wiki (allow diagram-as-code embbeded into Markdown)
 - Github (allow diagram-as-code embbeded into Markdown)
 - Plain Markdown
For simplicity, Markdown is very usefull and generaly available. Create a Wiki inside the Software repository (or separated if needed).

## Template
    
 - Title
 - Introduction
 - Scope 
 - Driving Requirements / Main Features
 - Views
   - High livel Architecture
   - Components view
   - Modules View
   - API specification
   - Integration / Deployment View
   - Other if Needed
 - ADR
 - References / Additional Bibliography
    
## Constraint


## Resources

