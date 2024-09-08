import NavigationNode from "./NavigationNode";

export default interface INavigationParserStrategy {
    parse(text: string): NavigationNode;
}