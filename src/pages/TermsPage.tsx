import { Seo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';

const TermsPage = () => (
  <>
    <Seo
      title="Terms & Conditions | Obey One Way Taxi"
      description="Review the terms and conditions for booking one-way taxi & drop cab services with Obey One Way Taxi. Clear guidelines on fares, baggage, and travel."
      path="/terms"
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Terms & Conditions', path: '/terms' }])}
    />

    <PageHeader
      eyebrow="Legal"
      title="Terms & Conditions"
      description="Last updated: January 2026"
      breadcrumbs={[{ name: 'Terms & Conditions', path: '#' }]}
    />

    <Container className="py-12">
      <article className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-slate-600">
        <div>
          <h2 className="text-base font-bold text-slate-900">1. Booking confirmation</h2>
          <p className="mt-2">
            A booking is confirmed only after our team confirms vehicle availability and shares driver and vehicle
            details. Bookings made via WhatsApp or phone are subject to availability at the requested time.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">2. Fares & payments</h2>
          <p className="mt-2">
            Fares quoted are estimates based on distance, vehicle type and trip type. The final fare is based on the
            actual distance travelled, plus applicable tolls, state taxes and parking where relevant. Payment is due on
            trip completion unless a billing agreement exists in advance.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">3. Pickup time</h2>
          <p className="mt-2">
            Please be ready 10 minutes before the scheduled pickup. For airport pickups, we track flight arrival and
            adjust pickup time automatically with no extra charge for flight delays.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">4. Passenger responsibility</h2>
          <p className="mt-2">
            Passengers are responsible for their luggage. We recommend carrying valuables with you at all times. Obey
            One Way Taxi is not liable for items left behind in vehicles.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">5. Driver conduct</h2>
          <p className="mt-2">
            Our drivers are trained to be courteous and professional. If you are ever unsatisfied with a ride, report it
            within 48 hours to our support team and we will investigate and resolve the matter.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">6. Service changes</h2>
          <p className="mt-2">
            We may update routes, vehicles and fares from time to time. Current fare estimates are always shown at the
            time of booking and confirmed before your ride begins.
          </p>
        </div>
      </article>
    </Container>
  </>
);

export default TermsPage;
