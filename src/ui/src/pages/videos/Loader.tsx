import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-wrapper">
        <span className="loader-letter">A</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">l</span>
        <span className="loader-letter">i</span>
        <span className="loader-letter">z</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">d</span>
        <span className="loader-letter">o</span>
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    font-family: "Righteous", "Nunito", sans-serif;
    font-size: 0.6em;
    font-weight: 400;
    color: #fff;
    border-radius: 50%;
    background-color: transparent;
    user-select: none;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: transparent;
    animation: loader-rotate 2s linear infinite;
    z-index: 0;
  }

  @keyframes loader-rotate {
    0% {
      transform: rotate(90deg);
      box-shadow: 0 10px 20px 0 #fff inset, 0 20px 30px 0 #d1d5db inset,
        0 60px 60px 0 #6b7280 inset;
    }
    50% {
      transform: rotate(270deg);
      box-shadow: 0 10px 20px 0 #fff inset, 0 20px 10px 0 #d1d5db inset,
        0 40px 60px 0 #6b7280 inset;
    }
    100% {
      transform: rotate(450deg);
      box-shadow: 0 10px 20px 0 #fff inset, 0 20px 30px 0 #d1d5db inset,
        0 60px 60px 0 #6b7280 inset;
    }
  }

  .loader-letter {
    display: inline-block;
    opacity: 0.4;
    transform: translateY(0);
    animation: loader-letter-anim 2s infinite;
    z-index: 1;
    border-radius: 50ch;
    border: none;
  }

  .loader-letter:nth-child(1) {
    animation-delay: 0s;
  }
  .loader-letter:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loader-letter:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loader-letter:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loader-letter:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loader-letter:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loader-letter:nth-child(7) {
    animation-delay: 0.6s;
  }
  .loader-letter:nth-child(8) {
    animation-delay: 0.7s;
  }
  .loader-letter:nth-child(9) {
    animation-delay: 0.8s;
  }
  .loader-letter:nth-child(10) {
    animation-delay: 0.9s;
  }

  @keyframes loader-letter-anim {
    0%,
    100% {
      opacity: 0.4;
      transform: translateY(0);
    }
    20% {
      opacity: 1;
      transform: scale(1.15);
    }
    40% {
      opacity: 0.7;
      transform: translateY(0);
    }
  }
`;

export default Loader;
