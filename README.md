# GraphQL Data Adaptor for EJ2 DataManager

GraphQL Data Adaptor for EJ2 DataManager

![Build](https://travis-ci.org/Madhust/ej2-graphql-adaptor.svg?branch=master)

## Usage

### Query

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

### Mutation

Mutation query can be provided using `getMutation` option. This method will be invoked with
action name (like `insert`, `update` & `remote`) on mutation opertations.

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
            }`,
            getMutation: (action: string) => {
                if (action === 'insert') {
                    return `mutation Create($value: OrderInput){
                                createOrder(value: $value) {
                                    CustomerID,
                                    Freight,
                                    ShipName
                                }
                            }`
                }

                if (action === 'update') {
                    return `mutation Update($value: OrderInput){
                                updateOrder(value: $value) {
                                    CustomerID,
                                    Freight,
                                    ShipName
                                }
                            }`
                }

                if (action === 'remove') {
                    return `mutation Remove($key: String, $keyColumn: String $value: OrderInput){
                                removeOrder(key: $key, keyColumn: $keyColumn, value: $value) {
                                    CustomerID,
                                    Freight,
                                    ShipName
                                }
                            }`
                }
            }
        })
```

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

| Name | Type | Comments |
|-------------------|-----------------|-----------------|
| response -> result | string | Specifies the response schema. Helps to find the collection from result |
| response -> count | string | Specifies the response schema. Helps to find the count value |
| query | string | Specifies the GraphQL query string |
| getMutation | (action: string) => string | Invoked every time when CRUD operation initiated |

## Variables

`GraphQLAdaptor` sends various variable names which can be used in query. Below table provides the variable name and their description.

| Variable name | Description |
|-------------------|-----------------|
| $datamanager | Holds the datamanager query such as page, sort etc. |
| $keyColumn | Specifies the primary column name |
| $key | Specifies the primary key value |
| $value | Holds the new, edit or removed data |
| $action | Specifies CRUD operation performed |