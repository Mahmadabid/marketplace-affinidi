import { createContext, SetStateAction, Dispatch} from 'react';

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

export type SetCountryAction = Dispatch<SetStateAction<CountryProps>>;

export const CountryContext = createContext<[CountryProps, SetCountryAction]>([initialCountryState, () => { }]);