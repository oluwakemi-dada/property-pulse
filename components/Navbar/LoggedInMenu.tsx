import ProfileMenu from './ProfileMenu';
import Notification from './Notification';

const LoggedInMenu = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
      <Notification />

      <ProfileMenu />
    </div>
  );
};

export default LoggedInMenu;
