import IEditor from "../../model/IEditor";
import NavigationNode from "../../model/NavigationNode";
import vscode from "vscode";
import TreeNavigationAdapter from "./TreeNavigationAdapter";
import {IFile} from "../../model/IFile";
import VsCodeFileAdapter from "./VsCodeDocumentFileAdapter";

const navigationViewId = 'navigation';

class VsCodeEditorAdapter implements IEditor {
    get file() : IFile | null {
        const document = vscode.window.activeTextEditor?.document
        if(!document) return null;
        return new VsCodeFileAdapter(document)
    }

    renderNavigation(tree: NavigationNode): void {
        vscode.window.registerTreeDataProvider(
            navigationViewId,
            new TreeNavigationAdapter(tree)
        );
    }

    navigateTo(node: NavigationNode): void {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const range = editor.document.lineAt(node.getLineNumber()!).range;
            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range);
            this.applyHighlight(range, editor);
        }
    }

    onFileChangeOrUpdate(callback: () => void): void {
        vscode.window.onDidChangeActiveTextEditor(_ => callback())
        vscode.window.onDidChangeVisibleTextEditors(_ => callback())
        vscode.window.onDidChangeTextEditorVisibleRanges(_ => callback())
        vscode.workspace.onDidSaveTextDocument(_ => callback())
    }

    private applyHighlight(range: vscode.Range, editor: vscode.TextEditor) {
        const highlightDecoration = vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(255,255,0,0.3)'
        });
        editor.setDecorations(highlightDecoration, [range]);
        setTimeout(() => editor.setDecorations(highlightDecoration, []), 250);
    }
}

export default VsCodeEditorAdapter;