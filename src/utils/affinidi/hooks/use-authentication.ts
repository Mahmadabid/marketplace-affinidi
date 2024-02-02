import { useFetchUserInfoQuery } from "./use-fetch-user-info-query";

export const useAuthentication = async () => {
  try {
    const { data, error } = await useFetchUserInfoQuery();

    if (error) {
      throw error;
    }

    return {
      isLoading: false,
      isAuthenticated: true,
      userId: data?.userId,
      user: data?.user,
    };
  } catch (error) {
    return {
      isLoading: false,
      isAuthenticated: false,
      userId: null,
      user: null,
      error,
    };
  }
};