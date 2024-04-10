import React from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import styled from "styled-components";
import ReceiptDetails from "./receiptDetails";

const AlgoliaSearchLists = ({searchClient, indexName}) => {
  const Hit = ({ hit }) => {
    return (
      <div>
        <h2>{hit.objectID}</h2>
        <p>{hit.category}</p>
        <ReceiptDetails data={hit.ocr_text} />
        <p>{hit.date}</p>
      </div>
    );
  };
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <SearchBox placeholder={"search your receipt info"}></SearchBox>
        <Hits hitComponent={Hit}/>
      </InstantSearch>
    </div>
  );
};

export default AlgoliaSearchLists;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
`;