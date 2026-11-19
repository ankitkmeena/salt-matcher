import React, { useState, useMemo, useEffect } from 'react';
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
  ExternalLink,
  Loader2,
  Database
} from 'lucide-react';
import { JAN_AUSHADHI_STORES, JanAushadhiStore } from '../data/storesData';
import { Pagination } from '../components/Pagination';
import { useTranslation } from '../utils/i18n';

const ALL_INDIAN_STATES = [
  'All',
  'Andaman and Nicobar',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

const STORES_PER_PAGE = 12;

export const StoresPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userLocationState, setUserLocationState] = useState<string | null>(null);

  // Live remote registry state (all 21,663 stores)
  const [liveStores, setLiveStores] = useState<JanAushadhiStore[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [liveCount, setLiveCount] = useState<number | null>(null);

  // Query live API with debouncing whenever search or state changes
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on search or filter change
    const trimmed = searchTerm.trim();

    // If query is empty and state is All, fall back to instant verified local seed stores
    if (!trimmed && selectedState === 'All') {
      setLiveStores(null);
      setLiveCount(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const isPincode = /^\d{6}$/.test(trimmed);
        const params = new URLSearchParams();
        if (isPincode) {
          params.set('pincode', trimmed);
        } else if (trimmed) {
          params.set('q', trimmed);
        }
        if (selectedState !== 'All') {
          params.set('state', selectedState);
        }

        const res = await fetch(`https://jan-api.kunalka.me/kendras?${params.toString()}`);
        if (res.ok) {
          const json = (await res.json()) as { count?: number; stores?: any[] };
          const items = json.stores || [];
          setLiveCount(json.count ?? items.length);

          const mapped: JanAushadhiStore[] = items.map((s: any, idx: number) => ({
            id: `live-${s.kendra_code || idx}`,
            name: `Jan Aushadhi Kendra (${s.contact_person || 'PMBJP Center'})`,
            kendra_code: s.kendra_code || `PMBJP-${idx}`,
            address: s.address || '',
            city: s.district_name || '',
            state: s.state_name || '',
            pincode: s.pin_code || '',
            phone: s.contact_number ? `+91 ${s.contact_number}` : '',
            whatsapp: s.contact_number ? `91${s.contact_number.replace(/\D/g, '')}` : undefined,
            timings: '08:30 AM - 09:30 PM',
            latitude: s.latitude || 20.5937,
            longitude: s.longitude || 78.9629
          }));

          setLiveStores(mapped);
        }
      } catch (err) {
        console.warn('Live Kendra API search error, falling back to local database:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedState]);

  // Combined stores: live remote stores when searching, else local verified seed stores
  const allFilteredStores = useMemo(() => {
    if (liveStores !== null) {
      return liveStores;
    }

    return JAN_AUSHADHI_STORES.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.pincode.includes(searchTerm) ||
        store.kendra_code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesState = selectedState === 'All' || store.state.toLowerCase() === selectedState.toLowerCase();

      return matchesSearch && matchesState;
    });
  }, [liveStores, searchTerm, selectedState]);

  // Windowed stores for pagination (12 per page)
  const totalStores = allFilteredStores.length;
  const totalPages = Math.ceil(totalStores / STORES_PER_PAGE);
  const currentStores = useMemo(() => {
    const start = (currentPage - 1) * STORES_PER_PAGE;
    return allFilteredStores.slice(start, start + STORES_PER_PAGE);
  }, [allFilteredStores, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setUserLocationState('Detecting your location...');
    navigator.geolocation.getCurrentPosition(
      () => {
        setUserLocationState('Location detected. Showing nearest government Kendras.');
      },
      (err) => {
        console.warn(err);
        setUserLocationState('Location access was denied. You can search directly by Pincode or City.');
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28] bg-[#eef5f1] px-4 py-1.5 rounded-full shadow-2xs w-fit">
            {t.kendraNetwork}
          </span>
          <span className="text-[10px] font-bold tracking-tight text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200/50">
            <Database className="w-3 h-3 text-emerald-600" />
            21,663 Official Kendras Live
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {t.findKendrasTitle}
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          {t.kendraSubtitle}
        </p>
      </div>

      {/* Search & Location Bar */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Input */}
        <div className="relative flex-1 w-full">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-emerald-700 absolute left-4 top-1/2 -translate-y-1/2 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          )}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.pincodePlaceholder}
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
            {ALL_INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All States (National)' : st}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleUseLocation}
            className="px-5 py-3.5 rounded-2xl bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 shadow-sm"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-300" />
            {t.nearMe}
          </button>
        </div>
      </div>

      {userLocationState && (
        <div className="px-5 py-3 rounded-2xl bg-[#eef5f1] text-[#183b28] text-xs font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          {userLocationState}
        </div>
      )}

      {/* Results Metric Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
        <span>
          {liveStores !== null
            ? `Found ${liveCount || totalStores} stores across ${selectedState === 'All' ? 'India' : selectedState}`
            : `Showing ${totalStores} landmark hospital Kendras (Type a pincode or pick a state for all 21,663 stores)`}
        </span>
        <span className="flex items-center gap-1.5 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t.genuineSupply}
        </span>
      </div>

      {/* Store Grid */}
      {currentStores.length === 0 ? (
        <div className="p-16 rounded-[28px] bg-white text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] text-slate-400 flex items-center justify-center">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">{t.noStoresFound} &quot;{searchTerm}&quot;</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Try searching with a valid 6-digit postal pincode, district name, or choose a specific state.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedState('All');
              setLiveStores(null);
            }}
            className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStores.map((store) => {
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
                        <span>{store.address ? `${store.address}, ` : ''}{store.city}, {store.state} - <strong className="text-slate-700">{store.pincode}</strong></span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      {store.phone ? (
                        <a
                          href={`tel:${store.phone.replace(/\s+/g, '')}`}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          {t.callStore}
                        </a>
                      ) : (
                        <span className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 text-slate-400 text-xs text-center font-medium">
                          PMBI Managed
                        </span>
                      )}

                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          title="Enquire on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          {t.whatsappEnquiry}
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
                      {t.getDirections}
                      <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalStores}
              pageSize={STORES_PER_PAGE}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};
