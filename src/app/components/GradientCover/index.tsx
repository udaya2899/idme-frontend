import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { CircularProgress, Modal, ModalDialog } from '@mui/joy';
import { QRCodeSVG } from 'qrcode.react';

export default function GradientCover(props) {
  const [open, setOpen] = React.useState(false);
  const [openedCard, setOpenedCard] = React.useState(undefined);
  const [openedCardData, setOpenedCardData] = React.useState(undefined);
  const idFromName = {
    'birth certificate': 1,
    passport: 2,
    'driving license': 3,
    diploma: 4,
  };
  const nameFromId = [
    '',
    'birth certificate',
    'passport',
    'driving license',
    'diploma',
  ];
  const handleClick = event => {
    setOpenedCard(idFromName[event.currentTarget.getAttribute('idname')]);
    setOpen(true);
  };

  const generateVerifiablePresentation = async () => {
    if (openedCard === undefined) {
      return;
    }
    const req = { typeID: Number(openedCard) };
    const response = await fetch(
      'http://131.159.209.212:8080/idme/holder/request/v1/vp',
      {
        method: 'post',
        body: JSON.stringify(req),
      },
    );
    const data = await response.json();
    setOpenedCardData(data);
  };

  useEffect(() => {
    generateVerifiablePresentation();
  }, [openedCard]);

  return (
    <>
      <Card
        sx={{
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '220px',
          width: 320,
          position: 'absolute',
          top: props.topDist,
          elevate: 10,
          backgroundColor: props.cardColor,
        }}
        onClick={handleClick}
        {...props}
      >
        <CardCover>
          <div className="glassCard" />
        </CardCover>
        <CardContent
          sx={{ justifyContent: 'flex-start', background: 'transparent' }}
        >
          <Typography
            level="h2"
            fontSize="lg"
            textColor="#000"
            mb={1}
            fontFamily="Inconsolata"
          >
            {props.idname.toUpperCase()}
          </Typography>
          <Typography
            level="h5"
            fontSize="md"
            fontFamily="Inconsolata"
            startDecorator={<AssuredWorkloadIcon />}
          >
            {props.idnumber.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography level="h5">
            Verifiable Presentation for your{' '}
            <Typography variant="outlined" color="success">
              {' '}
              {openedCard ? `${nameFromId[openedCard!].toUpperCase()}` : ''}
            </Typography>
          </Typography>
          {openedCardData ? (
            <QRCodeSVG
              value={JSON.stringify(openedCardData)}
              size={256}
              style={{ marginTop: '20px' }}
            />
          ) : (
            <CircularProgress variant="soft" />
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
