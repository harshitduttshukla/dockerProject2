import { FC } from 'react'

interface clProps {
    placeholder : string;
    ref1 : any;
    classname1? : string;
    type1 ?: string;
}

const Input: FC<clProps> = ({ref1, placeholder,classname1,type1}) => {
    return <>
    <input ref={ref1} placeholder={placeholder} type={type1} className= {classname1}
    
    // 'px-4 py-2 border rounded-md m-2 '
    
    />
</>
}

export default Input