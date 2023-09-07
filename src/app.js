import express from 'express';
import db from './utils/db.js';
import Task from './models/todos.model.js';
import 'dotenv/config';


Task;
const PORT = process.env.PORT ?? 9000;


//Auth
db.authenticate()
    .then(() => { console.log('DATABASE CONECTED') })
    .catch(error => console.log(error))

//Sync database
db.sync()
    .then(() => { console.log('DATABASE SYNC') })
    .catch(error => console.log(error))

const app = express();
app.use(express.json());

//Health Check
app.get('/', (req, res) => {
    res.send('OK')
});


//Creamos una tarea en la DB
app.post('/todos', async (req, res) => {
    try {
        const { body } = req;
        //Mandamos el body a la base de datos
        const task = await Task.create(body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json(error)
    }
})
//GEt para traer todas las tareas de la DB
app.get('/todos', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks)
    } catch (error) {
        res.status(400).json(error)
    }
})

//GET para traer una tarea segun su id con params
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        res.json(task)
    } catch (error) {
        res.status(400).json(error)
    }
})

//PUT Para actualizar una tarea segun id 
//PUT '/users' => path params
//PATCH '/users/update' => query params se combinan los dos
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const task = await Task.update(body, {
            where: { id }
        })
        res.json(task)
    } catch (error) {
        res.status(400).json(error);
    }

})

//DELETE TASK
app.delete('/todos/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        await Task.destroy({
            where: {id}
        })
        res.status(204).end();
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server running in PORT : ${PORT}`)
})

