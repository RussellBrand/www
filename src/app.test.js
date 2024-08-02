//import { expect } from "jest";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./app";

import renderer from "react-test-renderer";

import reducer from "./reducers/anecdoteReducer";

import { initialState } from "./reducers/anecdoteReducer";

const store = createStore(reducer);
test("simple test", () => {
  expect(1 + 1).toBe(2);
});

describe("...", () => {
  test("renders the right initial number of anecdotes", () => {
    const quantity = initialState.length;
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.toJSON()).toBeDefined();
    expect(component.root.findByType("div")).toBeDefined();
    const anecdoteDiv = component.root.findByProps({ id: "anecdotes" });
    expect(anecdoteDiv).toBeDefined();
    const all_anecdotes = anecdoteDiv.findAllByProps({ class: "an-anecdote" });
    expect(all_anecdotes).toHaveLength(quantity);
  });
  test("initial votes are zero", () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const anecdoteDiv = component.root.findByProps({ id: "anecdotes" });
    const all_votes = anecdoteDiv.findAllByProps({ class: "vote-count" });
    all_votes.forEach((vote) => {
      expect(vote.props.children).toBe(0);
    });
  });
  test("clicking vote increases the vote count", () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const anecdoteDiv = component.root.findByProps({ id: "anecdotes" });
    const all_votes = anecdoteDiv.findAllByProps({ class: "vote-count" });
    const vote_buttons = anecdoteDiv.findAllByType("button");
    const vote = vote_buttons[0];
    const vote_count = all_votes[0];
    const initial_vote_count = vote_count.props.children;
    vote.props.onClick();
    expect(vote_count.props.children).toBe(initial_vote_count + 1);
  });
});
