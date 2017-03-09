import axios from 'axios';
import cloudinary from 'cloudinary';
import { apiHost } from '../config';

export default function imageUpload(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    axios({
      url: `${apiHost}/api/v2/images`,
      method: 'post',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        name: req.body.name,
        description: req.body.description,
        object_type: `App\\Models\\${req.body.object_type}`,
        object_id: req.body.object_id,
        document_type_id: req.body.document_type_id,
      },
    }).then((response) => {
      res.status(200).json(response.data.data);
    }).catch((error) => {
      res.status(500).json(error.response.data);
    });
  }, {
    resource_type: 'auto',
    original_filename: req.body.name,
  });
}
