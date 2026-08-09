import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';

const PrivacyPolicyPage = () => (
  <>
    <Seo
      title="Privacy Policy | Obey One Way Taxi"
      description="Read the official Privacy Policy for Obey One Way Taxi. Learn how we collect, protect, and safely process your personal booking information and data."
      path="/privacy-policy"
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }])}
    />

    <PageHeader
      eyebrow="Legal"
      title="Privacy Policy"
      description="Last updated: January 2026"
      breadcrumbs={[{ name: 'Privacy Policy', path: '#' }]}
    />

    <Container className="py-12">
      <article className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-slate-600">
        <div>
          <h2 className="text-base font-bold text-slate-900">1. Information we collect</h2>
          <p className="mt-2">
            When you book a taxi, we collect your name, phone number, pickup and drop locations, trip date and time, and
            vehicle preference. If you contact us by WhatsApp or email, we retain that correspondence to serve your
            booking.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">2. How we use your information</h2>
          <p className="mt-2">
            Your details are used solely to confirm bookings, dispatch vehicles, calculate fares and provide customer
            support. We may send service messages about your confirmed trip (driver details, vehicle number, delay
            updates).
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">3. Sharing of information</h2>
          <p className="mt-2">
            We never sell your personal data. Trip-relevant details (pickup, drop, date, passenger count) are shared only
            with your assigned driver to complete the trip. We may share data with authorities where required by law.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">4. Data retention</h2>
          <p className="mt-2">
            Booking records are retained for up to 24 months for service and billing purposes, after which they are
            securely deleted or anonymised.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">5. Your rights</h2>
          <p className="mt-2">
            You may request a copy, correction or deletion of your personal data at any time by contacting us at
            bookings@obeyonewaytaxi.com or calling +918667219259.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">6. Contact</h2>
          <p className="mt-2">
            Questions about this policy? Reach us at bookings@obeyonewaytaxi.com. We review this policy periodically and post
            any updates on this page.
          </p>
        </div>
      </article>
    </Container>
  </>
);

export default PrivacyPolicyPage;
