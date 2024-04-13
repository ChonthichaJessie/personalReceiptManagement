import React, { useMemo, useState } from "react";
//import axios from "axios";
import { useEffect } from "react";
import { algoliaConfig } from "../utils/algolia";
import styled from "styled-components";

//Algolia Key - - Need to rebuild search bar
import algoliasearch from "algoliasearch/lite";
import AlgoliaSearchLists from "../components/AlgoliaSearchLists";


const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME } = algoliaConfig;

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

const ReceiptsStorage = () => {
  return (
    <div>
      <h1>Receipts storage</h1>
      <AlgoliaSearchLists
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
      />
    </div>
  );
};

export default ReceiptsStorage;

