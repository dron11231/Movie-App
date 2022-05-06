import React from 'react';
import { Alert } from 'antd';

const ErrorIndicator = () => {
  return (
    <Alert
      type="error"
      message="Something went wrong, but we'll figure it out soon. 
      Try enabling VPN."
      showIcon
    />
  );
};

export default ErrorIndicator;
