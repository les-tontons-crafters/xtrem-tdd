## Contribute to this website
The master branch of this repository contains the latest stable changes.

### Guidelines
- Fork this repository
- Add your new content by :
    - Adding a new markdown file under `content/Flavours`
    - Use the following template
        
```markdown
---
categories:
    - <1st category>
authors:
    - <1st author name>
    - <n author name>
problems: 
    - <Problem 1 that solves expressed as a question>
    - <Problem n that solves expressed as a question>
---

# <Title>
## Description
<Describe in a few line the practice / technique>

## Why?
<Explain the `WHY`, how it can be useful>

## Problems
    <Duplicate your problems questions from the yaml part> --- We need to work on it

## How to
<Explain how to start>
Make it as visual as possible with subtitles, code examples, images

## Constraint
<How to add this technique as a constraint in a kata / workshop>

## Resources
<Additional resources / curated resources (books, links)>
```
- For now we have created 5 categories / tags : `Architecture`, `Design`, `Refactoring`, `Techniques`, `Testing`

### Run the site locally
This website is generated through [gatsby](https://www.gatsbyjs.com/) :
- [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/) 
- Run the folowing commands :
```shell
yarn #install the dependencies
yarn dev #run the site locally
```

### Create your PR
- Once you have validated your local content development
- Please create a `Pull Request`
    - Pull requests should be submitted against the latest head of master
    - Fill the template and then wait for the review
    - Thanks for your contribution 😊