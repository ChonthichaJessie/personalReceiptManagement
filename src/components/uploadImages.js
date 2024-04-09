import React, { useState, useEffect } from "react";
import { List } from "react-virtualized";
import styled from "styled-components";

const UploadImage = ({ onImageUpload }) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
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
          <div
            style={{ height: 500 , width: 300, overflowY: "auto" }}
          >
            <img
              src={imageURLs[0].url}
              alt={`Receipt ${imageURLs[0].number}`}
              style={{
                cursor: "pointer",
                width: '100%',
              }}
            />
          </div>
        )}
      </ImageWrapper>
    </div>
  );
};

export default UploadImage;

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
  height: 500px;
`;
