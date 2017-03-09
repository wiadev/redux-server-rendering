import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, reduxForm } from 'redux-form';
import ReduxFormDropzone from '../../Common/FormDropzone';
import DocumentPreview from './DocumentPreview';
import s from './Uploads.css';

/**
  * Property upload documents sections
  * document IDs are hard coded
  * Catering menu document ID - 1
  * Events Brochure document ID - 2
  * Floorplan document ID - 3
  *
  * uploadAction passed from Onboarding container as a prop
*/

class UploadsSection extends React.Component {

  constructor(props) {
    super(props);
    this.getCateringMenus = this.getCateringMenus.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.state = {
      propertyDocuments: Object.keys(this.props.propertyDocuments).map(key => this.props.propertyDocuments[key]),
    };
  }

  getCateringMenus() {
    return this.state.propertyDocuments.filter(file => file.document_type_id === 1);
  }

  getBrochures() {
    return this.state.propertyDocuments.filter(file => file.document_type_id === 2);
  }

  getFloorPlans() {
    return this.state.propertyDocuments.filter(file => file.document_type_id === 3);
  }

  deleteFile(id) {
    this.setState({
      propertyDocuments: this.state.propertyDocuments.filter(file => file.id !== id),
    })
    this.props.handleDocumentDelete(id);
  }

  render() {
    return (
      <div className={s.uploadsWrapper}>
        <form>
          <div className={`${s.row} row`}>
            <div className={s.docUploadLabel}>
              <div className="col-md-5">
                <h4 className={s.label}>Catering Menu</h4>
                <p className={s.helperText}>PDF file types only.</p>
              </div>
              <div className="col-md-4 pull-right">
                <Field
                  name="cateringMenu"
                  component={ReduxFormDropzone}
                  className="dropZone"
                  multiple={false}
                  dropzoneOnDrop={(files, rejected, event) => this.props.uploadAction(files, 1, event)}
                />
              </div>
            </div>
            <div className={s.documentPreviews}>
              {this.getCateringMenus().map(doc => {
                return <DocumentPreview key={doc.image_url} doc={doc} handleDocumentDelete={this.deleteFile.bind(this)} />
              })}
            </div>
          </div>

          <div className={`${s.row} row`}>
            <div className={s.docUploadLabel}>
              <div className="col-md-5">
                <h4 className={s.label}>Floorplan</h4>
                <p className={s.helperText}>PDF file types only.</p>
              </div>
              <div className="col-md-4 pull-right">
                <Field
                  name="eventsBrochure"
                  component={ReduxFormDropzone}
                  className="dropZone"
                  multiple={false}
                  dropzoneOnDrop={files => this.props.uploadAction(files, 3)}
                />
              </div>
            </div>
            <div className={s.documentPreviews}>
              {this.getFloorPlans().map(doc => {
                return <DocumentPreview key={doc.image_url} doc={doc} handleDocumentDelete={this.deleteFile.bind(this)} />
              })}
            </div>
          </div>
          <div className={`${s.row} row`}>
            <div className={s.docUploadLabel}>
              <div className="col-md-5">
                <h4 className={s.label}>Events Brochure</h4>
                <p className={s.helperText}>PDF file types only.</p>
              </div>
              <div className="col-md-4 pull-right">
                <Field
                  name="termsConditions"
                  component={ReduxFormDropzone}
                  className="dropZone"
                  multiple={false}
                  dropzoneOnDrop={files => this.props.uploadAction(files, 2)}
                />
              </div>
            </div>
            <div className={s.documentPreviews}>
              {this.getBrochures().map(doc => {
                return <DocumentPreview key={doc.image_url} doc={doc} handleDocumentDelete={this.deleteFile.bind(this)} />
              })}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

UploadsSection = reduxForm({
  form: 'editPropertyUploads',
})(UploadsSection);

export default withStyles(s)(UploadsSection);
