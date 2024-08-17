import { Activity } from "../types"

export type ActivityActions = //aqui van las diferentes acciones
{type:'save-activity', playload : {newActivity : Activity}}|
{type:'set-activeId', playload : {id : Activity['id']}}|
{type:'delete-activity', playload : {id : Activity['id']}}|
{type:'restard'}

export type ActivityState ={//el type que se utilice
    activities:Activity[],
    activeId:Activity['id']
}
const localStorageActivities=():Activity[]=>{
    const activities = localStorage.getItem('activities')
    return activities?JSON.parse(activities):[]
}
export const initialState :ActivityState = {//aqui la el estado inicial
    activities:localStorageActivities(),
    activeId: ''
}
export const activityReducer = (
    state:ActivityState=initialState,
    action: ActivityActions
) => {
        
    if (action.type==='save-activity') {
        let updatedActiveId:Activity[]=[]
        if (state.activeId) {
            updatedActiveId= state.activities.map(activity=>activity.id===state.activeId?action.playload.newActivity:activity)}
        else{
            updatedActiveId=[...state.activities, action.playload.newActivity]
        }
        
        return {
            ...state,
            activities:updatedActiveId,
            activeId:''
        }
        
    }
    if (action.type==='set-activeId') {
        
        return{
            ...state,activeId:action.playload.id
        }
    }
    if (action.type==='delete-activity') {
        return {...state,activities:state.activities.filter(activity=>activity.id!==action.playload.id)}
    }
    if (action.type==='restard') {
        return{
            activities:[],
            activeId:''
        }
    }
    return state
}