import INavigationParserStrategy from "./INavigationParserStrategy";
import NavigationNode from "./NavigationNode";

export default class NavigationParserContext {
    constructor(private strategy: INavigationParserStrategy) { }

    parse(text: string): NavigationNode {
        return this.strategy.parse(text);
    }
}