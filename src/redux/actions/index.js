import axios from "axios";
export const FETCH_BOOK_LIST = "FETCH_BOOK_LIST";
export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";

export const fetchBookList = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/books") //port number can vary
      .then((res) => {
        dispatch({ type: FETCH_BOOK_LIST, payload: res.data });
      })
      .catch((err) => {});
  };
};

export const addBook = (params, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/books", params)
      .then((res) => {
        dispatch({ type: ADD_BOOK, payload: res.data });
        history.push("/book-list");
      })
      .catch((err) => {});
  };
};

export const deleteBook = (id, history) => {
  return async (dispatch) => {
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then((res) => {
        dispatch({ type: DELETE_BOOK, payload: id });
        history.push("/book-list");
      })
      .catch((err) => {});
  };
};

export const updateBook = (id, params, history) => {
  return async (dispatch) => {
    axios.put(`http://localhost:8000/books/${id}`, params).then((res) => {
      dispatch({ type: UPDATE_BOOK, payload: id });
      history.push("/book-list");
    });
  };
};
