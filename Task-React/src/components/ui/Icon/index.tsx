import React from "react";

interface IconProps {
    name: string;
    size?: number | string;
    className?: string;
    color?: string;
}

export default function Icon({ name, size = 24, className = "", color }: IconProps) {
    return (
        <img
            src={`/app/assets/icons/${name}.svg`}
            alt={name}
            width={size}
            height={size}
            className={`inline-block align-middle ${className}`}
            style={{
                width: size,
                height: size,
                color: color
            }}
        />
    );
}