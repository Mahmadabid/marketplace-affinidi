import { CountryContext } from "@/utils/CountryContext";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useContext } from "react";

interface FilterSettingsProps {
    showSortSettings: boolean;
    filterSortOrder: string;
    setFilterSortOrder: Dispatch<SetStateAction<string>>;
    handleFilterOrder: () => void;
    setShowFilterSettings: Dispatch<SetStateAction<boolean>>;
    showFilterSettings: boolean;
    setFilterMinPrice: Dispatch<SetStateAction<string>>;
    setFilterMaxPrice: Dispatch<SetStateAction<string>>;
    filterMinPrice: string;
    filterMaxPrice: string;
}

const FilterSettings: React.FC<FilterSettingsProps> = ({ showSortSettings, filterSortOrder, setFilterSortOrder, handleFilterOrder, setShowFilterSettings, showFilterSettings, setFilterMinPrice, setFilterMaxPrice, filterMinPrice, filterMaxPrice }) => {

    const [country] = useContext(CountryContext);

    const handleFilters = () => {
        setFilterMaxPrice('');
        setFilterMinPrice('');
    }

    return (
        <div className="flex justify-between px-2 items-center border-b-gray-400 border-b-[1px] w-64">
            <div className="my-1">
                <FontAwesomeIcon onClick={handleFilterOrder} icon={faArrowDownShortWide} className={`text-xl hover:cursor-pointer  ${showSortSettings && 'text-slate-500'}`} />
                {showSortSettings && <select
                    className="rounded p-1 mx-1 border border-gray-300 focus:border-gray-300 focus:outline-none"
                    value={filterSortOrder}
                    onChange={(e) => setFilterSortOrder(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="name-asc">Name (Ascending)</option>
                    <option value="name-desc">Name (Descending)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>}
            </div>
            <svg onClick={() => setShowFilterSettings(prev => !prev)} width="30px" height="30px" className="hover:cursor-pointer" viewBox="0 0 24 24" fill={showFilterSettings ? '#64748b' : 'black'} xmlns="http://www.w3.org/2000/svg">
                <path d="M17.8258 5H6.17422C5.31987 5 4.85896 6.00212 5.41496 6.65079L9.75926 11.7191C9.91461 11.9004 10 12.1312 10 12.3699V17.382C10 17.7607 10.214 18.107 10.5528 18.2764L12.5528 19.2764C13.2177 19.6088 14 19.1253 14 18.382V12.3699C14 12.1312 14.0854 11.9004 14.2407 11.7191L18.585 6.65079C19.141 6.00212 18.6801 5 17.8258 5Z" stroke={showFilterSettings ? '#64748b' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {showFilterSettings &&
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 min-w-screen min-h-screen">
                    <div className="bg-white rounded border border-gray-500 mx-1">
                        <div className="flex justify-center items-center flex-col p-3">
                            <div className="my-2">
                                <label className="font-medium text-lg">Price Range:</label>
                                <div className="flex flex-col my-2 space-y-2">
                                    <div>
                                        <span className="font-medium mr-1">{country.currencySymbol}:</span>
                                        <input
                                            type="text"
                                            placeholder="Min"
                                            value={filterMinPrice}
                                            onChange={(e) => setFilterMinPrice(e.target.value)}
                                            className="rounded p-1 border focus:border-gray-300 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <span className="font-medium mr-1">{country.currencySymbol}:</span>
                                        <input
                                            type="text"
                                            placeholder="Max"
                                            value={filterMaxPrice}
                                            onChange={(e) => setFilterMaxPrice(e.target.value)}
                                            className="rounded p-1 border focus:border-gray-300 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleFilters} className="p-1 bg-red-700 hover:bg-[#ff0000] text-white font-medium rounded my-2">Clear Filters</button>
                            <button onClick={() => setShowFilterSettings(prev => !prev)} className="p-1 bg-gray-800 hover:bg-black text-white font-medium rounded my-2">Close Settings</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default FilterSettings