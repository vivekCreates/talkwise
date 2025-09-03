import { Icon, type LucideProps } from 'lucide-react'
import React from 'react'
import { chatButtonOptions } from '../contant';



const ChatButtonOptions = () => {
  return (
    <div className='w-[5rem] p-2 flex flex-col gap-2 absolute'>
        {
        chatButtonOptions.map(option=>(
        <div className='flex gap-2 items-center'>
            {<option.icon/>}
            <p>{option.name}</p>
        </div>
            ))
        }
    </div>
  )
}

export default ChatButtonOptions