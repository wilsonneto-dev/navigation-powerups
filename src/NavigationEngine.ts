import IEditor from "./model/IEditor";
import FileToNavigationParser from "./parsers/FileToNavigationParser";

/**
 * NavigationEngine class handles the generation and rendering of navigation structures
 * for files opened in the editor. It uses the IEditor interface for interacting with
 * the editor and FileToNavigationParser for parsing files.
 */
class NavigationEngine {
    private readonly editor: IEditor;
    private readonly parser: FileToNavigationParser;

    constructor(editor: IEditor) {
        this.editor = editor;
        this.parser = new FileToNavigationParser();
    }

    /**
     * Initialize the navigation engine
     *
     * @return {void} This method does not return a value.
     */
    initialize(): void {
        this.editor.onFileChangeOrUpdate(() => this.processFileToNavigation())
        this.processFileToNavigation()
    }

    /**
     * Processes the currently open file in the editor to generate a navigation structure.
     *
     * @return {void} Does not return a value.
     */
    private processFileToNavigation(): void
    {
        if(!this.editor.file) return;
        const navigationTree = this.parser.parse(this.editor.file)
        this.editor.renderNavigation(navigationTree)
    }

}

export default NavigationEngine;