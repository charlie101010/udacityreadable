import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCategories, setActiveCategory} from '../actions/index';
import {Link} from 'react-router-dom';




class CategoryList extends Component{


	componentDidMount(){
		this.props.getCats();
	}

	handleClick(category){
		console.log(category);
		this.props.setAct(category);

	}

	 renderList(){
		return this.props.categories.map((category)=>{	
			return(
				<li key={category.name} onClick={()=>this.handleClick(category)} className="list-group-item">{category.name}</li>
			)
		})
	}

	render(){
		return(
		<div>
			<h2> Click on a Category to Filter Posts </h2>
			<div className="btn-toolbar">
				<button className="btn btn-primary" onClick={()=>this.handleClick(null)}>Show Posts from All Categories</button>
			</div>
			<ul className='list-group col-sm-4'>
		      	{this.renderList()}
		      
		     </ul>
		   	
		</div>     


			)
	}


}





const mapDispatchToProps = (dispatch) => {
	return{
		getCats: () => {dispatch(getCategories())},
		setAct: (category) => {dispatch(setActiveCategory(category))},
		setActivePost: (post) => {dispatch(setActivePost(post))}
	}
}

const mapStateToProps = (state) =>{
	return {categories: state.categories, activeCategory: state.active, activePost: state.setActivePost};
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);