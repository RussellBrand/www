import { useSelector, useDispatch } from "react-redux";
import { createVoteAction } from "../reducers/anecdoteReducer";

const Alist = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    // console.log("vote", id);
    dispatch(createVoteAction(id));
  };

  return (
    <>
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
      ){" "}
    </>
  );
};

export default Alist;
