import React from 'react';
import {
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  html?: string;
  style?: StyleProp<ViewStyle>;
  baseTextStyle?: StyleProp<TextStyle>;
}

interface AstNode {
  type: 'text' | 'tag';
  name?: string;
  attrs?: Record<string, string>;
  children?: AstNode[];
  text?: string;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '–')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

function parseAttributes(rawAttrs: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRegex = /([a-zA-Z0-9_-]+)(?:=["']([^"']*)["'])?/g;
  let match;
  while ((match = attrRegex.exec(rawAttrs)) !== null) {
    attrs[match[1].toLowerCase()] = match[2] ?? 'true';
  }
  return attrs;
}

function parseHtmlToAst(html: string): AstNode[] {
  const root: AstNode = { type: 'tag', name: 'root', children: [] };
  const stack: AstNode[] = [root];

  // Regex to match tags: opening, closing, or self-closing
  const tagRegex = /<(\/)?([a-zA-Z0-9]+)([^>]*)>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(html)) !== null) {
    const textBefore = html.substring(lastIndex, match.index);
    if (textBefore) {
      const decoded = decodeHtmlEntities(textBefore);
      if (decoded) {
        stack[stack.length - 1].children?.push({
          type: 'text',
          text: decoded,
        });
      }
    }

    lastIndex = tagRegex.lastIndex;

    const isClosing = Boolean(match[1]);
    const tagName = match[2].toLowerCase();
    const rawAttrs = match[3] ?? '';

    if (isClosing) {
      // Pop stack until matching tag
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].name === tagName) {
          stack.length = i;
          break;
        }
      }
    } else {
      const isSelfClosing =
        rawAttrs.trim().endsWith('/') ||
        ['br', 'hr', 'img', 'input', 'meta'].includes(tagName);

      const node: AstNode = {
        type: 'tag',
        name: tagName,
        attrs: parseAttributes(rawAttrs),
        children: isSelfClosing ? undefined : [],
      };

      stack[stack.length - 1].children?.push(node);

      if (!isSelfClosing) {
        stack.push(node);
      }
    }
  }

  const remainingText = html.substring(lastIndex);
  if (remainingText) {
    const decoded = decodeHtmlEntities(remainingText);
    if (decoded) {
      stack[stack.length - 1].children?.push({
        type: 'text',
        text: decoded,
      });
    }
  }

  return root.children ?? [];
}

const BLOCK_TAGS = new Set([
  'p',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'blockquote',
  'pre',
  'section',
  'article',
]);

export default function HtmlView({ html, style, baseTextStyle }: Props) {
  if (!html || !html.trim()) {
    return null;
  }

  // Pre-clean pre/code formatting wrappers from CMS editors if present
  const sanitizedHtml = html
    .replace(/<pre><code[^>]*>/gi, '')
    .replace(/<\/code><\/pre>/gi, '');

  const ast = parseHtmlToAst(sanitizedHtml);

  const renderInline = (node: AstNode, key: string | number, inheritedStyle: TextStyle = {}): React.ReactNode => {
    if (node.type === 'text') {
      return (
        <Text key={key} style={inheritedStyle}>
          {node.text}
        </Text>
      );
    }

    const tagName = node.name ?? '';
    let currentStyle: TextStyle = { ...inheritedStyle };

    if (tagName === 'strong' || tagName === 'b') {
      currentStyle.fontWeight = 'bold';
    } else if (tagName === 'em' || tagName === 'i') {
      currentStyle.fontStyle = 'italic';
    } else if (tagName === 'u') {
      currentStyle.textDecorationLine = 'underline';
    } else if (tagName === 's' || tagName === 'strike' || tagName === 'del') {
      currentStyle.textDecorationLine = 'line-through';
    } else if (tagName === 'br') {
      return <Text key={key}>{'\n'}</Text>;
    } else if (tagName === 'a') {
      currentStyle.color = '#f59e0b';
      currentStyle.textDecorationLine = 'underline';
      const href = node.attrs?.href;
      return (
        <Text
          key={key}
          style={currentStyle}
          onPress={() => {
            if (href) {
              Linking.openURL(href).catch((err) =>
                console.warn('Cannot open url:', err)
              );
            }
          }}
        >
          {node.children?.map((child, idx) => renderInline(child, `${key}-${idx}`, currentStyle))}
        </Text>
      );
    }

    return (
      <Text key={key} style={currentStyle}>
        {node.children?.map((child, idx) => renderInline(child, `${key}-${idx}`, currentStyle))}
      </Text>
    );
  };

  const renderBlockNode = (node: AstNode, index: number): React.ReactNode => {
    if (node.type === 'text') {
      const trimmed = node.text?.trim();
      if (!trimmed) return null;
      return (
        <Text key={index} style={[styles.defaultText, baseTextStyle]}>
          {node.text}
        </Text>
      );
    }

    const tagName = node.name ?? '';

    if (tagName === 'br') {
      return <View key={index} style={{ height: 8 }} />;
    }

    if (tagName === 'hr') {
      return (
        <View
          key={index}
          style={{ height: 1, backgroundColor: '#e5e7eb', marginVertical: 12 }}
        />
      );
    }

    if (tagName === 'h1') {
      return (
        <Text key={index} style={[styles.h1, baseTextStyle]}>
          {node.children?.map((child, idx) => renderInline(child, idx))}
        </Text>
      );
    }

    if (tagName === 'h2') {
      return (
        <Text key={index} style={[styles.h2, baseTextStyle]}>
          {node.children?.map((child, idx) => renderInline(child, idx))}
        </Text>
      );
    }

    if (tagName === 'h3') {
      return (
        <Text key={index} style={[styles.h3, baseTextStyle]}>
          {node.children?.map((child, idx) => renderInline(child, idx))}
        </Text>
      );
    }

    if (tagName === 'li') {
      return (
        <View key={index} style={styles.liContainer}>
          <Text style={[styles.bullet, baseTextStyle]}>• </Text>
          <Text style={[styles.defaultText, baseTextStyle, { flex: 1 }]}>
            {node.children?.map((child, idx) => renderInline(child, idx))}
          </Text>
        </View>
      );
    }

    if (tagName === 'ul' || tagName === 'ol') {
      return (
        <View key={index} style={styles.listContainer}>
          {node.children?.map((child, idx) => renderBlockNode(child, idx))}
        </View>
      );
    }

    // Default block paragraph / div
    const children = node.children ?? [];

    if (children.length === 0) {
      return null;
    }

    if (
      children.length === 1 &&
      children[0].type === 'text' &&
      !children[0].text?.trim()
    ) {
      return null;
    }

    // Check if children contain any block tags
    const hasBlockChildren = children.some(
      (c) => c.type === 'tag' && BLOCK_TAGS.has(c.name ?? '')
    );

    if (hasBlockChildren) {
      return (
        <View key={index} style={styles.blockMargin}>
          {children.map((child, idx) => renderBlockNode(child, idx))}
        </View>
      );
    }

    return (
      <Text key={index} style={[styles.paragraph, baseTextStyle]}>
        {children.map((child, idx) => renderInline(child, idx))}
      </Text>
    );
  };

  return (
    <View style={style}>
      {ast.map((node, index) => renderBlockNode(node, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#1f2937',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 23,
    color: '#1f2937',
    marginBottom: 12,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 10,
    marginBottom: 6,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  listContainer: {
    marginVertical: 6,
    paddingLeft: 4,
  },
  liContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4b5563',
    marginRight: 6,
  },
  blockMargin: {
    marginBottom: 8,
  },
});
