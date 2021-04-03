import { FETCH_BOOK_LIST, DELETE_BOOK } from "../actions";

const initialState = {
  bookList: [],
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_LIST:
      return {
        ...state,
        bookList: action.payload,
      };

    case DELETE_BOOK:
      console.log();
      return {
        ...state,
        bookList: state.bookList.filter((item) => item.id !== action.payload),
      };
    default:
      return { ...state };
  }
};
export default books;
