import type { FC } from 'react';

interface SimpleCity {
  name: string;
}

interface OtherCountriesProps {
  cities: SimpleCity[];
  onCitySelect: (cityName: string) => void; 
}

const OtherCountries: FC<OtherCountriesProps> = ({ cities, onCitySelect }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold">Other Major Cities</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cities.map((city) => (
          <button
            key={city.name} 
            onClick={() => onCitySelect(city.name)}
            className="bg-gray-800 p-4 rounded-xl flex items-center justify-center
                       border border-gray-700 hover:border-blue-500 hover:bg-gray-700
                       transition-all duration-300 cursor-pointer text-center"
          >
            <p className="font-semibold text-xl text-blue-300">{city.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OtherCountries;