import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "ZERO":
      return 0;

    default:
      return state;
  }
};

const store = createStore(reducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
