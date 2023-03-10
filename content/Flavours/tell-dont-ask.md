---
categories:
    - Design
authors:
    - Yoan Thirion
problems:
    - How to identify encapsulation issues?
    - How may I preserve correctness of the internal state of my objects?
    - How may I ensure to not duplicate some business logics?
---

# Tell Don't Ask
## Description
Object Oriented Programming Paradigm is all about bundling data and operations on that data together.

In other words this principle is stating that we should `Tell an object what to do rather than asking an object for its data and acting on it based on that data`.

![Tell Don't Ask](../../images/tell-dont-ask.webp)

This principle is also called `Feature envy`.

## Why? 
`Procedural code gets information then makes decisions. Object-oriented code tells objects to do things.` that is the whole idea behind this principle.

If we do not do that we are exposing our code to different kind of issues:
- Code duplication: certain business logic may be duplicated without noticing it (state transition)
- Bad encapsulation: 
    - data could be exposed outside from the object itself and show too much from its internal state
    - object states could be updated from the outside resulting to a wrong state object

## Problems
    - How to identify encapsulation issues?
    - How may I preserve correctness of the internal state of my objects?
    - How may I ensure to not duplicate some business logics?

## How to
When a class gets data from another class in order to do some calculation or comparison on that data it means that the client class envies the other class.

### Ask code
![Ask example](../../images/ask.webp)

There are plenty of issues with the code below:
- `Order` is just a container of data
- The checking state logic may be duplicated in other `Use Cases`
- The `business invariants` are inside the `UseCase` class, what is the purpose of the `Order`?
    - Anything can create an `Order` instance in a wrong state because there is no encapsulation
    - In `DDD`, we promote to expose only behaviors / methods to the outside world

```csharp
public class OrderApprovalUseCase
{
    private readonly IOrderRepository _orderRepository;
    public OrderApprovalUseCase(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public void Run(OrderApprovalRequest request)
    {
        var order = _orderRepository.GetById(request.OrderId);

        if (order.Status == OrderStatus.Shipped)
        {
            throw new ShippedOrdersCannotBeChangedException();
        }

        if (request.Approved && order.Status == OrderStatus.Rejected)
        {
            throw new RejectedOrderCannotBeApprovedException();
        }

        if (!request.Approved && order.Status == OrderStatus.Approved)
        {
            throw new ApprovedOrderCannotBeRejectedException();
        }

        order.Status = request.Approved ? OrderStatus.Approved : OrderStatus.Rejected;
        _orderRepository.Save(order);
    }
}

public class Order
{
    public decimal Total { get; set; }
    public string Currency { get; init; }
    public IList<OrderItem> Items { get; init; }
    public decimal Tax { get; set; }
    public OrderStatus Status { get; set; }
    public int Id { get; init; }
}
```

### Tell code
![Tell example](../../images/tell.webp)

Let's refactor this code by moving transition state inside the `Order` entity.

```csharp
public class OrderApprovalUseCase
{
    private readonly IOrderRepository _orderRepository;
    public OrderApprovalUseCase(IOrderRepository orderRepository) => _orderRepository = orderRepository;

    public void Run(OrderApprovalRequest request)
        => _orderRepository.Save
        (
            ApproveOrReject(
                request,
                _orderRepository.GetById(request.OrderId)
            )
        );

    // Should be split in 2 Use Cases
    private static Order ApproveOrReject(OrderApprovalRequest request, Order order)
        => request.Approved
            ? order.Approve()
            : order.Reject();
}

public class Order
{
    public decimal Total { get; private set; }
    public string Currency { get; private set; }
    public IList<OrderItem> Items { get; private set; }
    public decimal Tax { get; private set; }
    public OrderStatus Status { get; private set; }
    public int Id { get; private set; }

    private Order ApproveOrReject(OrderStatus newStatus, Action checkState)
    {
        if (Status == Shipped)
            throw new ShippedOrdersCannotBeChangedException();

        checkState();
        Status = newStatus;

        return this;
    }

    public Order Approve() =>
        ApproveOrReject(
            Approved,
            () =>
            {
                if (Status == Rejected)
                    throw new RejectedOrderCannotBeApprovedException();
            });

    public Order Reject()
        => ApproveOrReject(
            Rejected,
            () =>
            {
                if (Status == Approved)
                    throw new ApprovedOrderCannotBeRejectedException();
            });
}
```

## Constraint
- Identify decisions taken outside from an object based on its data
- Refactor this code to encapsulate this decision taking inside that given object

## Resources
- [Tell Don't Ask by Martin Fowler](https://martinfowler.com/bliki/TellDontAsk.html)
- [Feature Envy Smell](http://wiki.c2.com/?FeatureEnvySmell)