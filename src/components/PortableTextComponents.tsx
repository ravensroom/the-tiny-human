import { PortableTextComponent } from '@portabletext/react';

interface PortableTextReactComponents {
  [key: string]: PortableTextComponent<any>;
};

const PortableTextComponents: PortableTextReactComponents = {
  h1: ({ children }) => <h1 className="mb-4 text-4xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-3 text-3xl font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 text-2xl font-bold">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 text-xl font-bold">{children}</h4>,
  h5: ({ children }) => <h5 className="mb-1 text-lg font-bold">{children}</h5>,
  h6: ({ children }) => (
    <h6 className="mb-1 text-base font-bold">{children}</h6>
  ),
  p: ({ children }) => <p className="mb-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 list-inside list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-inside list-decimal">{children}</ol>
  ),
  li: ({ children }) => <li className="ml-4">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-4 border-gray-400 pl-4 italic">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
};

export default PortableTextComponents;
