import {GET_POSTS, GET_POST, INCREMENT_POST_VOTE, DELETE_POST} from '../actions/index';
import _ from 'lodash';


export default function(state = {}, action){
	switch(action.type){
		case DELETE_POST:
			return _.omit(state, action.payload)
		case INCREMENT_POST_VOTE:
			return {...state, [action.payload.data.id]: action.payload.data}
		case GET_POST:
			return {...state, [action.payload.data.id]: action.payload.data}
		case GET_POSTS:
		 return _.mapKeys(action.payload.data, 'id');;
	}
	
	return state;
}