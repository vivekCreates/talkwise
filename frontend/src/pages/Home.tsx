import React from 'react'
import HeroText from '../components/HeroText'
import { Sidebar, SquarePen } from 'lucide-react'

const Home = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      <div className='w-full'>
        <div className='w-full h-fit px-4 py-2 flex items-center justify-between'>
          <h1 className='text-lg'>TalkWise</h1>
          <SquarePen width={20} />
        </div>
        <div className='w-full min-h-[90vh] pl-10 pr-20 mt-10 '>
          <div className='w-full flex flex-col gap-10'>
            <div className='self-end bg-primary rounded-lg p-4'>Hello</div>
            <div className='self-start p-4 h-fit bg-primary rounded-lg'>How can i help you</div>
          </div>
          <HeroText />
        </div>
      </div>
    </div>
  )
}

export default Home