import React from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

const AlgoliaSearchLists = ({searchClient, indexName}) => {
  const Hit = ({ hit }) => {
    return (
      <div>
        <h2>{hit.objectID}</h2>
        <p>{hit.category}</p>
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