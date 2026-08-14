import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function renderInline(text: string) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      nodes.push(<Fragment key={i}>{parts[i]}</Fragment>);
    } else if (i % 3 === 1) {
      const label = parts[i];
      const path = parts[i + 1];
      i += 1;
      nodes.push(
        /^https?:\/\//.test(path) ? (
          <a key={i} href={path} target="_blank" rel="noreferrer" className="font-semibold text-brand-secondary-text underline underline-offset-2">
            {label}
          </a>
        ) : (
          <Link key={i} to={path} className="font-semibold text-brand-secondary-text underline underline-offset-2">
            {label}
          </Link>
        ),
      );
    }
  }
  return nodes;
}

export function BlogContent({ content }: { content: string[] }) {
  return (
    <div className="mt-8 space-y-6">
      {content.map((block, index) =>
        block.startsWith('## ') ? (
          <h2 key={index} className="pt-2 font-heading text-xl font-bold text-slate-900">
            {block.slice(3)}
          </h2>
        ) : (
          <p key={index} className="text-base leading-8 text-slate-600">
            {renderInline(block)}
          </p>
        ),
      )}
    </div>
  );
}
