import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { blogPosts } from '../data/siteData';

const BlogPage = () => (
  <>
    <Seo
      title="One Way Taxi Tips & Travel Guides"
      description="Explore expert route guides, one-way taxi tips, outstation cab booking advice, and intercity travel guides across Tamil Nadu and South India."
      keywords={['one way taxi tips', 'outstation cab service', 'drop taxi', 'airport drop taxi booking', 'one way car rental']}
      path="/blog"
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])}
    />

    <PageHeader
      eyebrow="Blog"
      title="Travel guides & taxi tips"
      description="Route guides, booking advice and practical tips to make your intercity journeys smoother."
      breadcrumbs={[{ name: 'Blog', path: '#' }]}
    />

    <Container className="py-12">
      <div className="grid gap-5 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-secondary/30 hover:shadow-card-hover"
          >
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="rounded-lg bg-brand-secondary/10 px-2.5 py-1 font-semibold text-brand-secondary-text">{post.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-lg font-bold text-slate-900 group-hover:text-brand-secondary-text">{post.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary-text">
              Read article <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </Container>
  </>
);

export default BlogPage;
