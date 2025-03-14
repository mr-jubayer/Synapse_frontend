import useAuth from "../../hooks/useAuth";

const ProfileIcon = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-10 ring ring-n-5 aspect-square rounded-full " />;
  }

  // if (user?.photoURL) {
  //   return (
  //     <img
  //       src={user.photoURL}
  //       alt={user.displayName}
  //       className="h-10 ring ring-n-5 aspect-square rounded-full "
  //     />
  //   );
  // }

  return (
    <div className="text-xl font-bold font-code bg-n-9 h-8 aspect-square rounded-full flex justify-center items-center shadow-inner">
      {" "}
      {user.displayName[0]}
    </div>
  );
};

export default ProfileIcon;
