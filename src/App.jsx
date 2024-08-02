//import { useSelector, useDispatch } from "react-redux";

import { createNoteAction } from "./reducers/anecdoteReducer";

import Alist from "./components/Alist";

const App = () => {
  const createNew = (e) => {
    // console.log(e);
    e.preventDefault();
    const content = e.target["type-into-anecdote"].value;
    e.target["type-into-anecdote"].value = "";
    dispatch(createNoteAction(content));
  };

  return (
    <div>
      <Alist></Alist>
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
