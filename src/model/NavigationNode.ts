export default class NavigationNode {
    private name: string;
    private lineNumber: number | null;
    private level: number;
    private children: NavigationNode[];

    constructor(name: string, level: number = 0, lineNumber: number | null = null) {
        this.name = name;
        this.level = level;
        this.lineNumber = lineNumber;
        this.children = [];
    }

    addChild(child: NavigationNode): void {
        this.children.push(child);
    }

    getChildren(): NavigationNode[] {
        return this.children;
    }

    getName(): string {
        return this.name;
    }

    getLevel(): number {
        return this.level;
    }

    getLineNumber(): number | null {
        return this.lineNumber;
    }
}
