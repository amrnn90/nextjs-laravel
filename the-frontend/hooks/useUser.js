import { useRouter } from "next/router";
import { useCallback, useContext, createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import api from "../utils/api";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const userQuery = useQuery(
    "user",
    () =>
      api.me().catch((error) => {
        if (error.response.status === 401) return null;
        throw error;
      }),
    {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: "always",
      refetchOnMount: "always",
    }
  );

  const user = userQuery.data;

  const isLoggedIn = !!user
    ? true
    : userQuery.isFetchedAfterMount
    ? false
    : null;

  const forgotPassword = useCallback((email) => {
    return api.forgotPassword(email);
  }, []);

  const verificationNotification = useCallback((email) => {
    return api.verificationNotification(email);
  }, []);

  const resetPassword = useCallback((data) => api.resetPassword(data), []);

  const register = useCallback(
    (data) => {
      return api.register(data).then(() => {
        return userQuery.refetch().then(() => {
          setTimeout(() => {
            router.push("/");
          });
        });
      });
    },
    [queryClient, router]
  );

  const logIn = useCallback(
    (email, password) =>
      api.logIn(email, password).then(() => {
        return userQuery.refetch().then(() => {
          setTimeout(() => {
            router.push(router.query.redirect || "/");
          });
        });
      }),
    [queryClient, router]
  );

  const logOut = useCallback(
    () =>
      api.logOut().then(() => {
        queryClient.setQueryData("user", null);
        router.push("/login");
      }),
    [queryClient, router]
  );

  const value = {
    user,
    isLoggedIn,
    logIn,
    logOut,
    register,
    forgotPassword,
    resetPassword,
    verificationNotification,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default function useUser() {
  const ctx = useContext(userContext);
  return ctx;
}
