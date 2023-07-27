import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Names from './components/Names'
import Message from './components/Message'
import names from './services/names' 

//~/Users/ubelejit/Documents/React-Apps/Phonebook-app/my-app

const App = () => {
  //right now persons is gonna be changing continually
  // so we are gonna have to recall that we make a copy of the object
  // and mutate it from there!
  

  // State of the  person's array that continues to change
  const [persons, setPersons] = useState([])
  
  // access the server to get the info for the names array that you have made
  //note that this is an effect so it will be occuring off the stack in our
  // axios webpack!!!
  useEffect(() => {
    //Log fetching data from the server
    //console.log('effect of fetching data for names has occured')
      names
        .getData()
        //now you have all the data!
        .then(namesFromServer =>{
          setPersons(namesFromServer) 
      })

    // log of what names.getData is  
    //console.log('this is names.getData', names.getData())
  },[]) 

  //State of the name you have typed, used for comparison of repeats!
  const [newName, setNewName] = useState('')

  // State of the Number you have added
  const [newNum, setNewNum] = useState('')

  // State of the Word you typed out like it changes with each letter
  const [newWord, setNewWord]=useState('')

  //State of the filter word you have typed out
  const [newWordFilter, setFilter]=useState([])

  //State of message that name was added
  const [newMessage,setMessage]=useState([])

  // State of the timer I am using
  const [alertOn,setAlertOn] = useState()
 
 

  // Handler to access inputs
  const specName = (name) => {
    setNewName(name.target.value)
    // console.log('the chars in the form input are',name.target.value)
  }

  const specNum = (num) => {
    setNewNum(num.target.value)
    //console.log('phone number', num.target.value)
  }

  const specFilter = (words) =>{
    setNewWord(words.target.value)
      //console.log('the newWord is...', newWord)
  }

  // Handler that handles a delete request
  const deleteRequest = (id) => {
    //console.log(`"App.js" this is the id property of deleteRequest`, id)
   

   const deleConfirm = window.confirm(`will you delete the name? `)

   if (deleConfirm === true){
   
   {/* 
    // note the property of deleteRequest is the person_id or person.id
    // so lets make a fuction handler that deletes the name line that 
    // it is on */}
    // logs if deleteRequest Button is pressed
    // console.log(`deleteRequest was called at ${id}`)
    const delUrl = `http://localhost:3001/persons/${id}`
      const deletedInfo = persons.find(info2Delete => 
        info2Delete.id === id)

      // log the id of the selected info
      // console.log(`"App.js" this is the info to be deleted`, deletedInfo)

      {/*/Now access axios library to try and delete your selected
        info per your created button. Then you'll have to select 
        what persons is gonna equall to again and set it to this
      */}

      // Delete the name
      names
        .deleteName(deletedInfo,delUrl)

      // Request the updated list
      names
        .getData()
        .then(newInfo => {
              setPersons(newInfo.filter(
                editedInfo => {
                  //log of editedInfo
                  // console.log(`"App.js" editedInfo is...`, editedInfo)
                  return editedInfo.id !==id} 
               ))})
      }
  }

  //Make a function handler to prevent the reloading of the page
  // made the list constant to be mutated
  const handleSub = (submit) => { 
    submit.preventDefault()

  {/* Name section*/}
    //console.log(submit.target)

    // Makes a list of the info about the typed name
    
    const typedName = {
        name: newName,
        number: newNum,
      }   
    //console.log('the list is...', list)
  
    {/* make a component that takes in the persons array
  and then compares it to the submit.target. then 
  if submit.target is equal to any name, then you have to 
  run the alert script

  make a constant that is a filtered array of the persons
  if you filter through and the array's length is greater than
  zero, then the alert should occur

  maybe do not put submit but newName hahaha*/}


    //Check if there is a double of name
    const copyPersons = persons.concat(typedName)
      const doubleName = copyPersons
          .filter(listMake => {
              //console.log('matching people...', listMake)
              return listMake.name === newName})
        //console.log('length of doubles array', doubleName.length)
        //console.log('contents of doubleName', doubleName)
    
    // If there is a double name  
    if (doubleName.length === 2){
        // then run the window script, with if statments for true or false
          const confirmedName = window.confirm(
            `Would you like to change the number  of ${newName}?`)

          if (confirmedName === true){
              {/* So if confirmedName is true we want 
                  we will want to change up the number of copied person
                  so we have to tell JS to run a function that does this*/}
              //log if confirmedName is true
              //console.log(`App.js, confirmedName is true`)

          
            // obtaining id, recall that this will return the 
            // whole [] so you will need to infitrate the [] with
            // .id to get the id you want
            const Object_of_numBeChange = 
                persons
                .find(idplace => {
                  return (idplace.name === newName )
                })

            const id2BeChanged = Object_of_numBeChange.id

            // Gotta make the object & reference URL for the changed num
            const changedNumObject = {
              name: newName,
              number: newNum,
              id: id2BeChanged
            }

            // log the above variable
            //console.log(`App.js, id2BeChanged is ${id2BeChanged}`)

            // Our url for the specific id that matches with the typed newName
            const delta_url = `http://localhost:3001/persons/${id2BeChanged}`
              //log the url of the changed object in the server
              //console.log(`"App.js" this is delta_url ${delta_url}`)
            
            // Change the number to the new number
            // but if the promise fails (aka name is deleted)then you must return for us
            // the name displayed saying "this name has already been removed"
            
            names 
              .changeNum(delta_url,changedNumObject)
              .catch(SendMessage => 
                { 
                  // log if you have set the message to be sent to "Message.js"
                  //console.log(`"App.js" deleted name was sent`)
                  setAlertOn(true) 
                  setMessage( { message: `${newName} is no longer in the phonebook`,
                                type: 'delStyle'})
                   setTimeout(() => 
                    {return  setAlertOn(false)
                      },5000)
                })

            // Display the new number onto the screen

            names
              .getData()
              .then(updatedData =>
                {//log updatedData
                  return setPersons(persons
                    .map(UpdatedListOfPeople =>
                      UpdatedListOfPeople.id === id2BeChanged ? changedNumObject : UpdatedListOfPeople
                ))})

                }

          if (confirmedName === false){
          //log if confirmedName is false
          //console.log(`App.js, confirmedName is false`)
          }
}

          
    // If there is not a double name
    if (doubleName.length !== 2){
         //go to the server and put the name in there
         names
          .addName(typedName) // adds the typed name + num to server
          .then(enteredName => {
            setPersons(persons.concat(enteredName)) 
            
            setNewName('') // resets the new name
            
            setNewNum('')  // resets the new num
            
            setMessage({message: `${newName} was added to the phonebook`,
                        type: 'additionStyle'}) // sets the message we need

             //console.log(`"App.js" this is alertOn`, alertOn)
            
            // Set the timer for 5 seconds
            setAlertOn(true) 
            setTimeout(() => 
               {return  setAlertOn(false)
             },5000)


          })}      
  
      // resets the what is in the form field
        
   }

  
  // Generate a list of names that comes from the filter input
    const filteredList = persons.filter(
          filPerson => {
          //console.log('filPerson is', filPerson.name.toLowerCase())
          return filPerson.name.toLowerCase() 
                      === newWord.toLowerCase()
        })
        //console.log('The first letter of the first name is'
        //  , persons[0].name[0].toLowerCase())
        //console.log('filteredList is...', filteredList)

 {/*}// hi future Ub, just make an if statement with two options 
  // of what to return  Filter with a different key 
  // for either option. So maybe you'll have to reduce your
  // your filtered list so that it makes smtg with an id, maybe not though
  // because there are unique id's already!!! Okay nvm about the reduce i think 
  // we good*/}    
  
  if (filteredList.length === 0 & newWord.length === 0){

    // return everthing
    return (
      <div>
        <h1>Phonebook</h1>
        <div>
          filter shown with: <input
                              value ={newWord}
                              onChange={specFilter}/> 
        </div>
        <div>
          {/*debug for newWord {newWord}*/}
        </div>

          {/*Now place the rendered Error Component here*/}
          <Message newMessage={newMessage} alertOn={alertOn}/>

        <h2>add a new</h2>
        <form onSubmit = {handleSub}>
          <div>


            name: <input 
                    value = {newName} 
                    onChange = {specName}/>
          </div>
          <div>
            number: <input 
                    value = {newNum}
                    onChange = {specNum}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map( person =>
            <Filter key={person.id}   person={person} 
                    newWord={newWord} filteredList ={filteredList}
                    deleteRequest={() => deleteRequest(person.id)}/>
            )}
      </div>

    )}

  else if (filteredList.length ===0)

    // return 'typing in filter...'
    return(<div>
        <h1>Phonebook</h1>
        <div>
          filter shown with: <input
                              value ={newWord}
                              onChange={specFilter}/> 

     
        </div>
        <div>
          debug for newWord {newWord}
        </div>
        <h2>add a new</h2>
        <form onSubmit = {handleSub}>
          <div>


            name: <input 
                    value = {newName} 
                    onChange = {specName}/>
          </div>
          <div>
            number: <input 
                    value = {newNum}
                    onChange = {specNum}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
          filtering...
            
      </div>
      )

  else  

    //return spec name
    return(
        <div>
          <h1>Phonebook</h1>
        <div>
          filter shown with: <input
                              value ={newWord}
                              onChange={specFilter}/> 

     
        </div>
        <div>
          debug for newWord {newWord}
        </div>
        <h2>add a new</h2>
        <form onSubmit = {handleSub}>
          <div>


            name: <input 
                    value = {newName} 
                    onChange = {specName}/>
          </div>
          <div>
            number: <input 
                    value = {newNum}
                    onChange = {specNum}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
          <Names filteredList={filteredList}/>            
      </div>
      )

  }

export default App


{/*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'one', number: '39-23-6423122', id: 4 }
  ]) */}
