export class RouterConfigDto {
    routes: any;
    constructor(newRoute: any, methodName: string, urlRoute: string, routes: any) {
        this.routes = routes;
        this.init(newRoute, methodName, urlRoute);
    }

    init(newRoute: any, methodName: string, urlRoute: string) {
        newRoute[methodName]();
        this.routes.use(urlRoute, newRoute.getRoute());
    }
}
