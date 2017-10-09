import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts, setActivePost, deletePost, incrementPostVote} from '../actions/index';
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

	onDeleteClick(id){
		this.props.deletePost(id, ()=>{this.props.history.push('/')});

	}

	handlePostVote(id, voteType){
		this.props.incrementPostVote(id, voteType)
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
										<button className="btn btn-danger pull-xs-right" onClick = {()=>this.onDeleteClick(post.id)}>
										Delete Post
										</button>
										<Link to={`/posts/${post.id}/edit`}>
										<button className="btn btn-primary pull-xs-right">
										Edit Post
										</button>
										</Link>
									<Link to={`/${post.category}/${post.id}`}>{post.body}</Link>
									<h5>Vote Score</h5>
									<p>{post.voteScore}</p>
									<div>
										<button onClick={()=>this.handlePostVote(post.id, 'upVote')} className='btn btn-primary'>UpVote</button>
										<button onClick={()=>this.handlePostVote(post.id, 'downVote')} className='btn btn-default'>DownVote</button>
									</div>
									<h5>Author</h5>
									<p>{post.author}</p>
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
								<button className="btn btn-danger pull-xs-right" onClick = {()=>this.onDeleteClick(post.id)}>
										Delete Post
										</button>
										<Link to={`/posts/${post.id}/edit`}>
										<button className="btn btn-primary pull-xs-right">
										Edit Post
										</button>
										</Link>
									<Link to={`/${post.category}/${post.id}`}>{post.body}</Link>
									<h5>Vote Score</h5>
									<p>{post.voteScore}</p>
									<div>
										<button onClick={()=>this.handlePostVote(post.id, 'upVote')} className='btn btn-primary'>UpVote</button>
										<button onClick={()=>this.handlePostVote(post.id, 'downVote')} className='btn btn-default'>DownVote</button>
									</div>
									<h5>Author</h5>
									<p>{post.author}</p>
							</li>
						  )

					}
				)}
		

			</ul>
			</div>




			)}
}

const mapStateToProps = (state) =>{
	return {posts: state.posts, activeCategory: state.setActiveCategory};
}

export default connect(mapStateToProps, {getPosts, setActivePost, deletePost, incrementPostVote})(Posts);