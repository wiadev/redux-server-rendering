import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ReduxFormDropzone from '../../Common/FormDropzone';
import s from './General.css';
import debounce from '../../Common/debounce';

class GeneralRoomInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryPreview: [],
    };

    // this.updateProperty = debounce(this.updateProperty.bind(this), 1000);
    this.handleGalleryDrop = this.handleGalleryDrop.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.property = props.property;
  }

  updateRoom(formValues) {
    event.preventDefault();
    this.props.handleForm(formValues, this.property.data.id);
  }

  handleGalleryDrop(files) {
    const image = new Image();

    image.onload = () => {
      // draw the aImg onto the canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const minDimmention = Math.min(image.width, image.height);
      const widthDiff = Math.floor((image.width - minDimmention) / 2);
      const heightDiff = Math.floor((image.height - minDimmention) / 2);
      canvas.width = 100;
      canvas.height = 100;
      const kx = minDimmention / 100;
      const cropCoords = {
        topLeft: {
          x: widthDiff,
          y: heightDiff,
        },
        bottomRight: {
          x: widthDiff + minDimmention,
          y: heightDiff + minDimmention,
        },
      };

      ctx.drawImage(image, cropCoords.topLeft.x, cropCoords.topLeft.y,
        cropCoords.bottomRight.x, cropCoords.bottomRight.y, 0, 0,
        (image.width - widthDiff) / kx, (image.height - heightDiff) / kx);

      const galleryPreview = this.state.galleryPreview.slice();
      galleryPreview.push(canvas.toDataURL());
      this.setState({
        galleryPreview,
      });
      document.getElementById('addGalleryPreview').click();
    };

    image.src = files[0].preview;
  }

  removeGalleryImage(index) {
    const galleryPreview = this.state.galleryPreview.slice();
    galleryPreview.splice(index, 1);
    this.setState({
      galleryPreview,
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    const galleryImagePreview = ({ fields, meta: { touched, error } }) => (
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
                  <img role="presentation" src={this.state.galleryPreview[index]} />
                  <button
                    type="button"
                    className={s.galleryImageHolderCls}
                    onClick={() => {
                      this.removeGalleryImage(index); fields.remove(index);
                    }}
                  >
                    ×
                  </button>
                  <div className={s.star}>*</div>
                </div>

                <div className="form-group">
                  <Field
                    name={`${image}.title`}
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

    return (
      <div>
        <form onSubmit={handleSubmit(this.updateRoom)}>
          <div className="form-group row">
            <div className="col-md-4">
              <label htmlFor="name">Room Name</label>
              <p>Name as you would like it to appear in the listing</p>
            </div>
            <div className="col-md-6 pull-right">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="i.e Boardroom Suite"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <h4>Room Imagery</h4>
              <p>Please upload at least one image for this room. Must be high-res—JPG or PNG files only.</p>
            </div>
            <div className="col-md-6 pull-right">
              <Field
                name={"image_url"}
                component={ReduxFormDropzone}
                className="dropZone"
                multiple={false}
                dropzoneOnDrop={this.handleGalleryDrop}
              />
            </div>
          </div>

          <div className={`${s.galleryHolder} ${this.state.galleryPreview.length === 0 ? 'hidden' : ''}`}>
            <FieldArray name="galleryImages" component={galleryImagePreview} />
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <label htmlFor="area">Square Footage of Room</label>
              <p>Numbers are in square feet.</p>
            </div>
            <div className="col-md-5 pull-right">
              <Field
                name="area"
                component="input"
                type="text"
                placeholder="i.e. 2500 sq ft"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <label htmlFor="location">On What floor is this room located?</label>
            </div>
            <div className="col-md-5 pull-right">
              <Field
                name="location"
                component="input"
                type="text"
                placeholder="i.e. 2nd Floor"
                className="form-control"
              />
            </div>
          </div>

          <div className={`${s.formSection} form-group row`}>
            <div className="col-md-4">
              <label htmlFor="hours" className={s.label}>
                Time required in between bookings?
                <p>We recommend two hours.</p>
              </label>
            </div>
            <div className="col-md-5 pull-right">
              <Field
                name="hours"
                component="select"
                className="form-control"
              >
                <option>None</option>
                <option>1 hour</option>
                <option>10 hours</option>
              </Field>
            </div>
          </div>

          <div className={`${s.formSection} form-group row`}>
            <div className="col-md-4">
              <label htmlFor="length" className={s.label}>
                Minimum Booking Length
                <p>We recommend two hours.</p>
              </label>
            </div>
            <div className="col-md-5 pull-right">
              <Field
                name="length"
                component="select"
                className="form-control"
              >
                <option>None</option>
                <option>1 hour</option>
                <option>10 hours</option>
              </Field>
            </div>
          </div>

          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

GeneralRoomInfo = reduxForm({
  form: 'editRoomGeneral',
  enableReinitialize: true,
})(GeneralRoomInfo);

GeneralRoomInfo = connect(
  state => ({
    initialValues: (state.room.data && state.room.data.attributes) || {},
  }),
)(GeneralRoomInfo);

export default withStyles(s)(GeneralRoomInfo);
