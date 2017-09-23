import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { editPost, getPost} from '../actions/index';
import uuid from 'uuid';

class PostsEdit extends Component{



	componentDidMount(){
		this.props.getPost(this.props.match.params.id);

		
		
		
		
		
	}



	renderField(field, props){

		const className= `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

		return(
			<div className={className}>
				<label>{field.label}</label>
				<input

				className="form-control"
				type="text"
					{...field.input}

				/>
				<div className="text-help">
				{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
			);

	}



onSubmit(values, callback){
	
	this.props.editPost(values, ()=>{
		this.props.history.push(`/posts/${this.props.match.params.id}`);
	});
};



	render(){
		return(

			<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
				<Field 
				label="Title"
				name="title"
				component={this.renderField}
			

				/>
				<Field 
				label="Body"
				name="body"
				component={this.renderField} 

				/>
				

			

			
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to={`/posts/${this.props.match.params.id}`} className="btn btn-danger">Cancel</Link>

			</form>

			)
	}
}


function validate(values){
	const errors = {};


	if(!values.title || values.title.length < 3){
		errors.title = "Enter a title that is at least 3 characters!";
	}


	if(!values.content){
		errors.content = "Enter some content please!";
	}




	// If errors is empty, the form is fine to submit
	// If errors has *any* properties, redux form assumes form is invalid
	return errors;	

}



const mapStateToProps = (state, ownProps) => {
	return {initialValues: state.posts[ownProps.match.params.id]}
}


PostsEdit = reduxForm({
	validate,
	form: 'PostsEditForm'
})(PostsEdit);

export default connect(mapStateToProps, {editPost, getPost})(PostsEdit)