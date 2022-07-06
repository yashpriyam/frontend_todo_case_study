export const authenticateObject = localStorage.getItem("userData") || {};

export const authenticateReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      const {
        user: { name, id, email },
      } = action.payload;

      const newUsers = { id, email, name };

      localStorage.setItem("userData", JSON.stringify(newUsers));

      const updatedUserData = localStorage.getItem("userData");

      state = updatedUserData;
      return state;

    default:
      return state;
  }
};
