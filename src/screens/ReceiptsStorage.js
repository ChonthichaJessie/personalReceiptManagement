import React, { useMemo, useState, useEffect } from "react";
import { algoliaConfig } from "../utils/algolia";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import AlgoliaSearchLists from "../components/algoliaSearchLists";
import { Link } from "react-router-dom";

const ReceiptsStorage = ({userEmail}) => {

  return (
    <div>
      <AlgoliaSearchLists userEmail={userEmail}/>
    </div>
  );
};

export default ReceiptsStorage;
