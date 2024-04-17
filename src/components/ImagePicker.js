import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

const ImagePicker = ({ onPickImage }) => {
  const onImageChange = (e) => {
    if (e.target.files.length) {
      onPickImage(e.target.files[0]);

    }
  };

  return (
    <Wrapper>
      <label onChange={onImageChange} htmlFor="formId">
         <input name="Add New Receipt" type="file" id="formId" accept="image/*" hidden/>
         <FontAwesomeIcon icon={faFileArrowUp} />
     </label>
    </Wrapper>
  );
};

export default ImagePicker;

const Wrapper = styled.div`
  margin-left: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
  font-size: 24px;
  color: white;
`;
