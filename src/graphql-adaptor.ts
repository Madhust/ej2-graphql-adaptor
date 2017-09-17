import { DataManager, Query, UrlAdaptor, DataOptions } from '@syncfusion/ej2-data';

export interface GraphQLAdaptorOptions {
    response: { result: string, count: string };
    query: string;
    getQuery?: () => string;
    getVariables?: () => Object;
}

export class GraphQLAdaptor extends UrlAdaptor {
    public opt: GraphQLAdaptorOptions;
    public schema: { result: string, count: string };
    public query: string;
    public getVariables: Function;
    public getQuery: Function;
    constructor(options: GraphQLAdaptorOptions) {
        super();
        this.opt = options;
        this.schema = this.opt.response;
        this.query = this.opt.query;
        this.getVariables = () => {};
        this.getQuery = () => this.query;
    }

    processQuery(datamanager: DataManager, query: Query) {
        var result = super.processQuery.apply(this, arguments);
        var tmp = JSON.parse(result.data);
        var vars = this.getVariables() || {};
        vars['datamanager'] = tmp;
        var data = JSON.stringify({
            query: this.getQuery(),
            variables: vars
        });
        result.data = data;
        return result;
    }
    processResponse(data: any, query: any) {
        var result = data.data[this.schema.result];
        var count = data.data[this.schema.count];
        return query.requiresCount ? { result: result, count: count } : result;
    }
}