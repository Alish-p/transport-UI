import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button, List, ListItem, ListItemText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// form components
import { Form, Field } from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import { closeTrip } from '../../../redux/slices/subtrip';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  userConfirm: Yup.boolean().oneOf([true], 'You must confirm before closing'),
});

const defaultValues = {
  userConfirm: false,
};

export function SubtripCloseDialog({ showDialog, setShowDialog, subtripId }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
    watch,
  } = methods;

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit = async (data) => {
    try {
      // Dispatch action to update subtrip with material details
      await dispatch(closeTrip(subtripId));
      enqueueSnackbar('Subtrip Closed Successfully !');
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
      title="Close Subtrip"
      content={
        <Box>
          <Form methods={methods} onSubmit={onSubmit}>
            <List sx={{ listStyle: 'decimal', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText primary="Please confirm that you have added all the related information and expenses to the sub-trip." />
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText primary="The signed LR is received without any errors." />
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText primary="You will not be able to edit this LR once it is closed." />
              </ListItem>
            </List>

            <Box mt={3} rowGap={3} columnGap={2} display="grid">
              <Field.Checkbox name="userConfirm" label="I confirm" />
            </Box>
          </Form>
        </Box>
      }
      action={
        <Stack direction="row" spacing={1}>
          <Button
            type="reset"
            onClick={() => setShowDialog(false)}
            variant="outlined"
            loading={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!watch('userConfirm')}
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Close
          </Button>
        </Stack>
      }
    />
  );
}

SubtripCloseDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  subtripId: PropTypes.string.isRequired,
};
