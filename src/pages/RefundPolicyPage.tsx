import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';

const RefundPolicyPage = () => (
  <>
    <Seo
      title="Refund Policy | Obey One Way Taxi"
      description="Understand the refund policy for one-way taxi & drop cab bookings with Obey One Way Taxi. Learn about processing timelines, eligibility, and terms."
      path="/refund-policy"
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Refund Policy', path: '/refund-policy' }])}
    />

    <PageHeader
      eyebrow="Legal"
      title="Refund Policy"
      description="Last updated: January 2026"
      breadcrumbs={[{ name: 'Refund Policy', path: '#' }]}
    />

    <Container className="py-12">
      <article className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-slate-600">
        <div>
          <h2 className="text-base font-bold text-slate-900">1. Eligible refunds</h2>
          <p className="mt-2">
            Refunds apply when a booking is cancelled as per our cancellation policy, or when Obey Taxi is unable to
            provide the confirmed vehicle and no alternative is accepted.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">2. Refund amount</h2>
          <p className="mt-2">
            Refunds are issued for the amount actually received, minus any applicable cancellation fees. No refund
            applies to trips already completed.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">3. Processing time</h2>
          <p className="mt-2">
            Approved refunds are processed within 5–7 working days to the original payment method. Bank processing may
            take a further 2–3 working days depending on your bank.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">4. How to request a refund</h2>
          <p className="mt-2">
            Contact our support team by phone or WhatsApp with your booking reference and payment details. Our team will
            confirm eligibility and initiate the refund within 24 hours of approval.
          </p>
        </div>
      </article>
    </Container>
  </>
);

export default RefundPolicyPage;
