import { Task } from "./Task";

export class TaskResponse {
    content: Task[];
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
  
    constructor(
      content: Task[],
      totalElements: number,
      totalPages: number,
      numberOfElements: number
    ) {
      this.content = content;
      this.totalElements = totalElements;
      this.totalPages = totalPages;
      this.numberOfElements = numberOfElements;
    }
  }
  