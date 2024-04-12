import React from "react";
import styled from "styled-components";

const ImagePicker = ({ onPickImages }) => {
  const onImageChange = (e) => {
    if (e.target.files.length) {
      onPickImages([...e.target.files]);
    }
  };

  return (
    <div>
      <FilesInput
        type="file"
        onChange={onImageChange}
        multiple
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
