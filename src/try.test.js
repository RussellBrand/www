import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import reducer from "./reducers/anecdoteReducer";
import App from "./App"; // Adjust this import path as necessary

import { createStore } from "redux";

const store = createStore(reducer);

test.only("recreate", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const user = userEvent; // .setup();

  // Now you can interact with your component
  // For example:
  // await user.click(screen.getByText('Submit'));

  // Add your assertions here
});
