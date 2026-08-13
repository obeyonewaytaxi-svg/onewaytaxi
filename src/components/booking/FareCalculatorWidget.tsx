import { useMemo, useState } from 'react';
import { ArrowRightLeft, MapPin, Phone } from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { calculateFare, tripTypeOptions, timeOptions } from '../../lib/booking';
import type { TripType } from '../../types';
import { cabs, routes } from '../../data/siteData';
import { Select, FieldLabel, Input } from '../ui/Input';
import { siteConfig, waLink } from '../../config/site';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const cityOptions = Array.from(new Set(routes.flatMap((route) => [route.origin, route.destination]))).sort();

function todayLocal(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

type FareCalculatorWidgetProps = {
  onBook?: (details: { pickup: string; drop: string; cabTitle: string; tripType: TripType }) => void;
};

export function FareCalculatorWidget({ onBook }: FareCalculatorWidgetProps) {
  const [pickup, setPickup] = useState('Chennai');
  const [drop, setDrop] = useState('Coimbatore');
  const [tripType, setTripType] = useState<TripType>('One Way');
  const [cabTitle, setCabTitle] = useState(cabs[0].title);
  const [date, setDate] = useState(todayLocal());
  const [time, setTime] = useState('10:00 AM');
  const [passengers, setPassengers] = useState('1');

  const result = useMemo(() => calculateFare({ pickup, drop, cabTitle, tripType, time }), [pickup, drop, cabTitle, tripType, time]);

  const cab = cabs.find((item) => item.title === cabTitle) ?? cabs[0];

  const routeInfo = useMemo(() => {
    return routes.find(
      (r) =>
        (r.origin.toLowerCase() === pickup.toLowerCase() && r.destination.toLowerCase() === drop.toLowerCase()) ||
        (r.origin.toLowerCase() === drop.toLowerCase() && r.destination.toLowerCase() === pickup.toLowerCase())
    );
  }, [pickup, drop]);

  const duration = routeInfo?.durationHours ?? 'Calculated on booking';

  const swap = () => {
    setPickup(drop);
    setDrop(pickup);
  };

  const handleWhatsAppBooking = () => {
    const text = `Hi Obey One Way Taxi, I want to book a taxi.
Pickup: ${pickup}
Drop: ${drop}
Date: ${date}
Time: ${time}
Passengers: ${passengers}
Vehicle: ${cabTitle} (${cab.model})
Trip Type: ${tripType}
Estimated Distance: ${result.distanceKm} km
Estimated Total: ${formatINR(result.estimatedTotal)}`;
    window.open(waLink(text), '_blank');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-pickup">Pickup City</FieldLabel>
            <Select id="calc-pickup" value={pickup} onChange={(e) => setPickup(e.target.value)}>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </div>
          <button
            type="button"
            onClick={swap}
            className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:rotate-180 hover:border-brand-secondary hover:text-brand-secondary"
            aria-label="Swap cities"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-drop">Drop City</FieldLabel>
            <Select id="calc-drop" value={drop} onChange={(e) => setDrop(e.target.value)}>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-trip-type">Trip Type</FieldLabel>
            <Select id="calc-trip-type" value={tripType} onChange={(e) => setTripType(e.target.value as TripType)}>
              {tripTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-cab-type">Cab Type</FieldLabel>
            <Select id="calc-cab-type" value={cabTitle} onChange={(e) => setCabTitle(e.target.value)}>
              {cabs.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title} — ₹{tripType === 'Round Trip' ? item.roundTripRate : item.rate}/km
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-date">Travel Date</FieldLabel>
            <Input id="calc-date" type="date" min={todayLocal()} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-time">Pickup Time</FieldLabel>
            <Select id="calc-time" value={time} onChange={(e) => setTime(e.target.value)}>
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="calc-passengers">Passengers</FieldLabel>
            <Select id="calc-passengers" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {pickup.toLowerCase() === drop.toLowerCase() && (
          <p className="mt-3 text-xs font-bold text-red-600">Pickup and drop must be different cities.</p>
        )}

        {parseInt(passengers, 10) > 4 && cabTitle === 'SEDAN' && (
          <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2 text-xs font-bold text-amber-800">
            ⚠️ Sedan is suitable for up to 4 passengers. Please select SUV or Innova for comfort.
          </p>
        )}
      </div>

      <div className="flex flex-col rounded-2xl border border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/5 to-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary-text">Live Fare Breakdown</p>

        {result.found ? (
          <div className="mt-4 flex-1 space-y-4">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
              <h3 className="text-3xl font-black text-slate-900">{formatINR(result.estimatedTotal)}</h3>
              <p className="text-xs font-bold text-slate-500">Estimated Total</p>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Route Distance:</span>
                <span className="font-semibold text-slate-900">{result.distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="font-semibold text-slate-900">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="font-semibold text-slate-900">{cab.title} ({cab.model})</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2">
                <span>Base Fare (Driver Bata & Booking):</span>
                <span className="font-numbers font-semibold text-slate-900">{formatINR(result.baseFare)}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Fare ({result.billedDistance} km × {formatINR(result.rate)}/km):</span>
                <span className="font-numbers font-semibold text-slate-900">{formatINR(result.distanceFare)}</span>
              </div>

              {result.hillCharge > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Hill Station Driver Bata:</span>
                  <span className="font-numbers font-semibold">{formatINR(result.hillCharge)}</span>
                </div>
              )}

              {result.nightCharge > 0 && (
                <div className="flex justify-between text-indigo-700">
                  <span>Driver Night Charge (11 PM - 6 AM):</span>
                  <span className="font-numbers font-semibold">{formatINR(result.nightCharge)}</span>
                </div>
              )}

              {result.minimumApplied && (
                <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-1.5 text-[11px] font-semibold text-yellow-800">
                  Billed for minimum distance ({result.billedDistance} km)
                </div>
              )}

              <div className="flex justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
                <span>GST (5% if invoice required):</span>
                <span className="font-numbers">{formatINR(result.gst)}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-500 space-y-1">
              <p className="font-bold text-slate-700">⚠️ Pricing Exclusions:</p>
              <p>• Tolls, parking, and state permit fees are charged at actuals and payable during the trip.</p>
              <p>• The estimated total above excludes tolls, parking, and GST.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                disabled={pickup.toLowerCase() === drop.toLowerCase()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#20ba59]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Book
              </button>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                Call Agent
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-start gap-3 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
            <p>We could not find a direct route for this pair. Try calling us or checking via WhatsApp for a custom estimate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
