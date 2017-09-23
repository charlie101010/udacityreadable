import {ACTIVE_CATEGORY} from '../actions/index';



export default function(state = null, action){
	switch(action.type){
		case ACTIVE_CATEGORY:
		 return action.payload;
	}
	
	return state;
}