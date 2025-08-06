import { FaGoogle } from 'react-icons/fa';

const LoggedOutMenu = () => {
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex items-center">
        <button className="flex items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white">
          <FaGoogle className="mr-2 text-white"></FaGoogle>
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  );
};

export default LoggedOutMenu;
