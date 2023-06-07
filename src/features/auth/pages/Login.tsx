import R from 'assets';
import { useFormik } from 'formik';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button } from 'shared/components/Button';
import { Input, InputPassword } from 'shared/components/Input';
import { ContainerAuth } from 'shared/container/ContainerAuth';
import { Head } from 'shared/container/Head';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import * as Yup from 'yup';
import { requestLogin } from '../api/auth.api';
import '../../../Style/sb-admin-2.min.css'
import '../../../Style/sb-admin-2.css'

export const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(55, 'Maximum 55 characters').required('Required!'),
      password: Yup.string().max(55, 'Maximum 55 characters').required('Required!')
    }),
    onSubmit: async (values) => {
      try {
        const res = await requestLogin(values);
        CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, res.data.token?.replace(/"/g, ''));
        navigate(PROTECTED_ROUTES_PATH.HOME);
      } catch (error) {
        console.error('Exception ' + error);
      }
    }
  });
  return (
    <ContainerAuth>
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-10 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome back to Admin</h1>
                        <h3 className="h6 text-gray-900 mb-4">Login to use software</h3>
                      </div>
                      <form className="login-item" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input className="form-control form-control-user"
                            id="userName"
                            name="userName"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            placeholder="Enter Email Address..." />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck">Remember
                              Me</label>
                          </div>
                        </div>
                        <Button
                          className='btn btn-primary btn-user btn-block'
                          style={{ width: '100%' }}
                          htmlType="submit"> Login
                        </Button>
                        <hr />
                        <a href="index.html" className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw" /> Login with Google
                        </a>
                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                        </a>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="register.html">Create an Account!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerAuth>



  );
};
