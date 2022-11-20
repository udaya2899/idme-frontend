import { Box, LinearProgress, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import TabsBottomNav from '../../components/TabsBottomNav';
import { QrReader } from 'react-qr-reader';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function VerifyPage() {
  const [data, setData] = useState(undefined);
  const [idResult, setIdResult] = useState(undefined);

  async function verifyCreds(data) {
    console.log('qr scanned');
    console.log({ data });
    if (data) {
      const response = await fetch(
        'http://131.159.209.212:8088/idme/verifier/verify/v1/vp',
        {
          method: 'post',
          body: JSON.stringify(data),
        },
      );

      const responseText = await response.text();
      if (responseText === 'The certificate is verfied') {
        setIdResult(true);
      } else {
        setIdResult(false);
      }
    }

  }

  useEffect(() => {
    verifyCreds(data);
  }, [data]);
  return (
    <Box>
      <QrReader
        style={{
          padding: 20,
        }}
        constraints={{ facingMode: 'environment' }}
        scanDelay={200}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: '80%' }}
      />

      {idResult === undefined ? <LinearProgress variant='soft' /> : <span></span>}
      {idResult === undefined ? <span></span> : idResult === true ?
        <Typography margin={10} fontWeight='lg' variant='outlined' color='success' startDecorator={<TaskAltIcon />}>Credential
          verified
          -
          Trustable</Typography> :
        <Typography variant='outlined' color='danger' fontWeight='lg'> Credential could not be verified</Typography>}
      <TabsBottomNav />
    </Box>
  );
}
