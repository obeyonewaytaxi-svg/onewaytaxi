import { Seo } from '../lib/seo';
import { reviewSchema, breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { ReviewGrid, RatingSummary } from '../components/shared/ReviewGrid';
import { ReviewsCta } from '../components/shared/ReviewsCta';
import { reviews } from '../data/siteData';

const ReviewsPage = () => (
  <>
    <Seo
      title="Drop Taxi Reviews & Ratings"
      description="Read reviews from travelers who booked drop taxis, one way cabs, airport transfers and outstation cab service with Obey One Way Taxi."
      path="/reviews"
      keywords={['drop taxi reviews', 'one way taxi', 'outstation cab service', 'airport drop taxi booking', '24/7 outstation taxi']}
      jsonLd={[reviewSchema(reviews), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }])]}
    />

    <PageHeader
      eyebrow="Customer Reviews"
      title="Rated 4.9/5 by trusted travelers"
      description="Passengers trust Obey Taxi for airport transfers and outstation trips because we combine comfortable vehicles, clear rates, and attentive support."
      breadcrumbs={[{ name: 'Reviews', path: '#' }]}
    >
      <div className="mt-6 max-w-md">
        <RatingSummary />
      </div>
    </PageHeader>

    <Container className="py-12">
      <ReviewGrid reviews={reviews} />
    </Container>

    <ReviewsCta />
  </>
);

export default ReviewsPage;
