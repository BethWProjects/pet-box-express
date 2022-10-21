const express = require('express');  //using Express within this file
const app = express(); //invoking the express function and assigning this value to a variable called app
// const router = express.Router()

app.set('port', process.env.PORT || 3000); //setting our port to 3000 (our door)
app.locals.title = 'Pet Box'; //assigning the title to Pet Box

// app.get('/', (request, response) => { //when I send a get request to local host 3000, I will see the response we asked for
//   response.send('Oh hey Pet Box');
// });

app.get('/', (request, response) => { //when I send a get request to local host 3000, I will see the response we asked for.  use node to run this function
    response.send('Hello World');
  });
  // get uses a callback function with two arguments, the path and the request, response param

app.locals.pets = [];

app.locals.pets = [
    { id: '1', name: 'Jessica', type: 'dog' },
    { id: '2', name: 'Marcus Aurelius', type: 'parakeet' },
    { id: '3', name: 'Craisins', type: 'cat' }
  ];

app.get('/api/v1/pets', (request, response) => {
    
    const pets = app.locals.pets;
  
    response.json({ pets });
  });

// app.get('/api/v1/pets/:id', (request, response) => {
//     // console.log(request, "<>>>>>>>> request")
//     response.json({
//       id: request.params.id
//     });
//   });

// app.get('/api/v1/pets/:id', (request, response) => {
//     // console.log(request, "<>>>>>>>> request")
//     response.json({
//       id: request.params[0]
//     });
//   });

// app.get('/api/v1/pets/:id', (request, response) => {  
//     const { id } = request.params;
//     const pet = app.locals.pets.find(pet => pet.id === id);
  
//     response.status(200).json(pet);
//   });
  //to return the entire object back, we will need to use an iterator method that finds the id that came for the request and match it to a pet inside our pet array .find()  

app.get('/api/v1/pets/:id', (request, response) => {
    const { id } = request.params;
    const pet = app.locals.pets.find(pet => pet.id === id);
    if (!pet) {
      return response.sendStatus(404);
    }
  
    response.status(200).json(pet);
  });

  app.use(express.json());
  app.post('/api/v1/pets', (request, response) => {
    const id = Date.now();
    const { name, type } = request.body;
  
    app.locals.pets.push({ id, name, type });
  
    response.status(201).json({ id, name, type });
  });

  app.put('/api/v1/pets', (request, response) => { //still need to update this function
    const { id, name, type } = request.body;
  
    app.locals.pets.push({ id, name, type });
  
    response.status(201).json({ id, name, type });
  });

  app.delete('/api/v1/pets/:id', (request, response) => {  
    const { id } = request.params;
    let pet = app.locals.pets.filter(pet => pet.id !== id);
    app.locals.pets = pet
    response.status(201).json({id});
  });

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);  //use nodemon to run this function (but you will quit the node server started in the function above)
});