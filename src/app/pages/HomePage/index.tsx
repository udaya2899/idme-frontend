import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TabsBottomNav from '../../components/TabsBottomNav';
import { Sheet } from '@mui/joy';
import Box from '@mui/material/Box';
import GradientCover from '../../components/GradientCover';

export function HomePage() {
  const [creds, setCreds] = useState([]);

  const colors = ['red', 'black', 'blue', 'green', 'orange'];

  const fetchData = async () => {
    const response = await fetch(
      'https://4da14edb-1907-474b-9585-2e6eecbd8a81.mock.pstmn.io/creds',
    );
    const data = await response.json();
    setCreds(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Homepage of IDme" />
      </Helmet>
      <Box
        sx={{
          height: '90vh',
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Sheet
          sx={{
            height: '100%',
            margin: 'auto',
            position: 'relative',
          }}
          color="primary"
          variant="soft"
        >
          {creds.map((cred, index) => (
            <GradientCover
              idname={cred.type}
              idnumber={cred.id}
              topDist={(index + 1) * 75}
              cardColor={colors[index]}
            ></GradientCover>
          ))}
        </Sheet>
        <TabsBottomNav />
      </Box>
    </>
  );
}
