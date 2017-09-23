import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { editComment, getComment} from '../actions/index';
import uuid from 'uuid';

class CommentsEdit extends Component{



	componentDidMount(){
		this.props.getComment(this.props.match.params.id);
		console.log("mad initial", this.props.initialValues)
		
		
		
		
		
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



onSubmit(values){
	
	this.props.editComment({...values, timestamp: Date.now()}, ()=>{
		this.props.history.push(`/posts/${this.props.initialValues.parentId}`);
	});
}



	render(){
		return(

			<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
				<Field 
				label="Body"
				name="body"
				component={this.renderField} 

				/>
				

			

			
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>

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
	return {initialValues: state.comments[ownProps.match.params.id]}
}


CommentsEdit = reduxForm({
	validate,
	form: 'CommentsEditForm'
})(CommentsEdit);

export default connect(mapStateToProps, {editComment, getComment})(CommentsEdit)