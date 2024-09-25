import INavigationParserStrategy from "../model/INavigationParserStrategy";
import HttpFileToNavParser from "./httpfiles/HttpFileToNavParser";
import { IFile } from "../model/IFile";
import NavigationNode from "../model/NavigationNode";

const navigationParsers : { [extension: string]: INavigationParserStrategy } = {
    'http': new HttpFileToNavParser()
};

/**
 * The FileToNavigationParser class is responsible for parsing files and returning a NavigationNode based on the file's extension.
 */
class FileToNavigationParser {
    /**
     * Parses a given file and return the navigation tree.
     *
     * @param {IFile} file - The file to be parsed.
     * @return {NavigationNode} - The resulting navigation node after parsing the file.
     */
    parse(file: IFile): NavigationNode
    {
        const parserStrategy = navigationParsers[file.extension];
        if(!parserStrategy)
            return new NavigationNode("");

        return parserStrategy.parse(file.content);
    }
}

export default FileToNavigationParser;