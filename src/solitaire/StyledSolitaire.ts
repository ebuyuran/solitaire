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
    width: 100%;

    .foundation {
      position: absolute;
      top: 0;
      left: 0;

      width: 50em;
      height: 10em;
      background: black;

      .stack {
        display: inline-block;
        width: 10em;
        height: 10em;
        background: white;
        margin: 0 1em 0 0;
      }
    }

    .stock {
      position: absolute;
      top: 0;
      right: 0;

      width: 21em;
      height: 10em;
      background: black;

      .open {
        position: absolute;
        top: 0;
        right: 11;

        width: 10em;
        height: 14.3em;
        background: white;
      }

      .closed {
        position: absolute;
        top: 0;
        right: 0em;

        width: 10em;
        height: 14.3em;
        background: white;
      }
    }
  }
`;
