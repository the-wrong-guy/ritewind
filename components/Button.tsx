import React from 'react';

const Button = ({
   title,
   onClick,
   isHovering,
}: {
   title: string;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
   isHovering: boolean;
}) => {
   return (
      <button
         className={`font-medium text-sm w-[42px] h-[23px]  rounded-[5px] border-[1px] border-[#3290FF]  
         ${isHovering ? 'bg-[#3290FF]' : 'bg-[#3290FF1A]'}  ${isHovering ? 'text-[white]' : 'text-[#3290FF]'}`}
         onClick={onClick}
      >
         {title}
      </button>
   );
};

export default Button;
