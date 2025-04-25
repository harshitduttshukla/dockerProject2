// import { ReactElement } from "react";

// interface ButtonProps{
//     variant : "primary" | "secondary";
//     text : string;
//     startIcon?: ReactElement;
//     onclick?: () => void;
//     fullWidth?: boolean;
//     Loading ?: boolean;

// }

// const variantClasses = {
//     "primary" : "bg-purple-600 text-white",
//     "secondary" : "bg-purple-200 text-purple-600",
// }

// const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center";

// export default function Button22({variant,text,startIcon,onclick,fullWidth} : ButtonProps ){

//     return <button onClick={onclick} className={variantClasses[variant] + " "+ defaultStyle + `${fullWidth && " w-full flex justify-center items-center"}`} >
//        <div className="pr-2">
        
//         {startIcon}
//         </div> 
//         {text}
//     </button>
   

// }







import { ReactElement, ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onclick?: () => void;
  fullWidth?: boolean;
  Loading?: boolean;
  children?: ReactNode;  // Allow any type of content inside Button22
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center";

export default function Button22({
  variant,
  text,
  startIcon,
  onclick,
  fullWidth,
  children, // Accept children as part of the props
}: ButtonProps) {
  return (
    <button
      onClick={onclick}
      className={variantClasses[variant] + " " + defaultStyle + `${fullWidth ? " w-full flex justify-center items-center" : ""}`}
    >
      <div className="pr-2">
        {startIcon}
      </div>
      {text}
      {children}  {/* Render children */}
    </button>
  );
}
