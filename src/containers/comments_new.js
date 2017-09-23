import React, {Component} from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { createComment } from '../actions/index';
import uuid from 'uuid';

class CommentsNew extends Component{



	componentDidMount(){
		console.log("nice props", this.props)
	}


	renderField(field){

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
	
	this.props.createComment({...values, id: uuid(), timestamp: Date.now(), parentId: this.props.postId});
	this.props.dispatch(reset('CommentsNewForm'));
	
};



	render(){
	
		return(

			<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
				
				<Field 
				label="Body"
				name="body"
				component={this.renderField} 

				/>
				<Field 
				label="Author"
				name="author"
				component={this.renderField} 

				/>
			
          		<Field name="id" component="input" type="hidden"/>
      			 
			

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



function mapStateToProps(state){
	return {categories: state.categories}
}

export default reduxForm({
	validate,
	form: 'CommentsNewForm'
})(
connect(mapStateToProps, {createComment})(CommentsNew)
);