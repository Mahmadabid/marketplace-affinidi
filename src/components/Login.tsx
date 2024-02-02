import React, { useState } from "react";
import { clientLogin } from "@/utils/affinidi/auth/clientLogin";
import Image from "next/image";
import Load from "./utils/Load";

interface LoginProps {
  userLoading: boolean;
}

const Login: React.FC<LoginProps> = ({userLoading}) => {

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    clientLogin();
  }

  const headerHeight = 8;

  return (
    <div className="flex items-center justify-center" style={{ minHeight: `calc(100vh - ${headerHeight}rem)` }}>
      <div className="text-center flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold my-4">Please Login</h1>
        <button onClick={handleLogin} className="font-bold text-xl bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300" disabled={loading || userLoading}>{loading || userLoading ? <Load /> : <div className="flex flex-row justify-center items-center"><Image src="/logo-affinidi.svg" alt="affinidi logo" className="bg-white rounded-full p-1" width={40} height={40} /> &nbsp;Log in with affinidi</div>}</button>
      </div>
    </div>
  );
}

export default Login;
