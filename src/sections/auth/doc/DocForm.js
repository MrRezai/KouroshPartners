import * as Yup from 'yup';
import { useCallback, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment, styled, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../../routes/paths';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa'
import { useSnackbar } from 'notistack';
import axios from 'axios';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox, RHFUploadSingleFile } from '../../../components/hook-form';

import './DocFormStyle.css'
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0),
}));

export default function LoginForm() {

    const { enqueueSnackbar } = useSnackbar();

    const { user } = useAuth();

    const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    const [stepTwo, setStepTwo] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        realname: '',
        nationcode: '',
        tel: '',
        hometel: '',
        birthday: '',
        livecountry: '',
        livecity: '',
        liveaddress: '',
        livezipcode: '',
    };

    const methods = useForm({
        // resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://api.kouroshgames.com:3001/telegram/managerbot/sendDoc', {
                data,
                email: user.email,

            });
            enqueueSnackbar('فرم با موفقیت ثبت شد');
        } catch (error) {
            console.error(error);
            reset();
            if (isMountedRef.current) {
                // setError('afterSubmit', { ...error, message: error.message });
                enqueueSnackbar('مشکل در ثبت فرم', { variant: 'error' });
            }
        }
    };

    const handleDrop1 = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'passimage',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const handleDrop2 = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'nationimage',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const handleDrop3 = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'personimage',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ my: 2 }}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                {!!stepTwo && <>
                    <LabelStyle>تصویر شناسنامه</LabelStyle>
                    <RHFUploadSingleFile name="passimage" accept="image/*" maxSize={3145728} onDrop={handleDrop1} />
                    <LabelStyle>تصویر کارت ملی</LabelStyle>
                    <RHFUploadSingleFile name="nationimage" accept="image/*" maxSize={3145728} onDrop={handleDrop2} />
                    <LabelStyle>تصویر فرد به همراه کارت ملی </LabelStyle>
                    <RHFUploadSingleFile name="personimage" accept="image/*" maxSize={3145728} onDrop={handleDrop3} />
                </>
                }


                {!stepTwo && <>
                    <RHFTextField name="realname" label="نام و نام خانوادگی" />
                    <RHFTextField name="nationcode" label="کد ملی" />
                    <RHFTextField name="tel" label="شماره همراه" />
                    <RHFTextField name="hometel" label="تلفن ثابت" />
                    <LabelStyle>تاریخ تولد</LabelStyle>
                    <DatePicker
                        name='birthday'
                        value={"1403/01/01"}
                        format={"YYYY/MM/DD"}
                        calendar={persian}
                        locale={persianFa}
                        className="rmdp-mobile"
                        calendarPosition="bottom-right"
                    />
                    <LabelStyle>محل زندگی</LabelStyle>
                    <RHFTextField name="livecountry" label="کشور محل زندگی" />
                    <RHFTextField name="livecity" label="شهر محل زندگی" />
                    <RHFTextField name="liveaddress" multiline rows={4} label="آدرس دقیق محل زندگی" />
                    <RHFTextField name="livezipcode" label="کد پستی" />

                </>
                }


            </Stack>

            {!stepTwo &&
                <LoadingButton fullWidth size="large" onClick={() => { setStepTwo(true) }} variant="contained" loading={isSubmitting}>
                    ثبت اطلاعات
                </LoadingButton>
            }

            {!!stepTwo &&
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    ثبت مدارک
                </LoadingButton>
            }


        </FormProvider>
    );
}
