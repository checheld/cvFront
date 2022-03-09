import React from "react";

interface IconProps {
    isActive?: boolean,
}

const Delete: React.FC<IconProps> = ({ isActive = false}) => {
    const activeColor = '#5893F9'
    const fill = isActive ?  activeColor : 'rgba(255, 255, 255, 0.4)'

    return <div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"  style={{position:'relative', top: '3.5px'}}>
            <path d="M4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25ZM14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3Z" fill="#BAC1CC"/>
        </svg>
    </div>
    
}
export default Delete   