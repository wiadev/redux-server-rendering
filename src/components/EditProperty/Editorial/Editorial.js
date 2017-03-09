import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import RenderEditorial from './RenderEditorial';
import EditorialSummary from './EditorialSummary';
import Tags from './Tags';
import GreatFor from './GreatFor';
import s from './Editorial.css';

class Editorial extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditorialSubmit = this.handleEditorialSubmit.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.state = {
      //executiveSummary: convertFromHTML(this.props.executiveSummary),
      propertyTags: this.props.propertyTags,
      propertyTagNames: this.props.propertyTags.map(tag => tag.name),
    }
  }

  handleEditorialSubmit(event) {
    event.preventDefault();
  }

  updateTags({ checked, propertyTag, tag }) {
    //console.log('UPDATING TAGS');
    // checking new tag => create new tag mapping
    if (checked && !propertyTag) {
      this.props.createTagMapping({
        tag_id: tag.id,
        object_type: "App\\Models\\Property",
        object_id: this.props.propId,
        priority: 5,
      })
    } else if(!checked && propertyTag) {
      this.props.deleteTagMapping(propertyTag.mapping_id);
    }
    //console.log({ checked, propertyTag, tag });
  }

  render() {
    const toolbar = {
      options: ['inline', 'list', 'textAlign', 'link', 'history']
    };
    return (
      <div>
        <form className={s.form} onSubmit={this.handleEditorialSubmit}>
          <Editor
            toolbarClassName={s.editorToolbar}
            toolbar={toolbar}

          />
        <Tags name="tags"
          allTags={this.props.tags}
          propertyTags={this.state.propertyTags}
          propertyTagNames={this.state.propertyTagNames}
          updateTags={this.updateTags}
        />
          {/*<FieldArray name="editorial" component={RenderEditorial} /> */}
        </form>
      </div>
    );
  }
}

Editorial = reduxForm({
  form: 'editEditorial',
})(Editorial);

Editorial = connect(
  (state, props) => {
    const { tag } = state.singleProperty;
    return ({
      initialValues: {
        executive: '',
        tags: tag,
      },
    });
  },
)(Editorial)

export default withStyles(s)(Editorial);
