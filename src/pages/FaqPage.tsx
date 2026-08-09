import { Seo } from '../lib/seo';
import { faqSchema, breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { Accordion } from '../components/ui/Accordion';
import { CtaBanner } from '../components/shared/CtaBanner';
import { faqs } from '../data/siteData';

const FaqPage = () => (
  <>
    <Seo
      title="One Way Taxi FAQ & No Return Fare"
      description="Answers to common questions about one way taxi booking, no return fare taxi, how to book a drop taxi, outstation cab service, tolls and payments."
      path="/faq"
      keywords={['one way taxi', 'drop taxi near me', 'no return fare taxi', 'outstation cab service', 'transparent fare outstation cab']}
      jsonLd={[faqSchema(faqs), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])]}
    />

    <PageHeader
      eyebrow="FAQ"
      title="Frequently asked questions"
      description="Clear answers for bookings, payments and ride expectations. Can't find what you need? Contact our 24/7 support team."
      breadcrumbs={[{ name: 'FAQ', path: '#' }]}
    />

    <Container className="py-12">
      <div className="mx-auto max-w-3xl">
        <Accordion items={faqs} />
      </div>
    </Container>

    <CtaBanner
      title="Still have questions?"
      description="Message us on WhatsApp or call our support team — we're available around the clock."
    />
  </>
);

export default FaqPage;
