import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './Tags.css';

const Tags = ({ tags }) => (
  <div>
    <ul className={s.container}>
      {tags.map(tag => (
        <li className={s.tagContainer} key={Math.floor(Math.random() * 1000)}>
          <Link className={s.tag} to={`/properties/${tag.number}/edit`}>#{tag.number}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Tags.defaultProps = {
  tags: [
    {
      number: 490282,
    },
    {
      number: 500000,
    },
    {
      number: 600000,
    },
  ],
};

export default withStyles(s)(Tags);
