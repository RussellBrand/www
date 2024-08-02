import { useSelector, useDispatch } from "react-redux";
import { createNoteAction } from "../reducers/anecdoteReducer";

const Aform = () => {
  //   const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const createNew = (e) => {
    // console.log(e);
    e.preventDefault();
    const content = e.target["type-into-anecdote"].value;
    e.target["type-into-anecdote"].value = "";
    dispatch(createNoteAction(content));
  };
  return (
    <>
      {" "}
      <h2>Create New</h2>
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
    </>
  );
};

export default Aform;
