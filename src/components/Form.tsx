import { Dispatch, useEffect, useState } from "react"
import { categories } from "../data/categories"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"
type FormProps ={
    dispatch:Dispatch<ActivityActions>
    state: ActivityState
}
const initialState:Activity = {
        id:uuidv4(),
        category:1,
        name:'',
        calories:0
    }
export default function Form({dispatch,state}:FormProps) {
    const [activity,setActivity]=useState<Activity>(initialState)
    useEffect(()=>{
        if (state.activeId) {
            const selectedActivity=state.activities.filter(stateActivity=>stateActivity.id===state.activeId)[0]
            setActivity(selectedActivity)
        }
    },[state.activeId])
    const hundleChange =(e: React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField =['category','calories'].includes(e.target.id)//retorma true si estan category o calories
        //console.log(isNumberField);
        
        setActivity({
            ...activity,[e.target.id]:isNumberField?+e.target.value:e.target.value//para convertir a numero antes de setear
        })
        
    }
    const isValidActivity = () => { 
        const {name,calories} = activity
        return name.trim()!=='' && calories>0
    }
      // Determina el texto del botón basado en la categoría seleccionada
    const buttonText = activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        dispatch({type:'save-activity',playload:{newActivity:activity}})
        setActivity({...initialState,id:uuidv4()})
        
    }
    return (
        <form 
        className=" space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
        >
            
            <div className=" grid grid-cols-1 gap-3">
                <label htmlFor="category" className=" font-bold">Categoria</label>
                <select 
                className=" border border-slate-300 p-2 rounded-lg w-full bg-white" 
                id="category"
                value={activity.category}
                onChange={hundleChange}
                >
                    {
                        categories.map(categorie=>(
                            <option
                            key={categorie.id}
                            value={categorie.id}
                            
                            >
                                {categorie.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className=" grid grid-cols-1 gap-3">
                <label htmlFor="name" className=" font-bold">Actividad</label>
                <input 
                id="name"
                type="text" 
                className=" border border-slate-300 p-2 rounded-lg"
                placeholder="Ejemplo. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name}
                onChange={hundleChange}
                />
            </div>
            <div className=" grid grid-cols-1 gap-3">
                <label htmlFor="calories" className=" font-bold">Calorias</label>
                <input 
                id="calories"
                type="number" 
                className=" border border-slate-300 p-2 rounded-lg"
                placeholder="Calorias, Ejemplo 300 o 500"
                value={activity.calories}
                onChange={hundleChange}
                />
                <input 
                type="submit" 
                className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={buttonText}
                disabled={!isValidActivity()}
                />
            </div>
        </form>
        
    )
    }
/*import { Dispatch, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
};

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0 // Mantiene el valor como 0
};

export default function Form({ dispatch, state }: FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState);
    const [isCaloriesEntered, setIsCaloriesEntered] = useState(false); // Nuevo estado para manejar si el usuario ha ingresado calorías

    useEffect(() => {
    if (state.activeId) {
        const selectedActivity = state.activities.find(
        stateActivity => stateActivity.id === state.activeId
        );
        setActivity(selectedActivity || initialState);
        setIsCaloriesEntered(selectedActivity?.calories !== 0); // Ajusta isCaloriesEntered basado en el valor existente
    }
    }, [state.activeId]);

    const hundleChange = (
    e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
    ) => {
    const { id, value } = e.target;
    const newValue = id === "calories" ? +value : value;

    if (id === "calories" && value !== "0") {
        setIsCaloriesEntered(true); // Marca que se ha ingresado un valor en calorías
    }

    setActivity({
        ...activity,
        [id]: newValue
    });
    };

    const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
    };

    const buttonText =
    activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", playload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
    setIsCaloriesEntered(false); // Restablece isCaloriesEntered
    };

    return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
            Categoria
        </label>
        <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={hundleChange}
        >
            {categories.map(categorie => (
            <option key={categorie.id} value={categorie.id}>
                {categorie.name}
            </option>
            ))}
        </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
            Actividad
        </label>
        <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ejemplo. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={hundleChange}
        />
        </div>
        <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
            Calorías
        </label>
        <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorías, Ejemplo 300 o 500"
            value={isCaloriesEntered ? activity.calories : ''}
            onFocus={() => !isCaloriesEntered && setActivity({ ...activity, calories: '' })}
            onChange={hundleChange}
        />
        <input
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={buttonText}
            disabled={!isValidActivity()}
        />
        </div>
    </form>
    );
}*/
