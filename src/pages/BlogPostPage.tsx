import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { CtaBanner } from '../components/shared/CtaBanner';
import { findBlogBySlug, blogPosts } from '../data/siteData';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findBlogBySlug(slug) : null;

  if (!post) {
    return (
      <>
        <Seo title="Article Not Found" noindex />
        <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Article not found</p>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">This article is no longer available</h1>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </section>
      </>
    );
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: '#' },
        ]}
      >
        <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
        </div>
      </PageHeader>

      <Container className="py-12">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-brand-muted">{post.excerpt}</p>
          <div className="mt-8 space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mx-auto mt-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Keep reading</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:border-brand-secondary/30 hover:shadow-card-hover"
              >
                <p className="text-xs text-slate-500">{item.category}</p>
                <h3 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-brand-secondary-text">{item.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary-text">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <CtaBanner />
    </>
  );
};

export default BlogPostPage;
