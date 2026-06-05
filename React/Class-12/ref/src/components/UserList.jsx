import React from "react";
import useFetch from "../customHook/useFetch";

const UserList = () => {
  const { loading, data, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  if (error?.length > 0) {
    return <div>Something went wrong : {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {data?.map((user, idx) => {
          return (
            <li key={idx}>
              <p>Name: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
