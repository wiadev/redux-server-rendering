import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, FieldArray, reduxForm } from 'redux-form';
import InputField from '../../Common/InputField/InputField';
import s from './galleryImagePreview.css';

const preview = ({ input }) => {
  return (
    <img width="100" height="100" src={input.value} alt="gallery" />
  )
};

const deleteButton = ({ input, index, removeGalleryImage, removeIndex }) => {
  const { value } = input;
  return (
    <div>
      <button
        type="button"
        className={s.galleryImageHolderCls}
        onClick={() => { removeGalleryImage(value); removeIndex(index); }}
      >
        ×
      </button>
      <div className={s.star}>*</div>
    </div>
  )
}


const galleryImagePreview = ({ fields, removeGalleryImage, updateImageAction, meta: { touched, error } }) => (
  <div className={s.galleryImagePreview}>
    <div>
      <button type="button" id="addGalleryPreview" className={s.addGalleryPreview} onClick={() => fields.push({})}>
        Add Image
      </button>
      {touched && error && <span>{error}</span>}
    </div>
    <div className="form-group row">
      {fields.map((image, index) =>
        <div key={index} className="col-xs-12 col-md-6">
          <div className={s.galleryImageHolder}>
            <div className={s.galleryImage}>
              <Field
                name={`${image}.image_url`}
                component={preview}
                className="form-control"
              />

              <Field
                name={image}
                component={deleteButton}
                index={index}
                removeGalleryImage={removeGalleryImage}
                removeIndex={fields.remove}
              />
            </div>

            <div className="form-group">
              <Field
                name={`${image}.name`}
                type="text"
                component="input"
                placeholder="Image Title"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <Field
                name={`${image}.description`}
                type="text"
                component="input"
                placeholder="Image Description"
                className="form-control"
              />
            </div>

          </div>
        </div>
      )}
    </div>
  </div>
);

export default withStyles(s)(galleryImagePreview);
