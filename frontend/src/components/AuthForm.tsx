import { useState } from "react";
import type {  ApiResponse, IUserInfo } from "../api/user";
import Loader from "./Loader";

const AuthForm = ({ type, loading, onSubmit }: { type: string, loading: boolean, onSubmit: (userDetails:IUserInfo) => void }) => {


    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(type=="sign-up"){
            await onSubmit({username, email, password});
        }else{
            await onSubmit({email, password});
        }
    }

    return (
        <div className='w-[40rem] flex flex-col gap-2 text-center'>

            {
                type == "sign-in" ? <h1 className='text-3xl'>SignIn</h1> : <h1 className='text-3xl'>SignUp</h1>
            }

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-6 items-center'>
                    {
                        type == "sign-up" && (
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-1/2 px-2 py-3 rounded-full " placeholder='username'
                                type="text"
                                value={username}
                                name="username"
                                id="username" />
                        )
                    }
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-1/2 px-2 py-3 rounded-full " placeholder='email'
                        type="email"
                        name="email"
                        id="email" />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-1/2 px-2 py-3 rounded-full"
                        placeholder='password'
                        type="password"
                        name="password"
                        id="password" />
                </div>
                <button type='submit' className='w-1/2 px-2 py-3 rounded-full bg-black text-white mt-6'>{
                    loading ? <Loader/> : type == "sign-in" ? <span>SignIn</span> : <span>SignUp</span>
                }
                </button>
            </form>
        </div>
    )
}
export default AuthForm