import React from "react";
import styled from "styled-components";

const ReceiptDetails = ({ data }) => {
  return (
    <Wrapper>
      {data.length > 0 && (
        <p style={{ height: 200, width: 200, overflowY: "auto" }}>{data}</p>
      )}
    </Wrapper>
  );
};

export default ReceiptDetails;

const Wrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  width: 40%;
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 250px;
  background-color: #cea2fd;
`;
