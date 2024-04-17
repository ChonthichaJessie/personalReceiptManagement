import React, { useCallback, useEffect, useState } from "react";
// import {
//   InstantSearch,
//   SearchBox,
//   Hits,
//   RefinementList,
// } from "react-instantsearch";
import styled from "styled-components";
import ReceiptDetails from "./ReceiptDetails";
import { algoliaConfig, searchClient } from "../utils/algolia";

const index = searchClient.initIndex(algoliaConfig.ALGOLIA_INDEX_NAME);
const Hit = ({ hit }) => {
  const handleShowImage = () => {
    window.open(hit.imageURLs, "_blank");
  };
  return (
    <Receipt>
      <label hidden>Receipt userEmail: {hit.userEmail}</label>
      <ReceiptDetailsWrapper>
        <ReceiptDetailsLH>
          <ReceiptIDWrappoer>
            <ReceiptInfo>Receipt ID: {hit.objectID}</ReceiptInfo>
          </ReceiptIDWrappoer>
          <ReceiptInfo>Purchase Date: {hit.date}</ReceiptInfo>
          <ReceiptInfo>Category: {hit.category}</ReceiptInfo>
          <ButtonWrapper>
            <img
              src="/background/Cat_Paw_Small_07.png"
              alt="cat paw"
              height="20px"
            />
            <Btn onClick={handleShowImage}>View receipt image</Btn>
          </ButtonWrapper>
        </ReceiptDetailsLH>
        <ReceiptDetailsRH>
          <ReceiptInfo>Details: </ReceiptInfo>
          {hit.ocr_text?.length > 0 ? (
            <ReceiptDetails data={hit.ocr_text} />
          ) : (
            <ReceiptDetails>"No data"</ReceiptDetails>
          )}
        </ReceiptDetailsRH>
      </ReceiptDetailsWrapper>
    </Receipt>
  );
};

const AlgoliaSearchLists = ({ userEmail }) => {
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState([]);

  // const searchClient = restrictedSearchClient(email);

  const doSearch = useCallback(async () => {
    const result = await index.search(search, {
      hitsPerPage: 10,
      filters: `userEmail:"${userEmail}"`,
    });
    setHits(result.hits);
  }, [userEmail, search]);

  useEffect(() => {
    doSearch();
  }, [doSearch]);

  return (
    <div>
      <SearchBar type="text" onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Search your receipts"/>
      <button onClick={doSearch} hidden/>
      {hits.map((hit) => (
        <Hit hit={hit} key={hit.objectID} />
      ))}
    </div>
  );
};

export default AlgoliaSearchLists;

const SearchBar = styled.input`
  width: 480px;
  height: 48px;
  border: 3px solid white;
  border-radius: 16px;
  margin-right: 16px;
  padding-left: 16px;
  font-size: 18px;
  `

const Receipt = styled.div`
  margin-top: 48px;
  padding-left: 48px;
  display: flex;
  flex-direction: column;
  border: 3px solid white;
  border-radius: 16px;
  padding: 24px;
`;
const ReceiptIDWrappoer = styled.div`
  display: flex;
  flex-direction: row;
  width: 480px;
`;
const ReceiptInfo = styled.text`
  font-size: 18px;
  font-family: "Times New Roman", Times, serif;
  padding-bottom: 16px;
  color: white;
`;
const ReceiptDetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ReceiptDetailsLH = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 48px;
  align-items: flex-start;
`;

const ReceiptDetailsRH = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Btn = styled.button`
  font-family: "Times New Roman", Times, serif, Helvetica, sans-serif;
  padding-left: 8px;
  border: none;
  font-size: 18px;
  color: white;
  background-color: transparent;
  cursor: pointer;
`;
