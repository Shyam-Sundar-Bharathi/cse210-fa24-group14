import { parseMarkdown } from '../../src/js/utils';

describe('Util ParseMarkdown', () => {
  test('should not parse empty string', () => {
    const parseMarkdownOut = parseMarkdown('');

    expect(parseMarkdownOut).toBe('');
  });

  test('should parse header 1', () => {
    const input = '# Header 1';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<h1>Header 1</h1><br />');
  });
  test('should parse header 1 br ', () => {
    const input = '# Header 1\n';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<h1>Header 1</h1><br />');
  });

  test('should parse header 2', () => {
    const input = '## Header 2';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<h2>Header 2</h2><br />');
  });

  test('should parse header 6', () => {
    const input = '###### Header 6';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<h6>Header 6</h6><br />');
  });

  test('should parse bold text', () => {
    const input = '**bold**';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<strong>bold</strong>');
  });

  test('should parse italic text', () => {
    const input = '*italic*';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<em>italic</em>');
  });

  test('should parse strikethrough text', () => {
    const input = '~~strikethrough~~';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<del>strikethrough</del>');
  });

  test('should parse inline code', () => {
    const input = '`code`';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<code>code</code>');
  });

  test('should parse line breaks', () => {
    const input = 'line 1\nline 2';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('line 1<br />line 2');
  });

  test('should parse links', () => {
    const input = 'https://example.com';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>',
    );
  });

  test('should parse email addresses', () => {
    const input = 'test@example.com';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe(
      '<a href="mailto:test@example.com">test@example.com</a>',
    );
  });

  test('should parse header 1', () => {
    const input = '# Header 1\n\n\n';
    const parseMarkdownOut = parseMarkdown(input);
    expect(parseMarkdownOut).toBe('<h1>Header 1</h1><br /><br /><br />');
  });

  test('should parse a combination of markdown features', () => {
    const input = `# Header 1

## Header 2
###### Header 6
**bold**
*italic*
~~strikethrough~~
\`code\`
https://example.com
test@example.com`;

    const parseMarkdownOut = parseMarkdown(input);

    // Expected output
    expect(parseMarkdownOut).toBe(
      `<h1>Header 1</h1><br /><br /><h2>Header 2</h2><br /><h6>Header 6</h6><br /><strong>bold</strong><br /><em>italic</em><br /><del>strikethrough</del><br /><code>code</code><br /><a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a><br /><a href="mailto:test@example.com">test@example.com</a>`,
    );
  });
});
