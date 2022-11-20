import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { GppGood } from '@mui/icons-material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TabsBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = React.useState(location.pathname === '/' ? 0 : 1);
  const colors = ['primary', 'success'] as const;
  const handleVerifyClick = () => {
    navigate('/verify');
  };

  const handleWalletClick = () => {
    navigate('/');
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={theme => ({
          maxWidth: 400,
          mx: 'auto',
          boxShadow: theme.shadow.sm,
          '--Tabs-gap': '8px',
          '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            boxShadow: 'none',
            borderRadius: 'lg',
            whiteSpace: 'nowrap',
            transition: '0.3s',
            fontWeight: 'lg',
            flex: 1,
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.72,
            },
          },
        })}
      >
        <TabList variant="plain" sx={{ '--List-decorator-size': '28px' }}>
          <Tab
            orientation="vertical"
            {...(index === 0 && { variant: 'soft', color: colors[0] })}
            onClick={handleWalletClick}
          >
            <ListItemDecorator>
              <BadgeOutlinedIcon />
            </ListItemDecorator>
            My Wallet
          </Tab>
          <Tab
            orientation="vertical"
            {...(index === 1 && { variant: 'soft', color: colors[1] })}
            onClick={handleVerifyClick}
          >
            <ListItemDecorator>
              <GppGood />
            </ListItemDecorator>
            Verify
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
