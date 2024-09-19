import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// form components
import { Form, Field } from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import { resolveLR } from '../../../redux/slices/subtrip';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  remarks: Yup.string(),
});

const defaultValues = {
  remarks: '',
};

export function ResolveSubtripDialog({ showDialog, setShowDialog, subtripId }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit = async (data) => {
    try {
      // Dispatch action to update subtrip with closing details
      await dispatch(resolveLR(subtripId, data));
      enqueueSnackbar('Subtrip Resolved successfully!');
      handleReset();
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!showDialog) {
      handleReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  return (
    <ConfirmDialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      title="Resolve Subtrip"
      content={
        <Box sx={{ marginTop: '6px' }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="remarks" label="Remarks" type="text" />
            </Box>
          </Form>
        </Box>
      }
      action={
        <Stack direction="row" spacing={1}>
          <Button type="reset" onClick={handleReset} variant="outlined" loading={isSubmitting}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Resolve
          </Button>
        </Stack>
      }
    />
  );
}

ResolveSubtripDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  subtripId: PropTypes.string.isRequired,
};
