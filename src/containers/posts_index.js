import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts, setActivePost} from '../actions/index';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';




class Posts extends Component{
	componentDidMount(){
		this.props.getPosts()
	}

	handleClick(post){
		this.props.setPost(post)
	}


	sortList(){
		$('ul#sort').append($('ul#sort').find('li').get().reverse());
	}


	render(){
		const postsObject = this.props.posts;
		const postsArray = _.values(postsObject);
		const sortedPosts = postsArray.sort(function(a, b){
			if(b.voteScore > a.voteScore){
				return 1;
			}
			if(a.voteScore > b.voteScore){
				return -1;
			}
		})




		if(this.props.activeCategory==null){
			return(
					<div>
					<Link to='/posts/new' className='btn btn-primary'>Add a new Post</Link>
					<button className="btn-primary btn" onClick={()=>this.sortList()}> Sort by Vote Score </button>
					<ul className='list-group col-sm-8' id="sort">
					{sortedPosts.map(post=>{
						return(
							<div key={post.id} className="post_summary">
								<li  className="list-group-item">
									<Link to={`/posts/${post.id}`}>{post.body}</Link>
									<h5>Vote Score</h5>
									<p>{post.voteScore}</p>
								</li>
							</div>
							  )				

							})
					}

					</ul>
				</div>
				)
		}



		return(
			<div>
			<Link to='/posts/new' className='btn btn-primary'>Add a new Post</Link>
			<button className="btn-primary btn" onClick={()=>this.sortList()}> Sort by Vote Score </button>
			<ul className='list-group col-sm-8'>
				{sortedPosts.filter(post=>post.category == this.props.activeCategory.path).map(post=>{
					return(
						<li key={post.id} className="list-group-item">
								<Link to={`/posts/${post.id}`}>{post.body}</Link>
								<h5>Vote Score</h5>
								<p>{post.voteScore}</p>
							</li>
						  )

					}
				)}
		

			</ul>
			</div>




			)}
}

const mapDispatchToProps = (dispatch) => {
	return{
		getPosts: () => {dispatch(getPosts())},
		setPost: (post) => {dispatch(setActivePost(post))}
		
	}
}

const mapStateToProps = (state) =>{
	return {posts: state.posts, activeCategory: state.setActiveCategory};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);