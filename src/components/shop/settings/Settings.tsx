import { CountryProps } from "@/utils/CountryContext";
import { UserContext } from "@/utils/UserContext";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import stringSimilarity from "string-similarity";
import { countries } from "../../country/Countries";
import Cookies from 'js-cookie';

interface SettingsProps {
    setShowSettings: Dispatch<SetStateAction<boolean>>;
    country: CountryProps;
    setCountry: Dispatch<SetStateAction<CountryProps>>;
}

const Settings: React.FC<SettingsProps> = ({ setShowSettings, country, setCountry }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [User, _] = useContext(UserContext);
    const [pressed, setPressed] = useState(false);
    const [showAgain, setShowAgain] = useState(false);

    const CountryFetch = () => {
        if (!User.user.country) return;
        const userCountryName = User.user.country;

        const matches = stringSimilarity.findBestMatch(
            userCountryName,
            countries.map((c) => c.name)
        );

        const bestMatch = matches.bestMatch;
        const closestCountry = countries.find((c) => c.name === bestMatch.target);

        return closestCountry;
    }

    const fecthSetting = Cookies.get('setting');

    useEffect(() => {
        const fetchCountry = localStorage.getItem('country');
        if (fetchCountry) {
            if (JSON.parse(fetchCountry).name === CountryFetch()?.name) {
                setPressed(true);
            }
        }
    }, []);

    const countrySwitch = () => {
        if (pressed) {
            setCountry({
                name: "United States",
                currencySymbol: "$",
                abbreviation: "USD",
                currencyRate: 1,
            });
            setPressed(false);
        } else {
            if (!User.user.country) return;
            const userCountryName = User.user.country;

            const matches = stringSimilarity.findBestMatch(
                userCountryName,
                countries.map((c) => c.name)
            );

            const bestMatch = matches.bestMatch;
            const closestCountry = countries.find((c) => c.name === bestMatch.target);

            if (closestCountry) {
                setCountry({
                    name: closestCountry.name,
                    currencySymbol: closestCountry.currencySymbol,
                    abbreviation: closestCountry.abbreviation,
                    currencyRate: closestCountry.currencyRate,
                });
            }
            setPressed(true);
        }
    }

    const handleSetting = () => {
        setShowSettings(false);

        if (showAgain) {
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            Cookies.set('setting', 'false', { expires: expirationDate });
        } else {
            Cookies.set('setting', 'false')
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 min-w-screen min-h-screen">
            <div className="bg-white rounded border border-gray-500 mx-1">
                <div className="flex justify-center items-center flex-col p-2">
                    <div className="text-center flex flex-row justify-center items-center">
                        <h1 className='text-5xl xse:text-3xl xb:text-4xl font-bold italic truncate my-2 text-[#3bdbb8] font-sans'>Welcome {User.user.nickname ? User.user.nickname : User.user.givenName ? User.user.givenName : 'User'}</h1>
                        <span
                            className="ml-2 inline-block relative group"
                            onMouseEnter={() => setIsVisible(true)}
                            onMouseLeave={() => setIsVisible(false)}
                        >
                            <div className='relative'>
                                <FontAwesomeIcon
                                    icon={faCertificate}
                                    className={`text-4xl xse:text-2xl xb:text-3xl ml-1 ${User.user.verified ? 'text-blue-500' : 'text-gray-400 opacity-50'}`}
                                    title={User.user.verified ? "Verified" : "Unverified"}
                                />
                                {User.user.verified && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="absolute top-[47%] left-[52%] w-5 h-5 xb:w-4 xb:h-4 xse:w-3 xse:h-3 transform -translate-x-1/2 -translate-y-1/2"
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth="3"
                                    >
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                )}
                            </div>

                            <span
                                className={`absolute left-1/2 transform -translate-x-1/2 font-medium bg-blue-600 text-white px-2 py-1 my-1 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out`}
                                style={{ visibility: isVisible ? 'visible' : 'hidden' }}
                            >
                                {User.user.verified ? 'Verified' : "Unverified"}
                            </span>
                        </span>
                    </div>
                    <p className="text-slate-700 text-lg font-medium">{User.user.verified ? 'Verified users get 1% discount' : 'Pass affinidi liveness check to get 1% discount'}</p>
                    {User.user.country ? <><h3 className="font-medium text-lg mt-2">Your Country: <span className="text-green-600">{country.name}</span></h3>
                        <h3 className="font-medium text-lg mb-1 mt-1">Your Currency: <span className="text-teal-600">{country.abbreviation}</span></h3>
                        {User.user.country ? CountryFetch()?.name !== 'United States' ? <><p className="my-1 text-red-500 font-medium">Some Countries may not be supported</p>
                            <button onClick={countrySwitch} className="font-medium my-2 bg-blue-500 hover:bg-blue-700 p-1 rounded text-white">Switch to {!pressed ? CountryFetch()?.name : 'United States'}</button></> : <p className="text-red-500 text-lg font-medium">For other countries change your country in affinidi</p> : null}
                    </> : <div className="flex flex-col justify-center text-center">
                        <p className="text-lg mt-2 text-red-500 font-medium">You have not added country in your Affinidi Profile.</p>
                        <h3 className="font-medium text-lg mt-1">Your Country: <span className="text-green-600">{country.name}</span></h3>
                        <h3 className="font-medium text-lg mb-2 mt-1">Your Currency: <span className="text-teal-600">{country.abbreviation}</span></h3>
                    </div>}
                    {!fecthSetting &&
                        <div className="flex items-center my-1 justify-center">
                            <label htmlFor="showAgain" className="mr-2 font-medium">Don't show again</label>
                            <input type="checkbox" id="showAgain" checked={showAgain} onChange={(e) => setShowAgain(e.target.checked)} />
                        </div>}
                    <button onClick={handleSetting} className="p-1 bg-gray-800 hover:bg-black text-white font-medium rounded my-2">Close Settings</button>
                </div>
            </div>
        </div>
    )
}

export default Settings