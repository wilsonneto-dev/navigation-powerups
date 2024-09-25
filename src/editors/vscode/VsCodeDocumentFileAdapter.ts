import { IFile } from "../../model/IFile";
import { TextDocument } from "vscode";

/**
 * Adapter class implementing the IFile interface for use with VS Code TextDocuments.
 */
class VsCodeFileAdapter implements IFile
{
    constructor(private readonly document: TextDocument) { }

    /**
     * Retrieves and returns the complete text content of the document.
     *
     * @return {string} The text content of the document.
     */
    get content(): string {
        return this.document.getText();
    }

    /**
     * Gets the file extension.
     *
     * @return {string} The file extension as a string.
     */
    get extension(): string {
        return this.document.fileName.split('.').pop() || '';
    }

    /**
     * Retrieves the filename as a string.
     *
     * @return {string} The filename.
     */
    get filename(): string {
        return this.document.fileName;
    }

}

export default VsCodeFileAdapter;