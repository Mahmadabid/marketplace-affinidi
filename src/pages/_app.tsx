import Layout from "@/components/Layout";
import Login from "@/components/Login";
import { countries } from "@/components/country/Countries";
import "@/styles/globals.css";
import { CartProvider } from "@/utils/CartContext";
import { CountryContext, CountryProps, SetCountryAction, initialCountryState } from "@/utils/CountryContext";
import { UserContext, UserDataProps, UserDataValues } from "@/utils/UserContext";
import { useAuthentication } from "@/utils/affinidi/hooks/use-authentication";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import stringSimilarity from "string-similarity";

export default function App({ Component, pageProps }: AppProps) {

  const [userData, setUserData] = useState<UserDataProps>(UserDataValues);
  const [userLoading, setUserLoading] = useState(false);
  const router = useRouter();
  const [country, setCountry] = useState<CountryProps>(initialCountryState);
  const [changeOK, setChangeOK] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      const userInfo = await useAuthentication();

      setUserData(prev => ({
        ...prev,
        userId: userInfo.userId,
        user: userInfo.user
      }));
      setUserLoading(false);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/cart');
    router.prefetch('/checkout');
  }, [router]);

  const setAndStoreCountry: SetCountryAction = (newCountry: SetStateAction<CountryProps>) => {
    setCountry((prevState) => {
      const updatedCountry = typeof newCountry === 'function' ? newCountry(prevState) : newCountry;
      localStorage.setItem('country', JSON.stringify(updatedCountry));
      return updatedCountry;
    });
  };

  useEffect(() => {
    const fetchCountry = localStorage.getItem('country');
    const fetchChange = localStorage.getItem('change');

    if (fetchChange && fetchCountry) {
      if (fetchChange === 'change') {
        setCountry(JSON.parse(fetchCountry));
        setChangeOK(true);
      }
    }
  }, [])

  useEffect(() => {
    if (!userData.userId || changeOK) return;

    if (userData.user.country) {
      const userCountryName = userData.user.country;

      const matches = stringSimilarity.findBestMatch(
        userCountryName,
        countries.map((c) => c.name)
      );

      const bestMatch = matches.bestMatch;
      const closestCountry = countries.find((c) => c.name === bestMatch.target);

      if (closestCountry) {
        setAndStoreCountry({
          name: closestCountry.name,
          currencySymbol: closestCountry.currencySymbol,
          abbreviation: closestCountry.abbreviation,
          currencyRate: closestCountry.currencyRate,
        });
      }
    } else {
      setAndStoreCountry({
        name: "United States",
        currencySymbol: "$",
        abbreviation: "USD",
        currencyRate: 1,
      });
    }
  }, [userData]);

  return (
    <>
      <UserContext.Provider value={[userData, setUserData]}>
        <CountryContext.Provider value={[country, setAndStoreCountry]}>
          <CartProvider>
            <Layout>
              {userData.userId ?
                <Component {...pageProps} />
                : <Login userLoading={userLoading} />}
            </Layout>
          </CartProvider>
        </CountryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
