import React from "react";
import styled from "styled-components";

const ImagePicker = ({ onPickImage }) => {
  const onImageChange = (e) => {
    if (e.target.files.length) {
      onPickImage(e.target.files[0]);

    }
  };

  return (
    <div>
      <FilesInput
        type="file"
        onChange={onImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default ImagePicker;

const FilesInput = styled.input`
  margin-left: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
`;
