import React from 'react';
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

interface Props {
  
}

const ProfilePage: React.FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  )
}

export default ProfilePage;
