const Filter = ({person,newWord, deleteRequest}) => {
		// log the id variables for the person array
		//console.log(`"Filter.js" this is the id variable`, person.id)
		
		return(
				<li>{person.name} {person.number}     
				  <button onClick={deleteRequest}>delete</button>
				</li>
			)
}

{/*I need to make a componenet named filter that filters the 
	displayed components depending on the newWord variable.
	Conditions are that if newWord is empty then you can show all
	and if newWord is 'smtg' then display the name: 'smtg'
	
	to change the text appearing as we type in the input we 
	will need to */}

{/*onClick{deleteRequest*/}

export default Filter 