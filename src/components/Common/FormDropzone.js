import React from 'react';
import Dropzone from 'react-dropzone';

const ReduxFormDropzone = (field) => {
  let {
    input,
    meta,
    dropzoneOnDrop,
    ...props,
  } = field;

  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles, e) => {
        field.input.onChange(acceptedFiles);
        field.dropzoneOnDrop && field.dropzoneOnDrop(acceptedFiles, rejectedFiles, e);
      }}
      {...props}
    />
  );
};

export default ReduxFormDropzone;
