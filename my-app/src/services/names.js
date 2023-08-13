import  axios  from 'axios'
// This is the axios code service, named 'names'
// we also need to import the newName and other variables to this service
const url = 'http://localhost:3001/api/persons'

// Retrieves data from the server, all the raw data
const getData = () => {
	const request = axios.get(url)
	return request.then(response => {
		//console.log
		//('getData is run & this is getData response.data...',response.data)
		return response.data})
}

// Adds a name to the server
const addName = (newObject) => {
	const request = axios.post(url, newObject)
	return request.then (response => response.data)
}

// Deletes name from the server 
// we require the object that is to be deleted and its specific url recall
// `${jsVariable}` method in the url to change it each time!
const deleteName = (deletedObject,url) => {
	const request = axios.delete(url,deletedObject)
	// we will return an array that is the new info without the deleted info
	// in it
	return request.then (response => {
		// this is the response from the delRequest
		// console.log(`"names.js" this is the del response`, response.data)
		return response.data})
}

// Changes the number of our person
const changeNum = (changedNumObject,url) => {
	const request = axios.put(changedNumObject,url)
	// we will now be putting the changedNumObject at its location in the 
	// server following the ${JSCode} method

	// now return the the list of phonenumbers with a different number for
	// at the place specified in the url
	return request.then(response => {
			// this is the response of the put request
			//console.log(`"names.js axios service" this is the changed number data`,response.data)
			return response.data})
}

const catchStrat = () => {
	console.log('error in the promise')
}

export default {
	getData:getData, 
	addName:addName,
	deleteName: deleteName,
	changeNum:changeNum,
	catchStrat:catchStrat
	}