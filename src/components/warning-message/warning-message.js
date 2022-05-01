import React from 'react';
import { Alert } from 'antd';

const WarningMessage = ({ notFound }) => {
  const slowNetworkMsg = 'It looks like you have slow internet, please check your network settings or try again later';
  const notFoundMsg =
    'It seems that such films do not exist, or they are not yet available on our site. Try changing the query';
  const finalMessage = notFound ? notFoundMsg : slowNetworkMsg;

  return <Alert type="warning" message={finalMessage} showIcon />;
};

export default WarningMessage;
