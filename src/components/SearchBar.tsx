import type { FC } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  onSearch: (city: string) => void;
  currentCity: string;
}

const SearchBar: FC<Props> = ({ onSearch, currentCity }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [inputValue, setInputValue] = useState('');

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

  const triggerSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      triggerSearch();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mx-auto py-4">
      <div className="flex items-center text-lg md:text-xl font-semibold text-gray-200 order-1 md:order-1 flex-shrink-0">
        <MapPin size={20} className="mr-2 text-white" />
        <span className="truncate max-w-[120px] sm:max-w-none">{currentCity} </span>
      </div>

      <div className="flex items-stretch w-full max-w-sm md:max-w-md lg:max-w-lg order-2 md:order-2 px-0 sm:px-4 md:px-0">
        <div className="relative flex-grow">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for a new city..."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={true}
            className="flex-grow py-3 px-10 rounded-l-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md w-full"
          />
        </div>
        <button
          onClick={triggerSearch}
          className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md flex items-center justify-center transition-colors duration-200 flex-shrink-0"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center md:items-end text-center md:text-right order-3 md:order-3 flex-shrink-0">
        <p className="text-xl font-bold text-gray-200">{currentTime}</p>
        <p className="text-md text-gray-400">{currentDate}</p>
      </div>
    </div>
  );
};

export default SearchBar;