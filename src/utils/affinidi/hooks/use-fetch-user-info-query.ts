import { hostUrl } from "../variables";

export const useFetchUserInfoQuery = async () => {
  try {
    const response = await fetch(`${hostUrl}/api/auth/get-user-info`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Unable to get user info. Are you authenticated?");
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};