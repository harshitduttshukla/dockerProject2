import { useRef, useState } from 'react'
import { CrossIcon } from '../icons/CrossIcon'
import  Button  from './Button22'
import Input from './Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';
enum ContemtType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateContrentModalProps {
    open: boolean;
    onclose: () => void;
  }

export function CreateContrentModal({open,onclose}:CreateContrentModalProps) {
    const titleRef = useRef<HTMLInputElement>();
    const LinkRef = useRef<HTMLInputElement>();
    const [Type,setType] = useState(ContemtType.Twitter);

    console.log(Type);
    

    async function   addContent(){
        const title = titleRef.current?.value;
        const Link = LinkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            Link,
            title,
            Type,
        },{
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        onclose();
    }
  return (
    <div>
        {open &&
        <div>
         <div 
        className='w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center'></div>
        <div className='w-screen h-screen bg-slate-500 fixed top-0 left-0  flex justify-center'>
                        

            <div className='flex flex-col justify-center'>
            <span className='bg-white opacity-100 p-4 rounded'>
            <div className='flex justify-end'>
                <div onClick={onclose} className='cursor-pointer'>
                <CrossIcon/>
                </div>
            </div>
                <div>
                    <Input ref1={titleRef} placeholder={"Title"}/>
                    <Input ref1={LinkRef} placeholder={"Link"}/>
                </div>
                <div>
                    <h1>Type</h1>
                    <div className='flex gap-1'>

                        <Button  variant= {Type === ContemtType.Youtube ? "primary" : "secondary"} 
                        onclick={() => {
                            setType(ContemtType.Youtube);
                        }} text="Youtube"
                        ></Button>


                        <Button  variant= {Type === ContemtType.Twitter ? "primary" : "secondary"} 
                        onclick={() => {
                            setType(ContemtType.Twitter)
                        }} text="Twitter"
                        ></Button>
                    </div>
                </div>
                <div className='flex justify-center'>

                    <Button onclick={addContent} variant='primary' text='Submit'/>
                </div>
            </span>

            </div>
        </div>
            </div>
            }
    </div>
  )
}








