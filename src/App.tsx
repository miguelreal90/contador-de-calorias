import Form from "./components/Form"
import { useReducer } from "react"
import { initialState, activityReducer } from "./reducers/activity-reducer"
import ActivitiList from "./components/ActivitiList"


function App() {

  const [state,dispatch]=useReducer(activityReducer,initialState)
  
  return (
    <>
        <header className=" bg-lime-600 py-2">
      <div className=" max-w-4xl mx-auto flex justify-between">
        <h1 className=" text-center text-lg font-bold text-white uppercase">
          Contador de Calorias 

        </h1>
      </div>
    </header>
    <section className=" bg-lime-500 py-20 px-5">
      <div className=" max-w-4xl mx-auto">
        <Form
        dispatch={dispatch}
        state={state}
        />
      </div>
    </section>
    <section className=" p-10 max-w-4xl mx-auto">
      <ActivitiList
      activities ={state.activities}
      dispatch={dispatch}
      />
    </section>
    </>

      
  )
}

export default App
