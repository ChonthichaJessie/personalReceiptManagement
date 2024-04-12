import React from "react";
import styled from "styled-components";

const ImagesDisplay = ({ imageURLs }) => {
  return (
    <Wrapper>
      {imageURLs.length > 0 && (
        <div style={{ height: 500, width: 300, overflowY: "auto" }}>
          <img
            src={imageURLs[0]}
            alt="Receipt 1"
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default ImagesDisplay;

const Wrapper = styled.div`
  background-color: #663399;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 60%;
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
