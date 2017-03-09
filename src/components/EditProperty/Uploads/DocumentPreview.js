import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploads.css';

function documentPreview({ doc, handleDocumentDelete }) {
  return (
    <div className={`${s.termsWrapper} col-md-4`}>
      <a
        className={s.termsUrl}
        target="_blank"
        rel="noopener noreferrer"
        href={doc.image_url}
      >
        {doc.name}
      </a>
      <button type="button" onClick={() => handleDocumentDelete(doc.id)} className={s.deleteDocument}>×</button>
    </div>
  );
}

export default withStyles(s)(documentPreview);
