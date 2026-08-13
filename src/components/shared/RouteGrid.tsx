import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import type { Route } from '../../types';
import { cn } from '../../lib/utils';

import { useState } from 'react';
import { calculateFare } from '../../lib/booking';
import { cabs } from '../../data/siteData';
import { waLink } from '../../config/site';

export function RouteCard({ route, className }: { route: Route; className?: string }) {
  const [selectedCab, setSelectedCab] = useState(cabs[0].title);
  
  const fareResult = calculateFare({
    pickup: route.origin,
    drop: route.destination,
    cabTitle: selectedCab,
    tripType: 'One Way',
  });

  const bookNowLink = waLink(
    `Hello Obey One Way Taxi,\n\nI would like to book a taxi for the popular route:\nPickup: ${route.origin}\nDrop: ${route.destination}\nCab: ${selectedCab}\nTrip Type: One Way\n\nPlease confirm availability.`
  );

  return (
    <div
      className={cn(
        'group flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#F5C518]/50 hover:shadow-[0_15px_40px_rgba(15,23,42,0.1)]',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Popular Route</p>
          <Link to={`/routes/${route.slug}`} className="mt-1 block text-lg font-black text-slate-900 hover:text-[#F5C518] transition-colors">
            {route.origin} → {route.destination}
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500">
            <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1", fareResult.minimumApplied ? "bg-yellow-100 text-yellow-800" : "bg-slate-100")}>
              <MapPin className={cn("h-3 w-3", fareResult.minimumApplied ? "text-yellow-600" : "text-[#F5C518]")} />
              {fareResult.billedDistance} km {fareResult.minimumApplied && <span className="text-[9px] font-bold uppercase">(Min)</span>}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
              <Clock className="h-3 w-3 text-[#F5C518]" />
              {route.durationHours}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cabs.slice(0, 4).map((cab) => (
            <button
              key={cab.title}
              onClick={() => setSelectedCab(cab.title)}
              className={cn(
                'flex-1 rounded-lg px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 sm:text-[11px]',
                selectedCab === cab.title
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {cab.title}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Est. Price</p>
            <p className="font-numbers text-2xl font-black text-slate-900">
              {fareResult.found ? `₹${fareResult.fare.toLocaleString('en-IN')}` : 'Contact Us'}
            </p>
          </div>
          <a
            href={bookNowLink}
            target="_blank"
            data-flow="route-card"
            rel="noreferrer"
            className="flex h-10 items-center gap-2 rounded-xl bg-[#F5C518] px-4 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20"
          >
            Book Now
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function RouteGrid({ routes, className }: { routes: Route[]; className?: string }) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {routes.map((route, index) => (
        <motion.div
          key={route.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04, duration: 0.45 }}
        >
          <RouteCard route={route} />
        </motion.div>
      ))}
    </div>
  );
}
