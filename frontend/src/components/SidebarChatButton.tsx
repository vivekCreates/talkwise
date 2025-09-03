import { Ellipsis, type LucideProps } from 'lucide-react';
import React from 'react'

interface ChatButtonProps {
    name:string;
    icon?:React.ComponentType<LucideProps>
}


const SidebarChatButton = ({name,icon:Icon}:ChatButtonProps) => {
  return (
   <button className="w-full group chatButton p-2 rounded-md flex items-center justify-between gap-4 hover:bg-[#EFEFEF] hover:cursor-pointer">
  <p className='whitespace-nowrap'>{
    name.length > 20 ? name.slice(0,20) + "...":name
    }</p>
  <div className='w-5 h-5 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
  <Ellipsis
    // className=""
    width={15}
  />
  </div>
</button>
  )
}

export default SidebarChatButton