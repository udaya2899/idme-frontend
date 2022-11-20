import { Box } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import TabsBottomNav from '../../components/TabsBottomNav';
import { QrReader } from 'react-qr-reader';

export default function VerifyPage() {
  const [data, setData] = useState('No result');

  async function verifyCreds(data) {
    console.log('qr scanned');
    console.log({ data });
    const response = await fetch(
      'http://131.159.209.212:8088/idme/verifier/verify/v1/vp',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(data),
      },
    );

    const responseData = await response.json();
    console.log(responseData);
  }

  useEffect(() => {
    verifyCreds(data);
  }, [data]);
  return (
    <Box>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <TabsBottomNav />
    </Box>
  );
}
