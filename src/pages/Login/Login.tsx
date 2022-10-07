/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { SyntheticEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { TextField, Button, Box, Checkbox, InputAdornment, IconButton } from '@mui/material';
import { Visibility, Person, Lock, Help, VisibilityOff } from '@mui/icons-material/';
import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from 'src/services/auth.service';
import Swal from 'sweetalert2';
import { getUser } from 'src/services/user.service';

const cx = classNames.bind(styles);

interface IFormInputs {
  userNameOrEmailAddress: string
  password: string
}
interface State {
  password: string
  showPassword: boolean
}

const schema = yup.object({
  userNameOrEmailAddress: yup.string().max(20).required(),
  password: yup.string().min(6).max(20).required()
}).required();

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    login({
      userNameOrEmailAddress: data.userNameOrEmailAddress,
      password: data.password,
      rememberClient: true
    });
    if (data.userNameOrEmailAddress !== 'admin' || data.password !== '123qwe') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something wrong happened, please try again',
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      navigate('/home');
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/home');
    }
  }, [localStorage.getItem('user')]);

  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div className={cx('login-page')}>
        <div className={cx('login__page-logo')}>
          <Link to="/login" className={cx('logo')}>Timesheet</Link>
        </div>
        <div className={cx('login__page-form')}>
          <form action="" className={cx('form')} onSubmit={handleSubmit(formSubmitHandler)}>
            <h4 className={cx('form-title')}>Log in</h4>

            <div className={cx('form-input')}>
              <div className={cx('form-title-input')}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} width='100%'>
                  <Person sx={{ fontSize: '18px', mb: '8px', mr: '8px' }} />
                  <Controller name='userNameOrEmailAddress' control={control} defaultValue='admin'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Username or email"
                        inputProps={{ style: { fontSize: 14, lineHeight: 16 } }}
                        error={!!errors.userNameOrEmailAddress}
                        helperText={errors.userNameOrEmailAddress ? errors.userNameOrEmailAddress?.message : ''}
                        InputLabelProps={{ style: { fontSize: '14px', lineHeight: '16px' } }}
                        fullWidth
                        variant='standard'
                      />
                    )}
                  />
                </Box>
              </div>
              <div className={cx('form-title-input')}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} width='100%'>
                  <Lock fontSize='small' sx={{ fontSize: '18px', mb: '8px', mr: '8px' }} />
                  <Controller name='password' control={control} defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputProps={{ style: { fontSize: 14, lineHeight: 16 } }}
                        size='small'
                        type='password'
                        label="Password"
                        InputLabelProps={{ style: { fontSize: '14px', lineHeight: '16px' } }}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password?.message : ''}
                        fullWidth variant='standard'
                      />

                    )}
                  />
                </Box>
              </div>
            </div>
            <div className={cx('form-selection')}>
              <div className={cx('remember')}>
                <Checkbox sx={{
                  padding: '0 5px 0 0',
                  fontSize: '12px',
                  '&.Mui-checked': {
                    color: '#ff4081'
                  }
                }}/>
                <span>Remember Me</span>
              </div>
              <div className={cx('login-btn')}>
                <Button
                  type='submit'
                  sx={{ textTransform: 'none', px: '16px', py: '8px', bgcolor: '#ff4081' }}
                  size="small"
                  variant="contained"
                  disabled={!!(errors.userNameOrEmailAddress ?? errors.password)}
                >
                Log in
                </Button>
              </div>
            </div>
          </form>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/home'>
            <div className={cx('google-btn')}>
              <Button sx={{ textTransform: 'none', backgroundColor: '#3f51b5' }} variant="contained" fullWidth>
            Log In With Google
              </Button>
            </div>
          </Link>
          <div className={cx('security-code-input')}>
            <TextField
              id="input-with--textfield"
              label="Security Code"
              fullWidth
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                style: { fontSize: 14, lineHeight: 16 },
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      sx={{ mr: '1px' }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <Help fontSize='small'/>

                  </InputAdornment>
                )
              }}
              InputLabelProps={{ style: { fontSize: '14px', lineHeight: '16px' } }}
              variant="standard"
            />
          </div>
        </div>
        <div className={cx('copyright')}><small>© 2022 Timesheet. <b>Version</b> 4.3.0.0 [20221606]</small></div>
      </div>

    </React.Fragment>
  );
};

export default Login;
