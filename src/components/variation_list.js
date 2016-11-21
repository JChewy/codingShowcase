import React from 'react'; 
import VariationListItem from './variation_list_item'; 

const VariationList = ({variations}) => {

	const VariationItems = variations.map((variation) => {
		return <VariationListItem key={variations.indexOf(variation)} variation= {variation} />
	})

	return (
		<div>
			<h6> Variation List </h6>
			<ol>
				{VariationItems}
			</ol>
		</div>

	)

}

export default VariationList; 