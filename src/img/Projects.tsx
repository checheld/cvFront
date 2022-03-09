import React from "react";

interface IconProps {
    isActive?: boolean,
}

const Projects: React.FC<IconProps> = ({ isActive = false}) => {
    const activeColor = '#5893F9'
    const fill = isActive ?  activeColor : 'rgba(255, 255, 255, 0.4)'

return <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.9425 0.4425C6.6575 0.1575 6.275 0 5.8775 0H2C1.175 0 0.5075 0.675 0.5075 1.5L0.5 10.5C0.5 11.325 1.175 12 2 12H14C14.825 12 15.5 11.325 15.5 10.5V3C15.5 2.175 14.825 1.5 14 1.5H8L6.9425 0.4425Z" 
fill={fill}/>
</svg>
}
export default Projects