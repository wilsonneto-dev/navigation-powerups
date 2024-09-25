import INavigationParserStrategy from "../../model/INavigationParserStrategy";
import NavigationNode from "../../model/NavigationNode";

class HttpFileToNavParser implements INavigationParserStrategy {
    public parse(text: string): NavigationNode {
        const root = new NavigationNode("Requests");
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
            } else if (this.isRequest(line)) {
                if(this.getName(line).length > 0)
                {
                    const request = new NavigationNode(this.getName(line), parents.at(-1)?.getLevel(), lineNumber);
                    parents.at(-1)?.addChild(request);
                }
            }
        });

        return root;
    }

    private isSectionHeader(line: string): boolean {
        return line.startsWith("####") && line.split(" ").length > 1;
    }

    private isRequest(line: string): boolean {
        return line.startsWith("###");
    }

    private getName(line: string): string {
        return line.split(" ").slice(1).join(" ").trim();
    }

    private getLevel(line: string): number {
        const numberOfSharps = line.split(" ")[0].split('#').length - 1;
        return numberOfSharps - 3;
    }
}

export default HttpFileToNavParser;
