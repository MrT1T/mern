import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Copyright = ({ className }) => (
  <>
    <Typography className={className} variant="body2">
      Copyright &#169; Your Smile site 2021
    </Typography>
  </>
);

export default Copyright;

Copyright.propTypes = {
  className: PropTypes.string
};
