import React from "react";

interface IconProps {
    isActive?: boolean,
}

const Download: React.FC<IconProps> = ({ isActive = false }) => {

    return <svg width="5px" height="5px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#AFB5BF" />
    </svg>

}
export default Download

