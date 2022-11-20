import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TabsBottomNav from '../../components/TabsBottomNav';
import { Box, Button, MenuItem, MenuList, Sheet } from '@mui/joy';
import GradientCover from '../../components/GradientCover';
import Typography from '@mui/joy/Typography';
import mainLogo from './../../../assets/IDMe.png';
import { styled } from '@mui/joy/styles';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { ClickAwayListener } from '@mui/material';

const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

export function HomePage() {
  const [creds, setCreds] = useState([]);

  const colors = ['red', 'black', 'teal', 'green', 'orange'];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async event => {
    const id = Number(event.target.id);
    if (id === 1 || id === 2 || id === 3 || id === 4) {
      const req = { typeID: id };

      const allPromises = Promise.all([
        fetch('http://131.159.209.212:8080/idme/holder/issue/certificate', {
          method: 'post',
          body: JSON.stringify(req),
        }),
      ]);
    }
    setAnchorEl(null);
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      setAnchorEl(null);
    } else if (event.key === 'Escape') {
      anchorEl.focus();
      setAnchorEl(null);
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      'http://131.159.209.212:8080/idme/holder/request/v1/allvc',
      // 'https://4da14edb-1907-474b-9585-2e6eecbd8a81.mock.pstmn.io/creds',
    );
    const data = await response.json();
    setCreds(data);
  };

  useEffect(() => {
    fetchData();
  }, [anchorEl]);

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
            height: '90vh',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
          color="primary"
          variant="soft"
        >
          <Box
            sx={{
              width: 320,
              height: 50,
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img src={mainLogo} height={40} />
            <Typography
              level="h2"
              sx={{ paddingRight: '5px', paddingBottom: '7.5px' }}
            >
              Your Credentials
            </Typography>
          </Box>
          {creds.map((cred, index) => (
            <GradientCover
              idname={cred.type}
              idnumber={cred.id}
              topDist={(index + 1) * 75}
              cardColor={colors[index]}
            ></GradientCover>
          ))}
        </Sheet>
        <Box>
          <Button
            variant="solid"
            sx={{ position: 'absolute', bottom: '100px', left: '100px' }}
            onClick={handleClick}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Request Certificate
          </Button>
          <Popup
            role={undefined}
            id="composition-menu"
            open={open}
            anchorEl={anchorEl}
            disablePortal
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 4],
                },
              },
            ]}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                variant="outlined"
                onKeyDown={handleListKeyDown}
                sx={{ boxShadow: 'md', bgcolor: 'background.body' }}
              >
                <MenuItem id="2" onClick={handleClose}>
                  Passport
                </MenuItem>
                <MenuItem id="3" onClick={handleClose}>
                  Driving License
                </MenuItem>
                <MenuItem id="4" onClick={handleClose}>
                  Diploma
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Popup>
        </Box>
        <TabsBottomNav />
      </Box>
    </>
  );
}
