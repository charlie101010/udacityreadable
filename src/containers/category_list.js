import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCategories, setActiveCategory} from '../actions/index';
import {Link} from 'react-router-dom';




class CategoryList extends Component{


	componentDidMount(){
		this.props.getCategories();
	}

	handleClick(category){
		if(category == null){
			this.props.setActiveCategory(category);
			this.props.history.push('/');
			
		}
		else{
			this.props.setActiveCategory(category);
		}

	}

	 renderList(){
		return this.props.categories.map((category)=>{	
			return(
				<Link to={`/${category.name}`} key={category.name}><li onClick={()=>this.handleClick(category)} className="list-group-item">{category.name}</li></Link>
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



const mapStateToProps = (state) =>{
	return {categories: state.categories, activeCategory: state.active, activePost: state.setActivePost};
}

export default connect(mapStateToProps, {getCategories, setActiveCategory})(CategoryList);