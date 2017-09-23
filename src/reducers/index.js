import { combineReducers } from 'redux';
import categoryReducer from './reducer_categories';
import postsReducer from './reducer_posts';
import activeCategoryReducer from './reducer_active_category';
import { reducer as formReducer } from 'redux-form';
import commentsReducer from './reducer_comments';


const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postsReducer,
  setActiveCategory: activeCategoryReducer,
  form: formReducer,
  comments: commentsReducer

});

export default rootReducer;
