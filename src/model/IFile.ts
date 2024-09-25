/**
 * IFile interface represents a file with properties to access its content, filename, and extension.
 *
 * @interface
 */
export interface IFile {
    /**
     * Retrieves the content of a specific resource.
     *
     * @return {string} The content of the resource as a string.
     */
    get content(): string

    /**
     * Retrieves the filename.
     *
     * @return {string} The filename as a string.
     */
    get filename(): string

    /**
     * Retrieves the file extension from the name of the file.
     *
     * @return {string} The file extension.
     */
    get extension(): string
}