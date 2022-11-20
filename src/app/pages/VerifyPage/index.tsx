import { Box } from '@mui/joy';
import React, { useState } from 'react';
import TabsBottomNav from '../../components/TabsBottomNav';
import { QrReader } from 'react-qr-reader';

export default function VerifyPage() {
  const [data, setData] = useState('No result');

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
      <p>{data}</p>
      <TabsBottomNav />
    </Box>
  );
}
