import React from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import styled from "styled-components";
import ReceiptDetails from "./ReceiptDetails";

const AlgoliaSearchLists = ({ searchClient, indexName }) => {
  const Hit = ({ hit }) => {
    const handleShowImage = () => {
      window.open(hit.imageURLs, "_blank");
    }
    return (
      <Receipt>
        <p>Receipt ID: {hit.objectID}</p>
        <p>Purchase Date: {hit.date}</p>
        <p>Category: {hit.category}</p>
        <button onClick={handleShowImage}>View receipt image</button>
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
