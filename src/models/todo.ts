
type Status = {
  code: number;
  name: string
}

export interface Todo {
  category_id: number;
  id:        number;
  title:      string;
  body:       string;
  state:      Status;
  updatedAt: Date;
  createdAt: Date
}
