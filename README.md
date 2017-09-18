# GraphQL Data Adaptor for EJ2 DataManager

GraphQL Data Adaptor for EJ2 DataManager

![Build](https://travis-ci.org/Madhust/ej2-graphql-adaptor.svg?branch=master)

## Usage

This adaptor helps EJ2 [`DataManager`](https://www.npmjs.com/package/@syncfusion/ej2-data) to interact with GraphQL endpoint. The simple `GraphQLAdaptor` initialization will look like below.

```typescript
import { GraphQLAdaptor } from 'ej2-graphql-adaptor';

let adaptor: GraphQLAdaptor = new GraphQLAdaptor({
            response: {
                result: 'orders',
                count: 'count'
            },
            query: `query Order($datamanager: DataManager) {
                orders(datamanager: $datamanager) {
                    CustomerID,
                    Freight,
                    ShipName
                }
            }`
        })
```

> Use `$datamanager` variable to access the DataManager value inside the GraphQL query.

## Schema

To include the [`DataManager`](https://www.npmjs.com/package/@syncfusion/ej2-data) schema at the GraphQL server, use the below code example.

```typescript
import { schema } from 'ej2-graphql-adaptor/schema/schema';

module.exports =
`${scheme}
type Order {
    CustomerID: String!
    Freight: Float!
    ShipName: String!
}

type Query {
    orders(datamanager: DataManager): [Order]
}
`
```

## API

`GraphQLAdaptor` will accept the following options while initialization.

| Name | Comments |
|-------------------|-----------------|
| response -> result | Specifies the response schema. Helps to find the collection from result |
| response -> count | Specifies the response schema. Helps to find the count value |
| query | Specifies the GraphQL query string |

## Limitations

* For now query support is provided, mutation will not work.