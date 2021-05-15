export const USER_ROUTES = {
  GET_ALL: "/get-users",
  GET_USER: "/get-user/:id",
  CREATE_USER: "/create-user",
  UPDATE_USER: "/update-user/:id",
  REMOVE_USER: "/remove-user/:id",
  GET_SUGGESTED_USERS: "/get-suggested-users",
};

export const GROUP_ROUTES = {
  GET_ALL: "/get-groups",
  GET_GROUP: "/get-group/:id",
  CREATE_GROUP: "/create-group",
  ADD_USER_TO_GROUP: "/add-user-to-group/:id",
  UPDATE_GROUP: "/update-group/:id",
  REMOVE_GROUP: "/remove-group/:id",
};
