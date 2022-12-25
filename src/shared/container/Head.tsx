import { Helmet } from 'react-helmet-async';
import React from 'react';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title}` : undefined} defaultTitle="Bulletproof React">
      <meta name="description" content={description} />
    </Helmet>
  );
};
