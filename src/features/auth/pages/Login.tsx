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
    <div>
      <Head title="Welcome to login" />
      <ContainerAuth>
        <div className="w-full h-screen flex justify-center ">
          <div className="mx-auto my-auto">
            <div className="w-[420px] p-10 bg-white rounded-2xl shadow">
              <div className="flex justify-center">
                <img alt="logo" src={R.images.logo_ver1} width={150} />
              </div>
              <div className="text-center py-4 font-semibold text-xl italic text-primary-color">
                Xin chào đến với trang quản trị
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div className="mt-2">
                    <div className="mb-1 text-medium-grey font-medium">Tài khoản</div>
                    <Input
                      placeholder="Nhập tên đăng nhập"
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
                  <div className="mt-2 ">
                    <div className="mb-1 text-medium-grey font-medium">Mật khẩu</div>
                    <InputPassword
                      placeholder="Nhập mật khẩu"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div className="text-red-500 mt-1">
                      {formik.errors.password && formik.touched.password && (
                        <p>{formik.errors.password}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center p-4 ">
                  <span className="font-bold text-primary-color cursor-pointer ">
                    FORGET PASSWORD
                  </span>
                </div>
                <div>
                  <Button
                    className="w-full p-4 bg-primary-color"
                    htmlType="submit"
                    style={{ width: '100%' }}>
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ContainerAuth>
    </div>
  );
};
