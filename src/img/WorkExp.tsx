import React from "react";

interface IconProps {
    isActive?: boolean,
}

const WorkExp: React.FC<IconProps> = ({ isActive = false}) => {
    const activeColor = '#5893F9'
    const fill = isActive ?  activeColor : 'rgba(255, 255, 255, 0.4)'



return <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 3.25V1.75C8 0.925 7.325 0.25 6.5 0.25H2C1.175 0.25 0.5 0.925 0.5 1.75V12.25C0.5 13.075 1.175 13.75 2 13.75H14C14.825 13.75 15.5 13.075 15.5 12.25V4.75C15.5 3.925 14.825 3.25 14 3.25H8ZM3.5 12.25H2V10.75H3.5V12.25ZM3.5 9.25H2V7.75H3.5V9.25ZM3.5 6.25H2V4.75H3.5V6.25ZM3.5 3.25H2V1.75H3.5V3.25ZM6.5 12.25H5V10.75H6.5V12.25ZM6.5 9.25H5V7.75H6.5V9.25ZM6.5 6.25H5V4.75H6.5V6.25ZM6.5 3.25H5V1.75H6.5V3.25ZM13.25 12.25H8V10.75H9.5V9.25H8V7.75H9.5V6.25H8V4.75H13.25C13.6625 4.75 14 5.0875 14 5.5V11.5C14 11.9125 13.6625 12.25 13.25 12.25ZM12.5 6.25H11V7.75H12.5V6.25ZM12.5 9.25H11V10.75H12.5V9.25Z" 
fill={fill}/>
</svg>
}
export default WorkExp
