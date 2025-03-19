import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropdownSelector = styled.select`
    width: 100%;
    margin: ${({$margin}) => $margin || "1.75rem"};
    padding: ${({$size}) => $size === "small" ? "0.5rem" : "0.75rem"};
    font-size: ${({$size}) => $size === "small" ? "0.85rem" : "1rem"};
    background-color: ${({$bgColor}) => $bgColor || "var(--third-color)"};
    border-radius: 0.5rem;
    color: ${({$color}) => $color || "var(--text-light)"};
    border: ${({$bgColor}) => !$bgColor ? 'none' : '1px solid #ccc'};
`;

export default function Dropdown({ size, margin, color, bgColor, children , ...props}) {

    return(
        <DropdownSelector $size={size} $bgColor={bgColor} $color={color} $margin={margin} {...props}>
            {children}
        </DropdownSelector>
    )

}

Dropdown.propTypes = {
    children: PropTypes.any,
    size: PropTypes.string,
    margin: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
}