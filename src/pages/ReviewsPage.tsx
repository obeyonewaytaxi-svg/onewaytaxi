import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
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
      // No reviewSchema here on purpose. The aggregateRating was removed from
      // localBusinessSchema for the same reason: publishing Review markup about your own
      // LocalBusiness from reviews you host yourself is self-serving and can't be
      // validated against a third-party source. The reviews are still shown to visitors;
      // they are just not asserted to Google as machine-readable ratings. The
      // authoritative rating lives on the Google Business Profile.
      jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }])]}
    />

    <PageHeader
      eyebrow="Customer Reviews"
      title="What our travellers say"
      description="Reviews republished from our public Google Business Profile, shown as written."
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
