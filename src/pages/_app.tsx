import Layout from "@/components/Layout";
import Login from "@/components/Login";
import "@/styles/globals.css";
import { CartProvider } from "@/utils/CartContext";
import { UserContext, UserDataProps, UserDataValues } from "@/utils/UserContext";
import { useAuthentication } from "@/utils/affinidi/hooks/use-authentication";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {

  const [userData, setUserData] = useState<UserDataProps>(UserDataValues);
  const [userLoading, setUserLoading] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <UserContext.Provider value={[userData, setUserData]}>
        <CartProvider>
          <Layout>
            {userData.userId ?
              <Component {...pageProps} />
              : <Login userLoading={userLoading} />}
          </Layout>
        </CartProvider>
      </UserContext.Provider>
    </>
  );
}
