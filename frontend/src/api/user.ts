
import axios, { Axios } from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

axios.defaults.withCredentials = true; // to send cookies with requests

export interface ApiResponse{
    data: any;
    message: string;
    success?: string;
    statusCode?: number;
}


export interface IUser  {
    id:string;
    username:string;
    email:string;
    token:string;
    avatar?:string | null;  
    createdAt:Date;
    updatedAt:Date;
}



export interface IUserInfo {
    username?:string;
    email:string;
    password:string;
}

export const signUpApi = async(userDetails:IUserInfo) => {
    try {
    const response = await api.post("/users/sign-up", userDetails, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // backend sent an error (like 409)
      return error.response.data; 
    }
    throw error; // network error, timeout, etc.
  }
    }


export const signInApi = async(userDetails:IUserInfo) => {
    const response = await api.post("/users/sign-in", userDetails,{
        headers: {
            "Content-Type": "application/json",
            withCredentials: true,
        },
    },);
    return response.data;
}

export const logoutApi = async():Promise<ApiResponse> => {
    const response = await api.post("/users/logout", {},{
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;

}



export const getCurrentUserApi = async():Promise<ApiResponse> => {
        return await api.get("/users/me",{
            headers: {
                "Content-Type": "application/json",
                
            },
            withCredentials: true,
        });
}




export default api;
