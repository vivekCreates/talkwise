import AuthForm from '../components/AuthForm'
import { useUser } from '../contexts/user.context'

const SignUp = () => {
  const {isLoading,signUp} = useUser()
  return (
    <div className='w-screen h-screen bg-red-300'>
        <div className='w-full text-3xl font-bold px-4'>TalkWise</div>
        <div className="w-full h-[90vh] flex justify-center items-center">
            <AuthForm type="sign-up" loading={isLoading} onSubmit={signUp}/>
        </div>
    </div>
  )
}

export default SignUp


