import React from "react";
import styled from "styled-components";

const ImageDisplay = ({ imageURL }) => {
  return (
    <Wrapper>
      <div style={{ height: 500, width: 300, overflowY: "auto" }}>
        <img
          src={imageURL}
          alt="Receipt 1"
          style={{
            cursor: "pointer",
            width: "100%",
          }}
        />
      </div>
    </Wrapper>
  );
};

export default ImageDisplay;

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
