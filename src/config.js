/* eslint-disable max-len */

export const port = process.env.PORT || 8000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

// TODO: set based on process.env
export const apiHost = 'https://stg-api.bizly.co';

// If app is running in any environment other than development - always use HTTPS
export const urlProtocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

};

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'Bizly Admin' },

};
