import { Search, Share, SquarePen,Trash, type LucideProps } from "lucide-react"


export const sidebarFeatures: { name: string, icon: React.ComponentType<LucideProps> }[] = [
    {
        name: "New Chat",
        icon: Search,
    },
    {
        name: "Search chats",
        icon: SquarePen,
    }
]

export const chatHistory = [
    "what is react?",
    "what is nextjs?",
    "what is tailwindcss?",
    "how to learn web development?",
    "what is the best way to learn programming?",
    "explain event loop in javascript?",
    "what is typescript?",
    "what is vite?",
    "what is nodejs?",
    "what is expressjs?",
    "what is mongodb?",
    "what is sql?",
    "what is nosql?",
    "what is docker?",
    "what is kubernetes?",
    "what is aws?",
    "what is azure?",
    "what is gcp?",
    "what is devops?",
]




export const chatButtonOptions:{name:string,icon:React.ComponentType<LucideProps>,color?:string}[] = [
    {
        name:"Share",
        icon:Share
    },
    {
        name:"Delete",
        icon:Trash,
        color:"green"
    }
]