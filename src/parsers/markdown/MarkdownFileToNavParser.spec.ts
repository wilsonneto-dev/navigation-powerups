import NavigationNode from "../../model/NavigationNode";
import MarkdownFileToNavParser from "./MarkdownFileToNavParser";

const exampleMarkdown = `
# Title 1
## Subtitle 1.1
## Subtitle 1.2

# Title 2
## Subtitle 2.1
### Subsection 2.1.1
## Subtitle 2.2

# Title 3
## Subtitle 3.1
`;

describe('MarkdownFileToNavParser', () => {
  let parsedRoot: NavigationNode;

  beforeAll(() => {
    const markdownParser = new MarkdownFileToNavParser();
    parsedRoot = markdownParser.parse(exampleMarkdown);
    console.log(parsedRoot);
  });

  test('should parse the top-level titles properly', () => {
    expect(parsedRoot.getChildren().length).toBe(3);
    expect(parsedRoot.getChildren()[0].getName()).toBe('Title 1');
    expect(parsedRoot.getChildren()[1].getName()).toBe('Title 2');
    expect(parsedRoot.getChildren()[2].getName()).toBe('Title 3');
  });

  test('should parse the subtitles properly', () => {
    const title1 = parsedRoot.getChildren()[0];
    expect(title1.getChildren().length).toBe(2);
    expect(title1.getChildren()[0].getName()).toBe('Subtitle 1.1');
    expect(title1.getChildren()[1].getName()).toBe('Subtitle 1.2');

    const title2 = parsedRoot.getChildren()[1];
    expect(title2.getChildren().length).toBe(2);
    expect(title2.getChildren()[0].getName()).toBe('Subtitle 2.1');
    expect(title2.getChildren()[0].getChildren().length).toBe(1); // Subsection under Subtitle 2.1
    expect(title2.getChildren()[0].getChildren()[0].getName()).toBe('Subsection 2.1.1');
    expect(title2.getChildren()[1].getName()).toBe('Subtitle 2.2');
  });
});
