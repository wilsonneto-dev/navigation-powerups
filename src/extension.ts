import * as vscode from 'vscode';
import TreeNavigationAdapter from './ui/TreeNavigationAdapter';
import HttpFileToNavParser from './model/httpfiles/HttpFileToNavParser';
import INavigationParserStrategy from './model/INavigationParserStrategy';
import NavigationNode from './model/NavigationNode';

const navigationViewId = 'navigation';
const navigationCommandName = 'httpfile-navigation.navigate';
const navigationRefereshCommandName = 'httpfile-navigation.refresh';

const navigationParsers : { [extension: string]: INavigationParserStrategy } = {
	'http': new HttpFileToNavParser()
};

export function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor(_ => updateNavigationUi());
	vscode.workspace.onDidSaveTextDocument(_ => updateNavigationUi());	
	updateNavigationUi();

	vscode.commands.registerCommand(navigationCommandName, line => navigateToLine(line));
}

const updateNavigationUi = () => {
	const document = vscode.window.activeTextEditor?.document;
	for (const extension in navigationParsers) {
		if (document && document.fileName.endsWith(extension)) {
			const text = document.getText();
			const navigationTree = navigationParsers[extension].parse(text);

			vscode.window.registerTreeDataProvider(
				navigationViewId,
				new TreeNavigationAdapter(navigationTree, navigationCommandName)
			);
			return;
		}
	}

	vscode.window.registerTreeDataProvider(
		navigationViewId, new TreeNavigationAdapter(new NavigationNode('No navigation available'), navigationCommandName));
};

export function navigateToLine(node: NavigationNode) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const range = editor.document.lineAt(node.getLineNumber()!).range;
		editor.selection = new vscode.Selection(range.start, range.end);
		editor.revealRange(range);
		applyHighlight(range, editor);
	}
}

function applyHighlight(range: vscode.Range, editor: vscode.TextEditor) {
	const highlightDecoration = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgba(255,255,0,0.3)'
	});
	editor.setDecorations(highlightDecoration, [range]);
	setTimeout(() => editor.setDecorations(highlightDecoration, []), 250);
}

export function deactivate() {}
