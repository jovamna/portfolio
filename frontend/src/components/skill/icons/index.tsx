import styled from "styled-components";
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'
import {  SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core';





// image icons
export const ImageIcon = styled.img<{ width?: number; height?: number }>`
    width: ${({ width, height }) => {
        if(width === undefined) {
            if(height === undefined) return "100%";
            return "auto";
        }
        return width.toString() + "px";
    }};
    max-height: ${({ width, height }) => {
        if(height === undefined) {
            if(width === undefined) return "100%";
            return "auto";
        }
        return height.toString() + "px";
    }};
`;









// social icons
export const SocialIcon = styled(FAIcon)<{ colorused: string }>`
    color: ${({ colorused }) => colorused};
`;

export const SocialIconContainer = styled.div`
    display: flex;
    text-align: center;
    justify-content: space-evenly;
`;

export const SocialIconClickable = (props: { 
        url: string; title: string; iconProps: IconProp; 
        iconSize: SizeProp; iconColor: string; 
    }) : JSX.Element => {
    const { url, title, iconProps, iconSize, iconColor } = props;
    return <a className="link" href={url} title={title} target="_blank" rel="noreferrer">
        <SocialIcon icon={iconProps} size={iconSize} colorused={iconColor} />
    </a>
};
