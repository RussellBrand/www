import { test, expect } from "@jest/globals";
import deepFreeze from "deep-freeze";

import reducer from "./anecdoteReducer";
import { initialState } from "./anecdoteReducer";

test.failing("insanity check", () => {
  expect(1 + 2).toBe(2);
});

test("reducer returns initial state when called with undefined state", () => {
  const action = {
    type: "DO_NOTHING",
  };

  const result = reducer(undefined, action);
  expect(result).toEqual(initialState);
});

describe("can vote properly", () => {
  test("voted increases that one", () => {
    const action = {
      type: "VOTE",
      payload: { id: initialState[0].id },
    };

    const state = initialState;

    deepFreeze(state);
    const result = reducer(state, action);
    expect(result[0].votes).toEqual(initialState[0].votes + 1);
  });
  test("voted doesn't increase the others", () => {
    const action = {
      type: "VOTE",
      payload: { id: initialState[0].id },
    };

    const state = initialState;

    deepFreeze(state);
    const result = reducer(state, action);

    expect(result.slice(1)).toEqual(initialState.slice(1));
  });
});

test("can create new anecdote", () => {
  const action = {
    type: "NEW",
    payload: { content: "This is a new anecdote", id: "12345", votes: 0 },
  };

  const result = reducer(initialState, action);
  expect(result.length).toEqual(initialState.length + 1);
  expect(result).toContainEqual(action.payload);
});
