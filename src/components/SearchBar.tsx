import type { FC } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getCitySuggestions } from '../api/weather'; 

interface Props {
  onSearch: (city: string) => void;
  currentCity: string;
}

interface Suggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const SearchBar: FC<Props> = ({ onSearch, currentCity }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }));
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.trim().length > 0) {
        setIsLoading(true);
        try {
          const data = await getCitySuggestions(inputValue);
          setSuggestions(data);
          setShowDropdown(true);
        } catch (error) {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (city: Suggestion) => {
    const query = `${city.name}, ${city.country}`;
    onSearch(query);
    setInputValue('');
    setShowDropdown(false);
  };

  const triggerSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim().toLowerCase());
      setInputValue('');
      setShowDropdown(false);
    }
  };

  const clearInput = () => {
    setInputValue('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full mx-auto py-6 relative">
      <div className="flex items-center space-x-3 order-1">
        <div>
          <MapPin size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-none">{currentCity}</h2>
        </div>
      </div>

      <div className="flex items-stretch w-full max-w-lg order-2 relative group" ref={dropdownRef}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-white transition-colors" />
          )}
        </div>
          
        <input
          type="text"
          placeholder="Search city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
          className="w-full py-3.5 pl-12 pr-12 rounded-l-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 text-white placeholder-gray-500 outline-none transition-all shadow-2xl"
        />

        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-gray-900/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-[100] overflow-hidden">
            <div className="flex px-5 py-2.5 border-b border-gray-800/50 justify-between items-center bg-gray-800/20">
              <span className="text-sm font-bold text-gray-500 tracking-normal">Suggestions</span>

              <button 
                onClick={clearInput}
                className=" p-1.5 hover:bg-gray-700/50 rounded-full text-gray-400 hover:text-white transition-all active:scale-90"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[320px] overflow-y-auto">
              {suggestions.map((city, idx) => (
                <button
                  key={`${city.lat}-${idx}`}
                  onClick={() => handleSelectSuggestion(city)}
                  className="w-full text-left px-5 py-4 hover:bg-blue-600/10 flex items-center justify-between group/item transition-colors border-b border-gray-800/30 "
                >
                  <div className="flex flex-col">
                    <span className="text-white font-semibold group-hover/item:text-blue-400 transition-colors">{city.name}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{city.state ? `${city.state}, ` : ''}{city.country}</span>
                  </div>
                  <MapPin size={16} className="text-gray-600 group-hover/item:text-blue-500 transition-all transform group-hover/item:scale-110" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={triggerSearch}
          className="px-6 bg-blue-500 hover:bg-blue-700 text-white rounded-r-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center border-y border-r border-blue-500/20"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="hidden lg:flex flex-col items-center md:items-end order-3 md:order-3 min-w-[120px]">
        <p className="text-2xl font-black text-white tracking-tight">{currentTime} <span className='text-xs'>(IST)</span></p>
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{currentDate}</p>
      </div>
    </div>
  );
};

export default SearchBar;