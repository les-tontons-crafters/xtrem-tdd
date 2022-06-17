---
categories:
    - Design
authors:
    - Yoan Thirion
problems:
    - How may I reduce code complexity?
    - How may I write more understandable/readable code?
---

# No For Loops
## Description
> "In computer science, a for-loop (or simply for loop) is a control flow statement for specifying iteration, which allows code to be executed repeatedly." - Wikipedia

## Why
There are a lot of advantages of using specific methods over generic `for` or `foreach` version.
- It’s easy to write and others can interpret it easily
- It’s easy to maintain, extend, and test
- You can write pure functions without any side effects
- Helps you think in terms of functional programming

## Problems
    - How may I reduce code complexity?
    - How may I write more understandable/readable code?

## How to
Let's take an example, imagine we want to identify which `Post` contained in `Blog` contains a given `Tag`

### Nested for-loops
```csharp
private IEnumerable<Post> FilterByTag(string searchedTag)
{
    var result = new List<Post>();

    for (int i = 0; i <= _blogs.Count - 1; i++)
    {
        var currentBlog = _blogs[i];
        
        for (int j = 0; j <= currentBlog.Posts.Length - 1; j++)
        {
            var currentPost = currentBlog.Posts[j];
            if (currentPost.Tags.Contains(searchedTag))
            {
                result.Add(currentPost);
            }
        }
    }
    return result;
}
```

In `kotlin`

```kotlin
private fun filterByTagWithFor(searchedTag: String): List<Post> {
    val result = ArrayList<Post>()
    for (i in 0 until blogs.size) {
        val currentBlog: Blog = blogs[i]
        for (j in 0 until currentBlog.posts.size) {
            val currentPost = currentBlog.posts[j]
            if (currentPost.tags.contains(searchedTag)) {
                result.add(currentPost)
            }
        }
    }
    return result
}
```

What can be improved here?
- A lot of variables: `searchedTag`, `i`, `currentBlog`, `j`, `currentPost`, `result`
- Mutation everywhere

### Foreach
Using `foreach` makes our code much easier to understand and reduce the number of variables and mutations

```csharp
private IEnumerable<Post> FilterByTag(string searchedTag)
{
    var result = new List<Post>();

    foreach (var currentBlog in _blogs)
    {
        foreach (var currentPost in currentBlog.Posts)
        {
            if (currentPost.Tags.Contains(searchedTag))
            {
                result.Add(currentPost);
            }
        }
    }
    return result;
}
```

In `kotlin`

```kotlin
private fun filterByTag(searchedTag: String): List<Post> {
    val result = ArrayList<Post>()
    for (currentBlog in blogs) {
        for (currentPost in currentBlog.posts) {
            if (currentPost.tags.contains(searchedTag)) {
                result.add(currentPost)
            }
        }
    }
    return result
}
```

### Yield
Using `foreach` with `yield` keyword allows us to accumulate without having to instantiate a new `List` by ourselves

```csharp
private IEnumerable<Post> FilterByTag(string searchedTag)
{
    foreach (var currentBlog in _blogs)
    {
        foreach (var currentPost in currentBlog.Posts)
        {
            if (currentPost.Tags.Contains(searchedTag))
            {
                yield return currentPost;
            }
        }
    }
}
```

### Recursion
We could use recursion as well
```csharp
private IEnumerable<Post> FilterByTag(string searchedTag)
    => FilterRecursively(
        new List<Post>(),
        _blogs.SelectMany(_ => _.Posts).ToImmutableList(),
        0,
        (post) => post.Tags.Contains(searchedTag));

private static List<T> FilterRecursively<T>(
    List<T> result, 
    ImmutableList<T> initialList, 
    int index,
    Func<T, bool> filterFunction)
{
    if (index == initialList.Count)
        return result;

    var item = initialList[index];
    if (filterFunction(item)) 
        result.Add(item);
    
    return FilterRecursively(result, initialList, index + 1, filterFunction);
}
```

In `kotlin`

```kotlin
private fun filterByTag(searchedTag: String): List<Post> =
    filter(
        mutableListOf(),
        blogs.flatMap { it.posts },
        0
    ) { it.tags.contains(searchedTag) }

private tailrec fun <T> filter(
    result: MutableList<T>,
    initialList: List<T>,
    index: Int,
    filter: (item: T) -> Boolean
): List<T> {
    if (index == initialList.size)
        return result
    if (filter(initialList[index]))
        result.add(initialList[index])

    return filter(result, initialList, index + 1, filter)
}
```

### Using List pure functions
Using `Linq` makes our code evern simpler to read and identify the intent

```csharp
private IEnumerable<Post> FilterByTag(string searchedTag)
    => _blogs
        .SelectMany(blog => blog.Posts)
        .Where(post => post.Tags.Contains(searchedTag));
```

Alternatively, you can use the other `Linq` syntax
```csharp
private IEnumerable<Post> FilterByTag(string searchedTag) 
    =>  from currentBlog in _blogs 
        from currentPost in currentBlog.Posts
        where currentPost.Tags.Contains(searchedTag)
        select currentPost;
```

In `kotlin`

```kotlin
private fun filterByTag(searchedTag: String): List<Post> =
    blogs.flatMap { it.posts }
        .filter { it.tags.contains(searchedTag) }
```

> In this example, we should also encapsulate some logic inside `Blog` and `Post` classes instead of envying data from them in the `Filter` method
Let's keep this discussion for another flavour 😉

## Constraint
Replace a `for-loop` by an alternative described here or another.