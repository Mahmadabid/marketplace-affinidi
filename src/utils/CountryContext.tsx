import { createContext, useState, ReactNode, SetStateAction, Dispatch, useEffect } from 'react';

export const initialCountryState = {
    name: "United States",
    currencySymbol: "$",
    abbreviation: "USD",
    currencyRate: 1,
};

export interface CountryProps {
    name: string;
    currencySymbol: string;
    abbreviation: string;
    currencyRate: number;
}

type SetCountryAction = Dispatch<SetStateAction<CountryProps>>;

export const CountryContext = createContext<[CountryProps, SetCountryAction]>([initialCountryState, () => { }]);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [country, setCountry] = useState<CountryProps>(initialCountryState);

    const setAndStoreCountry: SetCountryAction = (newCountry: SetStateAction<CountryProps>) => {
        setCountry((prevState) => {
            const updatedCountry = typeof newCountry === 'function' ? newCountry(prevState) : newCountry;
            localStorage.setItem('country', JSON.stringify(updatedCountry));
            return updatedCountry;
        });
    };

    useEffect(() => {
        const storedCountry = localStorage.getItem('country');
        if (storedCountry) {
            setCountry(JSON.parse(storedCountry));
        }
    }, []);

    return (
        <CountryContext.Provider value={[country, setAndStoreCountry]}>
            {children}
        </CountryContext.Provider>
    );
};
