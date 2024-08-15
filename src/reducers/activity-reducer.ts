import { Activity } from "../types"

export type ActivityAntions = //aqui van las diferentes acciones
{type:'save-activity', playload : {newActivity : Activity}}|
{type:'set-activeId', playload : {id : Activity['id']}}

export type ActivityState ={//el type que se utilice
    activities:Activity[],
    activeId:Activity['id']
}

export const initialState :ActivityState = {//aqui la el estado inicial
    activities:[],
    activeId: ''
}
export const activityReducer = (
    state:ActivityState=initialState,
    action: ActivityAntions
) => { 
    if (action.type==='save-activity') {
        return {
            ...state,
            activities:[...state.activities, action.playload.newActivity]
        }
        
    }
    if (action.type==='set-activeId') {
        return{
            ...state,activeId:action.playload.id
        }
    }
    return state
}