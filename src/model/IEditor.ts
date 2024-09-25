import NavigationNode from "./NavigationNode";
import {IFile} from "./IFile";

/**
 * Interface representing an editor with navigation capabilities.
 *
 * @interface IEditor
 */
interface IEditor {
    /**
     * Retrieves the opened file.
     *
     * @return {IFile} The current file.
     */
    get file() : IFile | null

    /**
     * Renders the navigation menu based on the provided navigation tree.
     *
     * @param {NavigationNode} tree - The root node of the navigation tree to render.
     * @return {void}
     */
    renderNavigation(tree: NavigationNode): void

    /**
     * Navigates to the specified navigation node.
     *
     * @param {NavigationNode} node - The navigation node to navigate to.
     * @return {void}
     */
    navigateTo(node: NavigationNode): void

    /**
     * Registers a callback function to be invoked whenever a file is changed or updated.
     *
     * @param {function} callback - The function to be called when a file change or update is detected.
     * @return {void} This method does not return a value.
     */
    onFileChangeOrUpdate(callback: () => void): void
}

export default IEditor;