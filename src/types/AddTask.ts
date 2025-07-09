export interface Contacts {
  value: string | undefined;
  label: string;
}

export interface Category {
  value: string | undefined;
  label: string;
}

export interface SubTask {
  id?: string;
  title: string;
  description: string;
  contacts?: Contacts[];
  category: Category | "";
  dueDate: string;
  prio: string;
}

export interface AddTask {
  id?: string;
  userId: string;
  title: string;
  description: string;
  contacts?: Contacts[];
  category: Category | null;
  dueDate: string;
  prio: string;
  subTasks?: SubTask[];
}
