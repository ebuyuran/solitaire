import styled from 'styled-components';

export const StyledSolitare = styled.div`
  width: 100%;
  height: 100%;
  max-width: 120em;
  margin: auto;
  padding: 2em;
  font-size: 1vw;
  background: grey;

  .container {
    position: relative;
    top: 0;
    left: 0;

    width: 100%;
    height: 14.3em;

    display: flex;
    justify-content: space-between;
  }

  .tableaus {
    top: 10em;
  }

  .stack {
    position: relative;
    width: 13%;
    height: 14.3em;

    img {
      position: relative;
    }
  }
`;
