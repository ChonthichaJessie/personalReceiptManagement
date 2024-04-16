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
padding-top: 8px;
  padding-bottom: 8px;
  width: 40%;
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 500px;
  background-color: #CEA2FD;
  
`;
