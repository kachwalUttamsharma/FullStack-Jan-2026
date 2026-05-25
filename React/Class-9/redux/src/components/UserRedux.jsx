import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setVal } from "../redux/UserSlice";
//import { fetchUserMiddleware } from "../redux/middleware/userMiddleware";

const UserRedux = () => {
  const { user, error, loading, val } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (val) {
  //       dispatch(fetchUserMiddleware(val));
  //     }
  //   }, [val]);

  const heading = (
    <div>
      <h2>User Example</h2>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          dispatch(setVal(e.target.value));
        }}
      />
      <button onClick={() => dispatch(fetchUsers(val))}>FetchUser</button>
    </div>
  );

  if (loading) {
    return (
      <>
        {heading}
        <h3>...Loading</h3>
      </>
    );
  }
  if (error) {
    return (
      <>
        {heading}
        <h3>Error occurred</h3>
      </>
    );
  }
  return (
    <>
      {heading}
      <h4>Name: {user?.name}</h4>
      <h4>Phone: {user?.phone}</h4>
    </>
  );
};

export default UserRedux;
