export const authenticateObject = localStorage.getItem("userAuthData") || {};

export const authenticateReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      const {
        user: { name, id, email },
      } = action.payload;

      const newUsers = { id, email, name };

      localStorage.setItem("userAuthData", JSON.stringify(newUsers));

      const updatedUserData = localStorage.getItem("userAuthData");

      state = updatedUserData;
      return state;

    default:
      return state;
  }
};
