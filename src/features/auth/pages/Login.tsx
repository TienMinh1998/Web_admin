import R from 'assets';
import { useFormik } from 'formik';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button } from 'shared/components/Button';
import { ContainerAuth } from 'shared/container/ContainerAuth';
import { Head } from 'shared/container/Head';
import { CLI_COOKIE_KEYS, CliCookieService } from 'shared/services/cli-cookie';
import * as Yup from 'yup';
import { requestLogin } from '../api/auth.api';
import './login.css';
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
      <div className="main">
        <Head title="VTH-Sing in" />
        <div className="container">
          <div className="login-item-left">
            <img className="my-image" alt="logo" src={R.images.logo_ver2} />
          </div>
          <div className="login-item-right">
            <div className="login-item-main">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div className="row-item">
                    <h3 className="row-item-title">Đăng nhập</h3>
                    <h4 className="row-item-title-detail">Đăng nhập để sử dụng hệ thống</h4>
                  </div>

                  <div className="row-item">
                    <span className="row-icon">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      className="input"
                      placeholder="Enter user name"
                      id="userName"
                      name="userName"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                    />
                    <div className="text-red-500 mt-1">
                      {formik.errors.userName && formik.touched.userName && (
                        <p>{formik.errors.userName}</p>
                      )}
                    </div>
                  </div>
                  <div className="row-item">
                    <span className="row-icon">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className="input"
                      placeholder="Nhập mật khẩu"
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div>
                      {formik.errors.password && formik.touched.password && (
                        <p>{formik.errors.password}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-3">
                  <span className="cursor-pointer font-semibold text-primary-color hover:underline">
                    Quên mật khẩu?
                  </span>
                </div>
                <div className="button-login">
                  <Button style={{ width: '100%' }} htmlType="submit">
                    Đăng nhập
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ContainerAuth>
  );
};
