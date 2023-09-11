import styled from 'styled-components';

export const StyledSolitare = styled.div`
  width: 100%;
  height: 100%;
  background: grey;

  .solitaire {
    width: 100%;
    height: 100%;
    max-width: 100em;
    margin: auto;
    padding: 2em;
    background: grey;
    font-size: 10px;
  }

  .container {
    position: relative;
    top: 0;
    left: 0;

    width: 100%;

    display: flex;
    justify-content: space-between;
  }

  .tableaus {
    padding-top: 10%;
  }

  .stack {
    position: relative;
    width: 13%;
    height: 0;
    padding-top: 18.9%;

    img {
      position: relative;
    }
  }

  .closed-stock-base {
    position: absolute;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: .8em;
    border: none;
  }
`;
