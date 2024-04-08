import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import '@dotlottie/player-component';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome back,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
        </Typography>

        <Button variant="contained" to="#" component={RouterLink}>
          Go Now
        </Button>
      </CardContent>

      {/* <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      /> */}

      <dotlottie-player src="https://lottie.host/dd568ddd-318f-49d8-9c17-9e4d2a3b26b3/b80vhQYXbh.json" background="transparent" speed="1" style={{ width: '70%', height: '270px', margin: "auto" }} loop autoplay> </dotlottie-player>

    </RootStyle>
  );
}
