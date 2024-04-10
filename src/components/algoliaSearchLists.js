import React from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import styled from "styled-components";
import ReceiptDetails from "./receiptDetails";

const AlgoliaSearchLists = ({ searchClient, indexName }) => {
  const Hit = ({ hit }) => {
    return (
      <Receipt>
        <p>Receipt ID: {hit.objectID}</p>
        <p>Purchase Date: {hit.date}</p>
        <p>Category: {hit.category}</p>
        <p>Details: </p>
        <ReceiptDetails data={hit.ocr_text} />
      </Receipt>
    );
  };
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <SearchBox placeholder={"search your receipt info"}></SearchBox>
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
};

export default AlgoliaSearchLists;

const Receipt = styled.div`
  margin-top: 48px;
`;
