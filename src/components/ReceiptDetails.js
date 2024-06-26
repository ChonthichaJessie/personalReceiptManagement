import React from "react";
import styled from "styled-components";

const ReceiptDetails = ({ data }) => {
  return (
    <Wrapper>
        {data && data.length !== 0 ? <p style={{ height: 168, width: 200, overflowY: "auto" }}>{data}</p> : <p>"No data"</p>}
    </Wrapper>
  );
};

export default ReceiptDetails;

const Wrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 200px;
  background-color: #f0f0f0;
`;
