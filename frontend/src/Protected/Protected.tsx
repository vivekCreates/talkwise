import React from "react";
import { useUser } from "../contexts/user.context";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user, token,isLoading } = useUser();
  console.log("user",user);
  console.log("token",token);


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
        <Loader/>
    </div>;
  }

if (!token || !user?.id) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
};

export default Protected;
