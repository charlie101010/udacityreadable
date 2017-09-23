import axios from 'axios';

const ROOT_URL =`http://localhost:5001`;

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY'
export const CREATE_POST = 'CREATE_POST'
export const GET_POST = 'GET_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const INCREMENT_POST_VOTE = 'INCREMENT_POST_VOTE'
export const INCREMENT_COMMENT_VOTE = 'INCREMENT_COMMENT_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getCategories = ()=> {
	const url = `${ROOT_URL}/categories`;
	const request = axios.get(url, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log(request);

	return{
		type: GET_CATEGORIES,
		payload: request

	};
}

export const getPosts= ()=> {
	const url = `${ROOT_URL}/posts`;
	const request = axios.get(url, { headers: { 'Authorization': 'whatever-you-want' }}).then();
	console.log(request);

	return{
		type: GET_POSTS,
		payload: request

	};
}


export const setActiveCategory = (category)=> {

	return{
		type: ACTIVE_CATEGORY,
		payload: category

	};
}

export const createPost = (values, callback) => {
	const url = `${ROOT_URL}/posts`;
	const request = axios.post(url, values, { headers: { 'Authorization': 'whatever-you-want' }}).then(()=>callback());
	return{
		type: CREATE_POST,
		payload: request
	}
}

export const editPost = (values, callback) => {
	const url = `${ROOT_URL}/posts/${values.id}`;
	const request = axios.put(url, values, { headers: { 'Authorization': 'whatever-you-want' }}).then(()=>callback());
	console.log("cool compiler", request);
	return{
		type: EDIT_POST,
		payload: request
	}
}

export const getPost = (id)=> {
	const url = `${ROOT_URL}/posts/${id}`;
	const request = axios.get(url, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log("post", request);
	

	return{
		type: GET_POST,
		payload: request

	};
}

export const getComments= (id)=> {
	const url = `${ROOT_URL}/posts/${id}/comments`;
	const request = axios.get(url, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log(request);

	return{
		type: GET_COMMENTS,
		payload: request

	};
}

export const getComment = (id)=> {
	const url = `${ROOT_URL}/comments/${id}/`;
	const request = axios.get(url, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log(request);

	return{
		type: GET_COMMENT,
		payload: request

	};
}

export const editComment = (values, callback) => {
	const url = `${ROOT_URL}/comments/${values.id}`;
	const request = axios.put(url, values, { headers: { 'Authorization': 'whatever-you-want' }}).then(()=>callback());
	console.log("cool compiler", request);
	return{
		type: EDIT_COMMENT,
		payload: request
	}
}



export const incrementPostVote= (id, voteType)=> {
	const url = `${ROOT_URL}/posts/${id}`;
	const request = axios.post(url, {'option': voteType}, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log(request);

	return{
		type: INCREMENT_POST_VOTE,
		payload: request

	};
}

export const incrementCommentVote= (id, voteType)=> {
	const url = `${ROOT_URL}/comments/${id}`;
	const request = axios.post(url, {'option': voteType}, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log(request);

	return{
		type: INCREMENT_COMMENT_VOTE,
		payload: request

	};
}

export const deletePost = (id, callback) => {
	const url = `${ROOT_URL}/posts/${id}`;
	const request = axios.delete(url, { headers: { 'Authorization': 'whatever-you-want' }}).then(()=>callback());
	return{
		type: DELETE_POST,
		payload: id
	}
}

export const deleteComment = (id) => {
	const url = `${ROOT_URL}/comments/${id}`;
	const request = axios.delete(url, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log("horseclinden", request)
	return{
		type: DELETE_COMMENT,
		payload: request
	}
}

export const createComment = (values) => {
	const url = `${ROOT_URL}/comments`;
	const request = axios.post(url, values, { headers: { 'Authorization': 'whatever-you-want' }});
	console.log("comments", request)
	return{
		type: CREATE_COMMENT,
		payload: request
	}
}