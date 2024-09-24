
import { CiCircleChevUp } from "react-icons/ci";
import "../../styles/index.css";
import styled from 'styled-components';
import { MdTopic } from "react-icons/md";
import { useState, useEffect } from 'react';

const ButtonContainer = styled.span`
  position: fixed;
  bottom: 80px;
  right: 32px;
  align-items: center;
  height: 32px;
  width: 32px;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  opacity: 0.5;
  background: #000;
  border-radius: 4px;
  transition: opacity 0.4s, color ease-in-out 0.2s, background ease-in-out 0.2s;
  display: ${(props) => (props.isscrollbuttonvisible === 'true' ? 'flex' : 'none')};
  
  &:hover {
    opacity: 1;
  }
`;
///display: ${({ isScrollButtonVisible }) =>isScrollButtonVisible ? 'flex' : 'none'};
//display: ${({ showButton }) => (showButton ? 'flex' : 'none')};
const Top = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.pageYOffset > 900) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 800) {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    //<ButtonContainer isScrollButtonVisible={showButton} onClick={scrollToTop}>
        //<ButtonContainer showButton={showButton} onClick={scrollToTop}>
    //<ButtonContainer isscrollbuttonvisible={showButton} onClick={scrollToTop}>
    <ButtonContainer isscrollbuttonvisible={showButton ? 'true' : 'false'} onClick={scrollToTop}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </ButtonContainer>
  );
};








export default Top;