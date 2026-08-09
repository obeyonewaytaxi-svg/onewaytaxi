import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';

const CancellationPolicyPage = () => (
  <>
    <Seo
      title="Cancellation Policy | Obey One Way Taxi"
      description="Read Obey One Way Taxi's cancellation policy for one way taxi and outstation cab bookings — free cancellation, refunds and changes."
      path="/cancellation-policy"
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Cancellation Policy', path: '/cancellation-policy' }])}
    />

    <PageHeader
      eyebrow="Legal"
      title="Cancellation Policy"
      description="Last updated: January 2026"
      breadcrumbs={[{ name: 'Cancellation Policy', path: '#' }]}
    />

    <Container className="py-12">
      <article className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-slate-600">
        <div>
          <h2 className="text-base font-bold text-slate-900">1. Free cancellation</h2>
          <p className="mt-2">
            You may cancel any booking free of charge up to 24 hours before the scheduled pickup time. Notify us by
            phone or WhatsApp with your booking reference to cancel.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">2. Late cancellation (within 24 hours)</h2>
          <p className="mt-2">
            Cancellations made within 24 hours of the scheduled pickup may attract a cancellation fee of up to ₹500 or
            10% of the trip fare, whichever is lower, to cover vehicle allocation costs.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">3. No-show</h2>
          <p className="mt-2">
            If the passenger is not available at the pickup point 30 minutes after the scheduled time and cannot be
            reached, the trip may be treated as a no-show and the full fare is chargeable.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">4. Cancellations by Obey Taxi</h2>
          <p className="mt-2">
            In rare cases where a vehicle is unavailable (breakdown, driver emergency), we will arrange an alternative
            vehicle or refund any advance paid in full. Refunds are processed within 5–7 working days to the original
            payment method.
          </p>
        </div>
      </article>
    </Container>
  </>
);

export default CancellationPolicyPage;
