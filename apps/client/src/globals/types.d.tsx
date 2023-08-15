export {};

declare global {
  interface TextFieldProps {
    title: string;
    placeholder: string;
    type?: 'text' | 'password';
  }

  type Users = User[];

  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
}
