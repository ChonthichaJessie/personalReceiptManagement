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
      <p>Receipt ID: {hit.userEmail}</p>
      <p>Receipt ID: {hit.objectID}</p>
      <p>Purchase Date: {hit.date}</p>
      <p>Category: {hit.category}</p>
      <button onClick={handleShowImage}>View receipt image</button>
      <p>Details: </p>
      {hit.ocr_text?.length > 0 ? (
        <ReceiptDetails data={hit.ocr_text} />
      ) : (
        <p>"No data"</p>
      )}
    </Receipt>
  );
};

const AlgoliaSearchLists = () => {
  const email = "chonthicha.pc@gmail.com";
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState([]);

  // const searchClient = restrictedSearchClient(email);

  const doSearch = useCallback(async () => {
    const result = await index.search(search, {
      hitsPerPage: 10,
      filters: `userEmail:"${email}"`,
    });
    setHits(result.hits);
  }, [email, search]);

  useEffect(() => {
    doSearch();
  }, [doSearch]);

  return (
    <div>
      <input type="text" onChange={(e) => setSearch(e.currentTarget.value)} />
      <button onClick={doSearch}>Search</button>
      {hits.map((hit) => (
        <Hit hit={hit} />
      ))}
      {/* <InstantSearch searchClient={searchClient} indexName={indexName}>
        <SearchBox placeholder={"search your receipt info"}></SearchBox>
        <RefinementList attribute="date" />
        <Hits hitComponent={Hit} />
      </InstantSearch> */}
    </div>
  );
};

export default AlgoliaSearchLists;

const Receipt = styled.div`
  margin-top: 48px;
`;

