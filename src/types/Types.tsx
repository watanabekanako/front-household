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
