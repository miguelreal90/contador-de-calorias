import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CategorieTrackerProps={
    activities: Activity[]
} 
export default function CategorieTracker({activities}:CategorieTrackerProps) {
    const caloriesConsume = useMemo(()=>activities.reduce((total,activity)=>activity.category===1 ? total + activity.calories : total,0),[activities])
    const caloriesBurned = useMemo(()=>activities.reduce((total,activity)=>activity.category===2 ? total + activity.calories : total,0),[activities])
    return (
        <>
            <h2 className=" text-4xl font-black text-white text-center">Resumen de Calorias</h2>
            <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloriesDisplay
            calories={caloriesConsume}
            text="Consumidas"
            />
            <CaloriesDisplay
            calories={caloriesBurned}
            text="Quemadas"
            />
            <CaloriesDisplay
            calories={caloriesConsume-caloriesBurned}
            text="Diferencia"
            />
            </div>
            
        </>
    )
}
