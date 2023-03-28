import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function Input({ half, name, onChange, label, autoFocus, type, handleShowPassword }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={onChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                { type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>),
        } : null}
      />
    </Grid>
  );
}
