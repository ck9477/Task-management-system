import { StatusMode } from "./statusMode";

export interface ITask{
    taskId:number,
    name:string,
    description:string,
    price:number,
    scheduling: string,
    status:StatusMode
}