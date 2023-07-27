const Message = ({newMessage, alertOn}) => {
	
	// This will only run if the alertOn has been set to be true!


	// Declare the text styles
	const Styler =(style) => {

		//if the style  is the styleName then display as required
			const  additionStyle = {		color: 'red',
				fontStyle: 'italic',
				fontSize:'20',
				backgroundColor:'yellow',
				padding: '3px',
				border: '15px solid rgba(0,0,0,0.05)',
				borderColor: 'blue'
			}
			const  delStyle ={
				color: 'blue',
				border: '15px solid rgba(0,0,0,0.05)',
			}


			if (style === 'additionStyle') {
				return additionStyle 
			}

			if (style === 'delStyle') {
				return delStyle 
			}
		}
	
	// Make the message that is to be displayed
	const message = newMessage.message

	if (alertOn === true) {

		// get the message from the message
			// log the newMessage constant
			//console.log(`"Message.js" this is newMessage...`, newMessage)
			return (
					<div style={Styler(newMessage.type)}>
						<br></br> {message}
					</div>
					)
			
}
}

// historic comments & thoughts
	{/*props Message needs
		-to know which name was added to the server
	*/}
	{/* as long as the timer is true then the name will display
		 	so I made the timer be true for a set amount of time 
		 	in the App component*/}

// Note 2 Self
{/*Send in newName as it is always the name to be displayed!*/}

export default Message