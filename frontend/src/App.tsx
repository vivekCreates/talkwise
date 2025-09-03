
import HeroText from './components/HeroText'
import Sidebar from './components/Sidebar'
import { SquarePen } from 'lucide-react'

const App = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      <div>
      <div className='w-full h-fit px-4 py-2 flex items-center justify-between'>
        <h1 className='text-lg'>TalkWise</h1>
        <SquarePen width={15}/>
      </div>
      <div className='w-full min-h-[90vh]'>
            <HeroText/>
      </div>
      </div>
    </div>
  )
}

export default App