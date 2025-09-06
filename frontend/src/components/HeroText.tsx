import { ArrowUp, Plus } from 'lucide-react'
import React from 'react'

const HeroText = () => {
    return (
        <div className='w-[42rem] absolute top-[40%] left-[60%] -translate-x-[50%] -translate-y-[50%] p-2 flex flex-col gap-10 items-center justify-center'>
            <h1 className='text-[2rem]'>Where should we begin?</h1>

            <div className='w-full flex h-full items-center justify-between p-2 rounded-full gap-2 shadow-sm border-2 border-primary'>
                <div className='w-10 h-10 bg-primary flex rounded-full items-center justify-center'>
                    <Plus width={20} />
                </div>
                <input type="text" className='h-full w-[90%] py-2 border-none outline-none' placeholder='Ask for anything?' />
                <div className='w-10 h-10 bg-black rounded-full flex items-center justify-center'>
                    <ArrowUp width={20} color='white' />
                </div>
            </div>
        </div>
    )
}

export default HeroText