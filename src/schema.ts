export const schema = 
`input Sort {
    name: String
    direction: String
}

input Search {
    fields: [String]!
    operator: String!
    key: String!
    ignoreCase: Boolean
}

input Where {
    field: String!
    operator: String!
    value: String!
    ignoreCase: Boolean 
    condition: String
    isComplex: Boolean
}

input Aggregate {
    field: String! 
    type: String!
}

input DataManager {
    skip: Int
    take: Int
    sorted: [Sort]
    group: [String]
    table: String
    select: [String]
    where: [Where]
    search: [Search]
    requiresCount: Boolean,
    aggregates: [Aggregate]
}`
