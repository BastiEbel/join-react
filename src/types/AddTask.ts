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
  userId: string;
  title: string;
  description: string;
  contacts?: Contacts[];
  category: Category | null;
  dueDate: string;
  priority: string;
}

export interface AddTask {
  id?: string;
  userId: string;
  title: string;
  description: string;
  contacts?: Contacts[];
  category: Category | null;
  dueDate: string;
  priority: string;
  subTasks?: SubTask[];
}
