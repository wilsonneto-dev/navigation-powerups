import * as vscode from 'vscode';
import NavigationNode from '../model/NavigationNode';


export default class TreeNavigationAdapter implements vscode.TreeDataProvider<vscode.TreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
	public readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

	constructor(private navigationRoot: NavigationNode, private onClickCommandName: string) { }

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
		if (!element) {
			return this.convertToTreeItems(this.navigationRoot.getChildren());
		}

		const node = this.findNodeByName(this.navigationRoot, element.label as string);
		if (node) {
			return this.convertToTreeItems(node.getChildren());
		}
		return [];
	}

	private convertToTreeItems(nodes: NavigationNode[]): vscode.TreeItem[] {
		return nodes.map(node => {
			const treeItem = new vscode.TreeItem(node.getName(), node.getChildren().length > 0 ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
			if(node.getChildren().length === 0) {
				treeItem.command = {
					command: this.onClickCommandName,
					title: 'Navigate',
					arguments: [node]
				};
			}
			return treeItem;
		});
	}

	private findNodeByName(root: NavigationNode, name: string): NavigationNode | null {
		if (root.getName() === name) {
			return root;
		}
		for (const child of root.getChildren()) {
			const found = this.findNodeByName(child, name);
			if (found) {
				return found;
			}
		}
		return null;
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}
