import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserApi, logoutApi, signInApi, signUpApi, type IUser, type IUserInfo } from "../api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  signUp: (userDetails:IUserInfo ) => void;
  signIn: (userDetails:IUserInfo) => void;
  logout: () => void;
  getCurrentUser: () => void
};


const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  isLoading: false,
  setIsLoading: () => { },
  signUp: async () => { },
  signIn: async () => { },
  logout: async () => { },
  getCurrentUser: async () => { }
});

export const useUser = () => useContext(UserContext)


export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const signUp = async (userDetails:IUserInfo ) => {
    console.log(userDetails)
    try {
      setIsLoading(true)
      const response = await signUpApi(userDetails)
      console.log(response);
      if (!response.success) {
        toast.error(response.message)
        return
      }
      setUser(response.data)
      toast.success(response.message)
      navigate("/sign-in")
    } catch (error: any) {
      toast.error(error?.message)
    }
    finally {
      setIsLoading(false)
    }
  }
  const signIn = async (userDetails:IUserInfo) => {
    try {
      setIsLoading(true)
      const response = await signInApi(userDetails)
      console.log(response)
      if (!response.success) {
        toast.error(response.message)
        return
      }
      setUser(response.data)
      console.log(response)
      toast.success(response.message)
      navigate("/")
    } catch (error: any) {
      toast.error(error?.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
  try {
    setIsLoading(true)
    const response = await logoutApi();
    if (!response.success) {
      toast.error(response.message)
      return
    }
    setUser(response.data)
    toast.success(response.message)
  } catch (error: any) {
    toast.error(error?.message)
  }
  finally {
    setIsLoading(false)
  }
  }

  const getCurrentUser = async () => {
  try {
    setIsLoading(true)
    const response = await getCurrentUserApi();
    if (!response.success) {
      toast.error(response.message)
    }
    setUser(response.data)
    toast.success(response.message)
  } catch (error: any) {
  }
  finally {
    setIsLoading(false)
  }
  }

  useEffect(()=>{
    getCurrentUser();
  },[])


return (
  <UserContext.Provider value={{ user, setUser, isLoading,setIsLoading,signUp,signIn,logout,getCurrentUser}}>
    {children}
  </UserContext.Provider>
)
}


export default UserContext;
