export interface Todo {
    id?: number;
    title: string;
    completed: boolean;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';