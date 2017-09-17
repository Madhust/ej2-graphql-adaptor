import { DataManager, Query } from '@syncfusion/ej2-data';
import { GraphQLAdaptorOptions, GraphQLAdaptor } from '../src/graphql-adaptor';

describe('GraphQLAdaptor for DataManager', () => {
    let adaptor: GraphQLAdaptor;
    let dm = new DataManager({ url: '/graphql', adaptor: adaptor });
    beforeAll(() => {
      adaptor = new GraphQLAdaptor({
          response: {
              result: 'orders',
              count: 'count'
          },
          query: `{ orders { CustomerID, EmployeeID } }`
      });
    });
    it('check processQuery', () => {
        let result = adaptor.processQuery(dm, new Query());
        expect(result.data).toEqual(JSON.stringify({ query: `{ orders { CustomerID, EmployeeID } }`, variables: { datamanager: {} } }));
    });
    it('check processResponse', () => {
        let result = adaptor.processResponse({ data: { orders: [{ CustomerID: 1}] } }, new Query());
        expect(adaptor.query).toEqual(`{ orders { CustomerID, EmployeeID } }`);
    });
});