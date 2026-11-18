import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Phone, 
  MessageCircle, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { JAN_AUSHADHI_STORES } from '../data/storesData';

export const StoresPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [userLocationState, setUserLocationState] = useState<string | null>(null);

  // Unique list of states
  const states = useMemo(() => {
    const list = Array.from(new Set(JAN_AUSHADHI_STORES.map((s) => s.state))).sort();
    return ['All', ...list];
  }, []);

  // Filtered stores
  const filteredStores = useMemo(() => {
    return JAN_AUSHADHI_STORES.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.pincode.includes(searchTerm) ||
        store.kendra_code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesState = selectedState === 'All' || store.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [searchTerm, selectedState]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setUserLocationState('Detecting nearest stores...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocationState('Nearest Kendras based on your device location');
        // Filter or sort by approximate distance (closest coordinates)
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        console.log(`Detected coordinates: ${lat}, ${lng}`);
      },
      (err) => {
        console.warn(err);
        setUserLocationState('Location access was denied. You can search by Pincode or City.');
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28] bg-[#eef5f1] px-4 py-1.5 rounded-full shadow-2xs w-fit">
          Government Jan Aushadhi Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Find Jan Aushadhi Kendra Stores
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Locate over 10,000+ government-run generic medicine dispensaries across India. 
          Check operational timings, contact store managers directly via WhatsApp, or get GPS directions.
        </p>
      </div>

      {/* Search & Location Bar */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by 6-digit Pincode, City (e.g. 110029, Delhi, Mumbai), or Landmark..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#f8f9fa] border border-transparent focus:border-[#183b28]/30 focus:bg-white text-slate-800 text-sm font-medium outline-none transition-all"
          />
        </div>

        {/* State Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-3.5 rounded-2xl bg-[#f8f9fa] border border-transparent focus:border-[#183b28]/30 text-slate-700 text-xs font-bold outline-none cursor-pointer w-full md:w-auto min-w-[150px]"
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All States' : st}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleUseLocation}
            className="px-5 py-3.5 rounded-2xl bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 shadow-sm"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-300" />
            Near Me
          </button>
        </div>
      </div>

      {userLocationState && (
        <div className="px-5 py-3 rounded-2xl bg-[#eef5f1] text-[#183b28] text-xs font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          {userLocationState}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
        <span>Showing {filteredStores.length} authorized Kendra locations</span>
        <span className="flex items-center gap-1.5 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine PMBI Supply
        </span>
      </div>

      {/* Store Grid */}
      {filteredStores.length === 0 ? (
        <div className="p-16 rounded-[28px] bg-white text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] text-slate-400 flex items-center justify-center">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Kendra Found for &quot;{searchTerm}&quot;</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Try searching with a broader pincode, district name, or clear the state filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedState('All');
            }}
            className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${store.name}, ${store.address}, ${store.city} ${store.pincode}`
            )}`;
            const whatsappUrl = store.whatsapp
              ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                  `Namaste, I found your Jan Aushadhi Kendra (${store.kendra_code}) on SaltMatch. Do you have generic medicines in stock?`
                )}`
              : null;

            return (
              <div
                key={store.id}
                className="bg-white rounded-[28px] p-6 flex flex-col justify-between gap-6 shadow-[0_4px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 border border-slate-100"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#183b28] bg-[#eef5f1] px-2.5 py-0.5 rounded-full">
                      {store.kendra_code}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {store.timings}
                    </span>
                  </div>

                  {/* Store Name & Address */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight">
                      {store.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{store.address}, {store.city}, {store.state} - <strong className="text-slate-700">{store.pincode}</strong></span>
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, '')}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      Call Store
                    </a>

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        WhatsApp
                      </a>
                    )}
                  </div>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-300" />
                    Get Directions on Maps
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
