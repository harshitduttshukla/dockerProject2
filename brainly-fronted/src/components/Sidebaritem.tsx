import { ReactElement } from "react";

export function Sidebaritem({title,icon}:{
    title : string;
    icon : ReactElement;
}){ 
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-100 rounded max-w-48 pl-4 translate-all duration-150">
        <div className="pr-2">
        {icon}
        </div>
        <div >  
        {title}
        </div>
    </div>
}
