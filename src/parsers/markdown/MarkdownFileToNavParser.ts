import INavigationParserStrategy from "../../model/INavigationParserStrategy";
import NavigationNode from "../../model/NavigationNode";

class MarkdownFileToNavParser implements INavigationParserStrategy {
    public parse(text: string): NavigationNode {
        const root = new NavigationNode("Markdown Document");
        const parents: NavigationNode[] = [];
        parents.push(root);

        const lines = text.split("\n");
        lines.forEach((line, index) => {
            const lineNumber = index;

            if (this.isSectionHeader(line)) {
                const header = new NavigationNode(this.getName(line), this.getLevel(line), lineNumber);
                while (header.getLevel() <= parents.at(-1)!.getLevel()) {
                    parents.pop();
                }

                parents.at(-1)!.addChild(header);
                parents.push(header);
            }
        });

        return root;
    }

    private isSectionHeader(line: string): boolean {
        return line.trim().startsWith("#") && line.trim().split(" ").length > 1;
    }

    private getName(line: string): string {
        return line.trim().split(" ").slice(1).join(" ").trim();
    }

    private getLevel(line: string): number {
        const numberOfSharps = line.trim().split(" ")[0].split('#').length - 1;
        return numberOfSharps;  // Levels are 0-based for easier hierarchy
    }
}

export default MarkdownFileToNavParser;
