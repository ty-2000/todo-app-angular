
type Color = {
  code: number;
  name: string;
}

export interface Category {
  id?:        number;
  name:       string;
  slug:       string;
  color:      Color;
  updatedAt: Date;
  createdAt: Date;
}
