import React, { useState, useEffect } from "react";
import styled from "styled-components";

const OcrDisplay = ({ data }) => {
  return (
    <Wrapper>
      {data.length > 0 && (
        <pre style={{ height: 480, width: 300, overflowY: "auto" }}>{data}</pre>
      )}
    </Wrapper>
  );
};

export default OcrDisplay;

const Wrapper = styled.div`
  background-color: white;
  border: solid 8px #bcbcbc;
  border-radius: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 50%;
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 500px;
  
`;
