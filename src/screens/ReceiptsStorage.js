import React from "react";
import AlgoliaSearchLists from "../components/algoliaSearchLists";
import styled from "styled-components";

const ReceiptsStorage = ({userEmail}) => {

  return (
    <Wrapper>
      <AlgoliaSearchLists userEmail={userEmail}/>
    </Wrapper>
  );
};

export default ReceiptsStorage;

const Wrapper = styled.div`
  
  padding-top: 48px;
`;
