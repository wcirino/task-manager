export class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dt_created: Date;
  
    constructor(
      id: number,
      title: string,
      description: string,
      completed: boolean,
      dt_created: Date
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.dt_created = dt_created;
    }
  }
  