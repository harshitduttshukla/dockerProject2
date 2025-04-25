import { Sidebaritem } from "./Sidebaritem"
import Twitter from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon";

import BrainIcon from "../icons/BrainIcon"
export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-4 text-purple-600">
            <BrainIcon></BrainIcon>
            </div>
            Second Brain 
        </div>
      <div className="pt-8 pl-4">
        <Sidebaritem title="Twitter"  icon={<Twitter/>}/>
        <Sidebaritem title="Youtube" icon={<YoutubeIcon/>}/>

      </div>
    </div>
}