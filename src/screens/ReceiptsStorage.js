import React, { useMemo, useState } from "react";
import { algoliaConfig } from "../utils/algolia";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import AlgoliaSearchLists from "../components/AlgoliaSearchLists";

const ReceiptsStorage = () => {
  return (
    <div>
      <h1>Receipts storage</h1>
      <AlgoliaSearchLists />
    </div>
  );
};

export default ReceiptsStorage;
