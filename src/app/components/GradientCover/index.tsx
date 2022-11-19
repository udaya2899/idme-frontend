import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

export default function GradientCover(props) {
  const handleCardClick = () => {};
  return (
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
      onClick={handleCardClick}
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
  );
}
