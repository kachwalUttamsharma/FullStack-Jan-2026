// import { startLoading, stopLoading, userData, userErrors } from "../UserSlice";

// export const fetchUserMiddleware = (val) => {
//   if (val.length === 0 || val === null) {
//     return;
//   }

//   return async (dispatch) => {
//     try {
//       dispatch(startLoading());
//       const resp = await fetch(
//         `https://jsonplaceholder.typicode.com/users/${val}`,
//       );
//       const user = await resp.json();
//       dispatch(userData(user));
//     } catch (error) {
//       dispatch(userErrors());
//     } finally {
//       dispatch(stopLoading());
//     }
//   };
// };
