import { PanelLeft } from 'lucide-react'
import { chatHistory, sidebarFeatures } from '../contant'
import FeatureButton from './FeatureButton'
import SidebarChatButton from './SidebarChatButton'
import SidebarUserProfile from './SidebarUserProfile'

const Sidebar = () => {
    return (
        <div className="w-[16rem]  h-screen text-sm bg-primary flex flex-col">
            <div className="p-2 flex flex-col gap-2">
                <div className="flex items-center justify-between h-fit p-2">
                    <img src="/ChatGPT-Logo.svg.png" width={20} alt="" />
                    <PanelLeft width={20} />
                </div>
                <div className="flex flex-col">
                    {sidebarFeatures.map((feat) => (
                        <FeatureButton key={feat.name} name={feat.name} icon={feat.icon} />
                    ))}
                </div>
            </div>
            
            <div className="w-full overflow-y-auto p-2">
                <h1 className="p-2">Chats</h1>
                {chatHistory.map((chat) => (
                    <SidebarChatButton key={chat} name={chat} />
                ))}
            </div>

             <div className="p-2 shrink-0">
                <SidebarUserProfile />
            </div>
        </div>
    )
}

export default Sidebar
