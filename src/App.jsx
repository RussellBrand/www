import { useSelector, useDispatch } from "react-redux";

import { getId } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch({
      type: "VOTE",
      payload: { id },
    }); // dispatching an action to the store
  };

  const createNew = (e) => {
    console.log(e);
    e.preventDefault();
    const content = e.target["type-into-anecdote"].value;
    e.target["type-into-anecdote"].value = "";
    dispatch({
      type: "NEW",
      payload: { content, id: getId(), votes: 0 },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <div id="anecdotes">
        {anecdotes.map((anecdote) => (
          <div class="an-anecdote" key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has <span class="vote-count">{anecdote.votes}</span>
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
      <h2>create new</h2>

      <form
        id="the-form"
        onSubmit={(event) => {
          createNew(event);
          event.preventDefault();
        }}
      >
        <div>
          <input id="type-into-anecdote" />
        </div>
        <button id="create-anecdote" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default App;
