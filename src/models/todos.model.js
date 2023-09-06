import { DataTypes } from "sequelize";
import db from '../utils/db.js';

//Creamos el modelo
//nombre en singular

const Task = db.define('todos',{
    //definimos los atributos de nuestra tabla
    //title, description , completed
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    completed:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

//Exportamos el modelo
export default Task;
