export type FormState = {
  authForm: {
    email: string;
    password: string;
    error: boolean;
  };
};

export type PostState = {
  state: {
    authorId: number;
    category: [];
    categoryId: number;
    content: string;
    createdAt: string;
    price: number;
    updatedAt: string;
  };
};

export type PostAll = {
  id: number;
  authorId: number;
  category: [];
  categoryId: number;
  content: string;
  createdAt: string;
  price: number;
  updatedAt: any;
};

export type categoryGroup = {
  categoryId: Number;
  subtotal: number;
  name: string;
};
