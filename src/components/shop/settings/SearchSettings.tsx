import { CountryContext } from "@/utils/CountryContext";
import { UserContext } from "@/utils/UserContext";
import { Dispatch, SetStateAction, useContext } from "react";

interface SearchSettingProps {
    categories: string[];
    setSelectedSearchGender: Dispatch<SetStateAction<string>>;
    selectedSearchGender: string;
    setSortOrder: Dispatch<SetStateAction<string>>;
    sortOrder: string;
    setMinPrice: Dispatch<SetStateAction<string>>;
    minPrice: string;
    maxPrice: string;
    setMaxPrice: Dispatch<SetStateAction<string>>;
    setShowSearchSettings: Dispatch<SetStateAction<boolean>>;
}

const SearchSettings: React.FC<SearchSettingProps> = ({ categories, setSelectedSearchGender, selectedSearchGender, sortOrder, setSortOrder, setMinPrice, minPrice, maxPrice, setMaxPrice, setShowSearchSettings }) => {

    const [country] = useContext(CountryContext);
    const [User, _] = useContext(UserContext);

    const handleSearchFilters = () => {
        setSortOrder('default');
        setSelectedSearchGender(User.user.gender ? User.user.gender === 'male' ? 'Men' : User.user.gender === 'female' ? 'Women' : 'All' : 'All');
        setMinPrice('');
        setMaxPrice('');
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 min-w-screen min-h-screen">
            <div className="bg-[#f1f1f5] rounded border border-gray-500 mx-1">
                <div className="flex justify-center items-center flex-col p-3 px-4">
                    <div>
                        <h2 className="font-medium text-2xl text-sky-600 my-2">Search in:</h2>
                        <ol className="flex flex-wrap justify-center items-center space-x-4 mx-2">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className={`hover:cursor-pointer font-medium text-lg mb-2 ${selectedSearchGender === category ? 'text-slate-500' : ''}`}
                                    onClick={() => setSelectedSearchGender(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="my-1">
                        <label className="font-medium text-lg mb-2">Sort Order:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="rounded p-1 mx-1 border"
                        >
                            <option value="default">Default</option>
                            <option value="name-asc">Name (Ascending)</option>
                            <option value="name-desc">Name (Descending)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <label className="font-medium text-lg my-2">Price Range:</label>
                        <div className="flex flex-col space-y-2">
                            <div>
                                <span className="font-medium mr-1">{country.currencySymbol}:</span>
                                <input
                                    type="text"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="rounded p-1 border"
                                />
                            </div>
                            <div>
                                <span className="font-medium mr-1">{country.currencySymbol}:</span>
                                <input
                                    type="text"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="rounded p-1 border"
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSearchFilters} className="p-1 bg-red-700 hover:bg-[#ff0000] text-white font-medium rounded my-2">Clear Search Filters</button>
                    <button onClick={() => setShowSearchSettings(false)} className="p-1 bg-gray-800 hover:bg-black text-white font-medium rounded my-2">Close Search Settings</button>
                </div>
            </div>
        </div>
    )
}

export default SearchSettings