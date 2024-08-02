import { useSelector, useDispatch } from "react-redux";

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
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
