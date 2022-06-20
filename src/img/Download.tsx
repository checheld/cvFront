import React from "react";

interface IconProps {
    isActive?: boolean,
}

const Download: React.FC<IconProps> = ({ isActive = false}) => {
    const activeColor = '#5893F9'
    const fill = isActive ?  activeColor : 'rgba(255, 255, 255, 0.4)'

    return <div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'relative', top: '3.5px'}}>
            <path d="M12.4425 6.75H11.25V3C11.25 2.5875 10.9125 2.25 10.5 2.25H7.5C7.0875 2.25 6.75 2.5875 6.75 3V6.75H5.5575C4.89 6.75 4.5525 7.56 5.025 8.0325L8.4675 11.475C8.76 11.7675 9.2325 11.7675 9.525 11.475L12.9675 8.0325C13.44 7.56 13.11 6.75 12.4425 6.75ZM3.75 14.25C3.75 14.6625 4.0875 15 4.5 15H13.5C13.9125 15 14.25 14.6625 14.25 14.25C14.25 13.8375 13.9125 13.5 13.5 13.5H4.5C4.0875 13.5 3.75 13.8375 3.75 14.25Z" fill="#5893F9"/>
        </svg>
    </div>
    
}
export default Download   

