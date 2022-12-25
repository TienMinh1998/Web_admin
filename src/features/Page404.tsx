import R from 'assets';
import { Link } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';

const Page404 = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h2 className="sm:mb-2 sm:mx-2 font-semibold text-2xl">Page Not Found :(</h2>
        <p className="mb-4 mx-2 text-center font-medium ">
          Oops! 😖 The requested URL was not found on this server.
        </p>
        <Link to={PROTECTED_ROUTES_PATH.HOME} className="btn btn-primary">
          Back to home
        </Link>
        <div className="mt-3">
          <img alt="NotFoundPage" src={R.images.img_404} className="max-w-2xl w-full" />
        </div>
      </div>
    </div>
  );
};
export default Page404;
