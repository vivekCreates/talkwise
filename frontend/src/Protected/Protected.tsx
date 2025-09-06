import React from "react";
import { useUser } from "../contexts/user.context";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user, token,isLoading } = useUser();

  // 🔄 While checking user (API/localStorage), show a loader
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // ❌ If not logged in
if (!token || !user?.id) return <Navigate to="/sign-in" replace />;

  // ✅ If logged in
  return <>{children}</>;
};

export default Protected;
