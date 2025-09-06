import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserApi, logoutApi, signInApi, signUpApi, type IUser, type IUserInfo } from "../api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  signUp: (userDetails: IUserInfo) => void;
  signIn: (userDetails: IUserInfo) => void;
  logout: () => void;
  getCurrentUser: () => void
};

const UserContext = createContext<UserContextType>(
  {
    user: null,
    token: null,
    setUser: () => { },
    isLoading: false,
    setIsLoading: () => { },
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    getCurrentUser: async () => { }
  }
);

export const useUser = () => useContext(UserContext);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      navigate("/");
    }else{
      getCurrentUser()
    }
  }, []);


  const signUp = async (userDetails: IUserInfo) => {
    try {
      setIsLoading(true);
      const res = await signUpApi(userDetails);
      if (!res.success) return toast.error(res.message || "Sign up failed");
      toast.success(res.message);
      navigate("/sign-in");
    } catch {
      toast.error("Unable to sign up. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (userDetails: IUserInfo) => {
    try {
      setIsLoading(true);
      const res = await signInApi(userDetails);
      if (!res.success) return toast.error(res.message || "Sign in failed");
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error("Unable to sign in. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutApi();
      setUser(null);
      setToken(null);
      localStorage.clear();
      toast.success("Logged out");
      navigate("/sign-in");
    } catch {
      toast.error("Unable to log out");
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await getCurrentUserApi();
      if (res.success) {
        setUser(res.data.user);
        setToken(res.data.token);

        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user));

      }
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <UserContext.Provider value={{ user, token, setUser, isLoading, setIsLoading, signUp, signIn, logout, getCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
