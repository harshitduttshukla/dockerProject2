import  Button22  from "../components/Button22"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Card } from "../components/Card"
import { CreateContrentModal } from "../components/CreateContrentModal"
import { useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"

export function Dashbord() {
  const [modalOpen,setModelOPen] = useState(false)
  const {contents,refresh} = useContent();

  useEffect(() => {
    refresh();
  },[modalOpen])

  return (
    <div>
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">

          <CreateContrentModal open = {modalOpen} onclose = {()=>{
            setModelOPen(false);
          }}/>
          <div className="flex justify-end gap-4" >


            <Button22 onclick={() => setModelOPen(true)} variant="primary" text="Add content" startIcon={<PlusIcon/>}> </Button22>
            <Button22 onclick={async () =>{
             const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share : true
              },{
                headers :{
                  "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
              });
              const shareUrl = `https://localhost:3000/share/${response.data.hash}`
              alert("yutgyhtghyfgjhfg"+shareUrl);
            } } variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}> </Button22>
          </div>
            <div className="flex gap-6 flex-wrap">
            {contents.map(({Type,Link,title,})=> <Card
            type = {Type}
            Link = {Link}
            title = {title} />
)
            }
{/* 
            <Card type = "twitter" Link="https://x.com/G1Fast/status/1864622313741930651" title = "Harshit First" />
            <Card type = "youtube" Link="https://www.youtube.com/watch?v=kwjSe64VHMU&t=246s" title = "youtube video " />
            */}
               </div>
        </div>

    </div>
  )
}

