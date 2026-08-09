import { CheckCircle2, XCircle } from 'lucide-react';

const doItems = [
  'Book your ride with clear pickup and drop locations.',
  'Choose the right car type for your passenger count and luggage.',
  'Confirm your date and time before sending the booking request.',
  'Use the WhatsApp booking flow for faster confirmation.',
];

const dontItems = [
  'Do not wait until the last minute for airport or long-distance rides.',
  'Avoid vague pickup details that can delay your driver.',
  'Do not select a cab without checking the capacity and pricing.',
  'Avoid multiple route changes after confirmation unless necessary.',
];

const DoDontSection = () => (
  <section id="guidelines" className="mx-auto max-w-7xl px-5 py-section md:px-8">
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Do</p>
        </div>
        <h2 className="mt-3 font-heading text-display-xs text-slate-900">What to do before booking</h2>
        <ul className="mt-5 space-y-2.5">
          {doItems.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
            <XCircle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-red-700">Don't</p>
        </div>
        <h2 className="mt-3 font-heading text-display-xs text-slate-900">What to avoid when booking</h2>
        <ul className="mt-5 space-y-2.5">
          {dontItems.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/50 p-3.5 text-sm text-slate-600">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default DoDontSection;
