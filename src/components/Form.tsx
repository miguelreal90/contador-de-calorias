import { useState } from "react"
import { categories } from "../data/categories"
export default function Form() {
    const [activity,setActivity]=useState({
        category:1,
        name:'',
        calories:0



    })
    const hundleChange =(e) => {
        setActivity({
            ...activity,[e.target.id]:e.target.value
        })
        
    }
    return (
        <form 
        className=" space-y-5 bg-white shadow p-10 rounded-lg"
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
                className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value={'Guardar Comida o Guardar Ejercicio'}
                />
            </div>
        </form>
        
    )
    }
