import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// ThirdWeb
// import { ConnectWallet, ThirdwebAuthProvider } from '@thirdweb-dev/react';
// import { Base } from "@thirdweb-dev/chains";
import { FaCircleCheck } from "react-icons/fa6";
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
// import { LoginForm } from '../../sections/auth/login';
import { DocForm } from '../../sections/auth/doc';

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

export default function DocVerify() {
  const { method, user } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  // const cawtokenbalance = {
  //   1: "0xf3b9569F82B18aEf890De263B84189bd33EBe452",
  //   [Base.chainId]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  // };

  return (
    <Page title="احراز هویت">
      <RootStyle>
        {/* <HeaderStyle>
        </HeaderStyle> */}

        {/* {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              درود، خوش برگشتی
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="login"
              src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
            />
          </SectionStyle>
        )} */}

        <Container maxWidth="sm">
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%', marginBottom: '10%' }}>
            <Logo disabledLink />
          </div>
          {!user.verifyrequest &&
            <>
              <ContentStyle style={{ paddingTop: '0' }}>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      احراز هویت در کوروش پارتنرز
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>لطفا اطلاعات خواسته شده را پر کنید</Typography>
                  </Box>
                </Stack>

                {/* <Alert severity="info" sx={{ mb: 3 }}>
              Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}
                <DocForm />

              </ContentStyle>
            </>}

          {!!user.verifyrequest &&
            <>
              <ContentStyle style={{ paddingTop: '0' }}>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                      شما فرم موردنظر را پر کرده اید
                      <div style={{display: 'flex', backgroundColor: '#54d62c52', padding: '1%', borderRadius: '10px'}}>
                        <FaCircleCheck style={{ color: '#54D62C' }} />
                      </div>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>تا دریافت نتیجه از طریق پیامک منتظر بمانید ! ، این ممکن است ساعاتی زمان ببرد</Typography>
                  </Box>
                </Stack>

                {/* <Alert severity="info" sx={{ mb: 3 }}>
              Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}
                {/* <DocForm /> */}

              </ContentStyle>
            </>}

        </Container>
      </RootStyle>
    </Page>
  );
}
