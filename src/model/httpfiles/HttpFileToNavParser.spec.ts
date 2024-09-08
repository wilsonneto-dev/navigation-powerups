import NavigationNode from "../NavigationNode";
import HttpFileToNavParser from "./HttpFileToNavParser";

const example = `
#### parent
### child 1.1
### child 1.2

#### parent 2
### child 2.1
### child 2.2
#### parent 3
### child 3.1
### child 3.2
`;

describe('HttpFileToNavParser', () => {
  let parsedRoot: NavigationNode;

  beforeAll(() => {
    const httpFileParser = new HttpFileToNavParser();
    parsedRoot = httpFileParser.parse(example);
  });

  test('should parse the parents properly', () => {
    expect(parsedRoot.getChildren().length).toBe(3);
    expect(parsedRoot.getChildren()[0].getName()).toBe('parent');
    expect(parsedRoot.getChildren()[1].getName()).toBe('parent 2');
    expect(parsedRoot.getChildren()[2].getName()).toBe('parent 3');
  });

  test('should parse the children properly', () => {
    expect(parsedRoot.getChildren()[0].getChildren().length).toBe(2);
    expect(parsedRoot.getChildren()[0].getChildren()[0].getName()).toBe('child 1.1');
    expect(parsedRoot.getChildren()[0].getChildren()[1].getName()).toBe('child 1.2');
    expect(parsedRoot.getChildren()[1].getChildren().length).toBe(2);
    expect(parsedRoot.getChildren()[1].getChildren()[0].getName()).toBe('child 2.1');
    expect(parsedRoot.getChildren()[1].getChildren()[1].getName()).toBe('child 2.2');
    expect(parsedRoot.getChildren()[2].getChildren().length).toBe(2);
    expect(parsedRoot.getChildren()[2].getChildren()[0].getName()).toBe('child 3.1');
    expect(parsedRoot.getChildren()[2].getChildren()[1].getName()).toBe('child 3.2');
  });
});
