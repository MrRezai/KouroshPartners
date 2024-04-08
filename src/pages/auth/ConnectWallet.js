import { useEffect, useState } from 'react';
import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// ThirdWeb
import { ConnectWallet, ThirdwebAuthProvider, useAddress, useConnectionStatus, useDisconnect } from '@thirdweb-dev/react';
import { Base } from "@thirdweb-dev/chains";
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
// import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginConnectWallet() {
  const { jwtConnectWallet } = useAuth();
  const address = useAddress();
  const { method } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [hasRunCheck, setHasRunCheck] = useState(false);

  const connectionStatus = useConnectionStatus();

  const disconnect = useDisconnect();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const [error, setError] = useState(null);
  const [errormessage, setErrorMsg] = useState(null);

  const cawtokenbalance = {
    1: "0xf3b9569F82B18aEf890De263B84189bd33EBe452",
    [Base.chainId]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  };
  
  useEffect(() => {
    if (!hasRunCheck && connectionStatus === 'connected') {
      connectWalletUser();
      // setHasRunCheck(true);
    }
  }, [hasRunCheck, connectionStatus]);

  async function connectWalletUser(){
    try {
      await jwtConnectWallet(address);
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMsg(error.message);
      disconnect();
    }
  }

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="login"
              src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to World
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Connect Your Wallet</Typography>
              </Box>

              <Tooltip title={capitalCase(method)} placement="right">
                <>
                  <Image
                    disabledEffect
                    src={`/images/cawlogo.png`}
                    sx={{ width: 56, height: 56 }}
                  />
                </>
              </Tooltip>
            </Stack>

            {!!error && <Alert style={{marginBottom: '5%'}} severity="error">{errormessage}</Alert>}

            <ConnectWallet
              theme={"dark"}
              switchToActiveChain
              modalSize={"wide"}
              hideTestnetFaucet
              className="ConnectButton-margin"
              auth={{ loginOptional: false }}
              displayBalanceToken={cawtokenbalance}
            />

            {smUp && (
              <Typography variant="body2" marginTop={'5%'}>
                You want login with Email ? {''}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                  Login Email
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
