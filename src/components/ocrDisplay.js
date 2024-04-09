import React, { useState, useEffect } from "react";
import { List } from "react-virtualized";
import styled from "styled-components";

const OcrResult = ({onImageUpload}) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (!images.length) return;
    const newImageURLs = images.map((image, index) => ({
      url: URL.createObjectURL(image),
      date: new Date().toISOString(),
      number: index + 1,
    }));
    setImageURLs(newImageURLs);
    onImageUpload(images);
  }, [images, onImageUpload]);

  onImageUpload(images);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const rowRenderer = ({ index, key, style }) => {
    const image = imageURLs[index];
    return (
      <div key={key} style={style}>
        <img
          src={image.url}
          alt={`Receipt ${image.number}`}
          style={{ cursor: "pointer", maxWidth: "100%", maxHeight: "100%", justifyContent: "center", alignItems: "center", display: "flex", margin: "auto"}}
        />
      </div>
    );
  };

  return (
    <div>
      <FilesInput
        type="file"
        onChange={onImageChange}
        multiple
        accept="image/*"
      />
      <ImageWrapper>
        {imageURLs.length > 0 && (
          <List
            width={500}
            height={500}
            rowCount={imageURLs.length}
            rowHeight={1200}
            rowRenderer={rowRenderer}
          />
        )}
      </ImageWrapper>
    </div>
  );
};

export default OcrResult;

const FilesInput = styled.input`
  margin-left: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
`;

const ImageWrapper = styled.div`
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
