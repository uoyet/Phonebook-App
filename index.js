const express = require('express')
const app = express()

// Tell the app to use the .json parser
app.use(express.json())


//Pathway & URL for web-app
  // Pathway
  // cd /Users/ubelejit/Documents/React-Apps/Phonebook-app

  //url 
  // http://localhost:3001/api/persons

const http = require ('http')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Get the contacts from our variable and display the at the URL
app.get('/api/persons',(req,res) => {
    res.json(persons)
})

// Info Page

app.get('/info', (req,res) => {
  const date = Date()
  const phrase_1 =   
  ` <h1>Info Page</h1><br/> 
    <p> Phonebook has the info for ${persons.length} people.</p>
    <p>${date}</p>
    `
  res.send(phrase_1)
})

// Functionality for Get request of specific ID's as a request parameter

  // URL for the get request below
// http://localhost:3001/api/persons/2

app.get('/api/persons/:id', (req,res) =>{
  // Tell express that I want to base the id that it is routing
  // from what is put in the URL
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  // log the person to be displayed
  // console.log(person)

  // Since person is a js constant it is "truthy" let's put in an if statement
  if (!person){
    res.statusMessage = 'this was a mistake'
    res.status(404).end()
  }

  res.json(person)
})

// Functionallity to delete an entry based on its id

app.delete('/api/persons/:id',(req,res) => {
  // Get the id of the person you are deleting
    // be sure to make it into a number since you will be using
    // functional programming
  const id = Number(req.params.id)
  
  // Notice that we tell express a new persons value and do
    // not make it a constant. It was already declared as a 
    // global constant 
  
  persons = persons.filter(
            person => persons.id !== id)
  // Log the persons array
  console.log(`"index.js" this is persons ${persons}`)

  res.status(204).end()          
})

// Functionality for adding a name

app.post('/api/persons', (req,res) => {
  // Tell express what to take the text
  // from the body of the request

  const body = req.body
  
  const enteredName = body.name
  const enteredNum = body.num

  // log the body constant
  // console.log (`this is body ${body}`)
  
  // Now an if statment so that IF the name or number are empty 
    // we have to an error statment is sent to the user

  // ? how do I send the error, 
  // rem to include a return to exit if statement
  
  // Make an array of the name and num for if statment
  const array = enteredName.concat(enteredNum)


  if(enteredName || enteredNum){   
    
    const person =  
        {
          id: Math.floor(Math.random()*1E4),
          name: body.name,     
          number: body.number  
        }

  persons = persons.concat(person)

  res.json(person)}

  else {res.status(404).send({ error: 'ADD A NAME' }).end}

      })

//  Test random number generator
//  console.log(`this is a random number`, Math.floor(Math.random()*1E4))
const PORT = 3001
app.listen(PORT, () => { 
    console.log(`Server running on Port ${PORT}`)
})