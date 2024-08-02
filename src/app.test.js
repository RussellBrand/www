//import { expect } from "jest";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./app";

import renderer from "react-test-renderer";

import reducer from "./reducers/anecdoteReducer";

import { initialState } from "./reducers/anecdoteReducer";

import { fireEvent } from "@testing-library/react";

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
  test.failing("adding a new anecdote", () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const new_quote = "This is a new anecdote";
    const anecdoteDiv = component.root.findByProps({ id: "anecdotes" });
    const all_anecdotes = anecdoteDiv.findAllByProps({ class: "an-anecdote" });
    const new_anecdote = "This is a new anecdote";
    const input = component.root.findByProps({ id: "type-into-anecdote" });

    //    input.props.value= new_quote;

    fireEvent.change(input, { target: { value: new_quote } });
    const button = component.root.findByProps({ id: "create-anecdote" });
    const the_form = component.root.findByProps({ id: "the-form" });
    // input.props.onChange({ target: { value: new_anecdote } });
    // button.props.onClick();
    const updated_anecdoteDiv = component.root.findByProps({ id: "anecdotes" });
    const updated_all_anecdotes = updated_anecdoteDiv.findAllByProps({
      class: "an-anecdote",
    });
    expect(updated_all_anecdotes).toHaveLength(all_anecdotes.length + 1);
    const new_anecdote_div = updated_all_anecdotes.find((anecdote) =>
      anecdote.props.children.includes(new_anecdote)
    );
    expect(new_anecdote_div).toBeDefined();
  });
});
