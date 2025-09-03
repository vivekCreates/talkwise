import { Icon, type LucideProps } from 'lucide-react';
import React from 'react'

interface FeaturesProps {
    name:string;
    icon:React.ComponentType<LucideProps>
}
const FeatureButton = ({name,icon:Icon}:FeaturesProps) => {
  return (
    <button className='p-2 rounded-full flex items-center gap-2 hover:bg-[#EFEFEF]'>
        <Icon width={15}/>
        <span>{name}</span>
    </button>
  )
}

export default FeatureButton