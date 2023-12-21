import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

interface CopyrightPropsType {
  className: string;
}

const Copyright: FC<CopyrightPropsType> = ({ className }) => (
  <>
    <Typography className={className} variant="body2">
      Copyright &#169; Instinctools 2023
    </Typography>
  </>
);

export default Copyright;
