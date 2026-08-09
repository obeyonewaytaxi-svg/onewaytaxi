import { useState } from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Seo } from '../lib/seo';
import { contactPageSchema, breadcrumbSchema } from '../lib/schema';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Input, Textarea, FieldLabel } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { ReviewsCta } from '../components/shared/ReviewsCta';
import { siteConfig, waLink } from '../config/site';

const contactChannels = [
  { icon: Phone, iconClass: 'text-brand-secondary', title: 'Call us', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}`, note: '24/7 booking & support' },
  { icon: WhatsAppIcon, iconClass: 'text-[#25D366]', title: 'WhatsApp', value: 'Message us anytime', href: waLink('I want to book a taxi'), note: 'Fastest response' },
  { icon: Mail, iconClass: 'text-brand-secondary', title: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, note: 'For detailed queries' },
  { icon: MapPin, iconClass: 'text-brand-secondary', title: 'Head office', value: 'Chennai, Tamil Nadu', href: 'https://maps.google.com/?q=Chennai%2C%20Tamil%20Nadu', note: 'Serving South India' },
];

const PHONE_PATTERN = /^(\+?91[\-\s]?)?[6-9]\d{9}$/;

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'message', string>>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Enter your name';
    if (!PHONE_PATTERN.test(form.phone.trim())) nextErrors.phone = 'Enter a valid Indian mobile number (e.g. 8667219259)';
    if (form.message.trim().length < 10) nextErrors.message = 'Please share your trip details (min 10 characters)';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = `New booking enquiry:\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nMessage: ${form.message.trim()}`;
    window.open(waLink(text), '_blank');
    setSent(true);
  };

  return (
    <>
      <Seo
        title="Contact: 24/7 Outstation Taxi Booking"
        description="Book a drop taxi or one way taxi 24/7 by call or WhatsApp. Outstation cab service and airport drop taxi booking across South India."
        path="/contact"
        keywords={['24/7 outstation taxi', 'airport drop taxi booking', 'drop taxi near me', 'one way taxi booking', 'outstation cab service']}
        jsonLd={[contactPageSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />

      <PageHeader
        eyebrow="Contact Us"
        title="Talk to us — we're here 24/7"
        description="Book a ride, request a quote or get travel advice. Our team responds within minutes on WhatsApp and phone."
        breadcrumbs={[{ name: 'Contact', path: '#' }]}
      />

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map(({ icon: Icon, iconClass, title, value, href, note }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-secondary/30 hover:shadow-card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10 transition group-hover:bg-brand-secondary/20">
                <Icon className={`h-5 w-5 ${iconClass}`} />
              </div>
              <h2 className="mt-4 text-sm font-bold text-slate-900">{title}</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{note}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-bold text-slate-900">Send a booking enquiry</h2>
            <p className="mt-2 text-sm text-brand-muted">
              Share your trip details and our team will confirm availability and the exact fare on WhatsApp.
            </p>
            {sent ? (
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-700">
                Thank you! Your enquiry is ready in WhatsApp — press send to complete it. Our team will reply shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="contact-name">Your name</FieldLabel>
                  <Input
                    id="contact-name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    aria-invalid={!!errors.name}
                    required
                  />
                  {errors.name && <p className="text-xs font-medium text-red-600">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="contact-phone">Phone / WhatsApp number</FieldLabel>
                  <Input
                    id="contact-phone"
                    placeholder="e.g. 8667219259"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    aria-invalid={!!errors.phone}
                    required
                  />
                  {errors.phone && <p className="text-xs font-medium text-red-600">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="contact-message">Trip details</FieldLabel>
                  <Textarea
                    id="contact-message"
                    placeholder="e.g. Chennai to Coimbatore, tomorrow 6 AM, 2 passengers"
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    aria-invalid={!!errors.message}
                    required
                  />
                  {errors.message && <p className="text-xs font-medium text-red-600">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Send via WhatsApp
                </Button>
              </form>
            )}
          </Card>

          <Card className="border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-white">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-secondary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary-text">Hours & location</p>
            </div>
            <ul className="mt-5 space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                Head office: Chennai, Tamil Nadu — booking for routes across Tamil Nadu, Karnataka and Pondicherry.
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                Booking desk open 24/7, including Sundays and public holidays. Airport transfers run round the clock.
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                Call {siteConfig.phone} for instant confirmation of fares and vehicle availability.
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-slate-100 bg-white p-4 text-xs leading-relaxed text-brand-muted">
              Prefer to book online? Use the booking form on the home page or the WhatsApp button — both confirm your ride in under 10 minutes.
            </div>
          </Card>
        </div>
      </Container>

      <ReviewsCta />
    </>
  );
};

export default ContactPage;
