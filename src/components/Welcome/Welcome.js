import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Welcome.css';
import Link from '../Link';
import LoginLayout from '../LoginLayout/LoginLayout';

function Welcome({ title }) {
  return (
    <LoginLayout>
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={`${s.formTitle} text-center`}>{title}</h1>
          <iframe
            width="460"
            height="315"
            src="https://www.youtube.com/embed/W50oPQ0nmFw"
            frameBorder="0"
            allowFullScreen
          />
          <div className={s.dontShow}>
            <input type="checkbox" />Don&apos;t show this again
          </div>

          <button className={`${s.button} btn-block`}>Let&apos;s get started</button>
        </div>

        <div className="col-md-12 text-center">
          <p className={s.registerHelper}>
            <a href="/login">
              Skip the tutorial
            </a>
          </p>
        </div>

      </div>
    </LoginLayout>
  );
}

export default withStyles(s)(Welcome);
