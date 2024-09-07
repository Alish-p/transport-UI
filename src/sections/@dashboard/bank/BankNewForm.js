import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addBank, updateBank } from '../../../redux/slices/bank';

// ----------------------------------------------------------------------

BankForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBank: PropTypes.object,
};

export default function BankForm({ isEdit = false, currentBank }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewBankSchema = Yup.object().shape({
    bankBranch: Yup.string().required('Bank Branch is required'),
    ifscCode: Yup.string().required('IFSC Code is required'),
    place: Yup.string().required('Place is required'),
  });

  const defaultValues = useMemo(
    () => ({
      bankBranch: currentBank?.bankBranch || '',
      ifscCode: currentBank?.ifscCode || '',
      place: currentBank?.place || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBank]
  );

  const methods = useForm({
    resolver: yupResolver(NewBankSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentBank) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBank]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addBank(data));
      } else {
        await dispatch(updateBank(currentBank._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Bank added successfully!' : 'Bank edited successfully!');
      navigate(PATH_DASHBOARD.bank.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="bankBranch" label="Bank Branch" />
              <RHFTextField name="ifscCode" label="IFSC Code" />
              <RHFTextField name="place" label="Place" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Bank' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
