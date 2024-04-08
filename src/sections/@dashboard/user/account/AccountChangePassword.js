import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../../../hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    email: user?.email || '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      reset();
      console.log(data);
      const response = await axios.post('http://api.kouroshgames.com:3001/api/account/updatePassword', {
        email: data.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (response.data.message === 'Current password incorrect') {
        enqueueSnackbar(response.data.message,{variant: 'error'});
      } else {
        enqueueSnackbar('Password با موفقیت آپدیت شد !');
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Somthing went wrong', {
        variant: 'error'
      });
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="email" type="email" style={{ display: 'none' }} />

          <RHFTextField name="oldPassword" type="password" label="رمزعبور فعلی" autoComplete="off" />

          <RHFTextField name="newPassword" type="password" label="رمزعبور جدید" />

          <RHFTextField name="confirmNewPassword" type="password" label="تکرار رمزعبور تایید" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            ذخیره تغییرات
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
