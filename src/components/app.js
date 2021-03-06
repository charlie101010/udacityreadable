import React, { Component } from 'react';
import CategoryList from '../containers/category_list';
import Posts from '../containers/posts_index';
import {Route, Switch} from 'react-router-dom';
import PostsNew from '../containers/posts_new';
import PostShow from '../containers/post_show';
import PostsEdit from '../containers/post_edit';
import CommentsEdit from '../containers/comment_edit';




export default class App extends Component {

  render() {
    return (
    <div>
    <Switch>
     <Route path='/posts/new' render={(props) => (
        <PostsNew {...props}/>
      )}/>
    <Route path='/posts/:id/edit' render={(props) => (
      <PostsEdit {...props}/>
    )}/>
     <Route path='/comments/:id/edit' render={(props) => (
      <CommentsEdit {...props}/>
    )}/>
     <Route exact path='/:category/:post_id' render={(props) => (
      <PostShow {...props}/>
    )}/>
     <Route path='/:category' render={(props) => (
    <div>
      <CategoryList {...props} />
      <Posts {...props}/>
      </div>
    )}/>
    <Route exact path='/' render={(props) => (
    	<div>
    		<CategoryList {...props}/>
    		<Posts {...props}/>
      	</div>
      )}/>
     </Switch>
     </div>
    );
  }
}
