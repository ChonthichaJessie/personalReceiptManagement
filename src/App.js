import React from "react";
import styled from "styled-components";
import Home from "./screens/Home";

const App = () => {
  return (
      <Wrapper>
        <Home />
      </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
`;
