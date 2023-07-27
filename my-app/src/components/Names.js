const Names = ({filteredList}) => {
	return (
		<p>{filteredList[0].name} {filteredList[0].number}</p>
	)
	console.log('in Names filteredList is...', filteredList)
}

export default Names