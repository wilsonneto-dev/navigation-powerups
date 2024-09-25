import * as vscode from 'vscode';
import VsCodeEditorAdapter from "./VsCodeEditorAdapter";
import { navigationCommandName } from "./constants";
import NavigationEngine from "../../NavigationEngine";

export function activate() {
	// registering needed command for navigating
	vscode.commands.registerCommand(navigationCommandName, node => editor.navigateTo(node))

	// initializing the engine
	const editor = new VsCodeEditorAdapter()
	const navigationEngine = new NavigationEngine(editor)
	navigationEngine.initialize()
}

export function deactivate() { }
