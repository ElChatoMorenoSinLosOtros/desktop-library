import { NavigateFunction } from 'react-router-dom';

declare global {
  interface TextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
    className?: string;
  }

  interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    isSubmit?: boolean;
    disabled?: boolean;
  }

  interface AdminResponse {
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    statusCode?: number;
    message?: string;
  }

  interface MaterialResponse {
    title?: string;
    author?: string;
    category?: string;
    isbn?: string;
    publicationYear?: number;
    pageCount?: number;
    typeMaterial?: string;
    accessToken?: string;
    statusCode?: number;
    message?: string;
  }

  interface HandleLoginSubmitProps {
    email: string;
    password: string;
  }

  interface HandleMaterialSubmitProps {
    title: string;
    author: string;
    category: string;
    materialType: string;
    publicationYear: number;
    pageCount: number;
    isbn: string;
  }

  interface Admin {
    name: string;
    email: string;
    role: string;
    accessToken: string;
  }

  interface AdminStore {
    admin: Admin;
    setName: ({ name }: { name: string }) => void;
    setEmail: ({ email }: { email: string }) => void;
    setRole: ({ role }: { role: string }) => void;
    setAccessToken: ({ accessToken }: { accessToken: string }) => void;
    setAdmin: ({ admin }: { admin: Admin }) => void;
    logout: () => void;
  }

  type Users = User[];

  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }

  interface LoginFormProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface UseHandleLoginProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface UseHandleMaterialProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface LoginFormTextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
  }

  interface MaterialFormTextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type: 'text' | 'number' | 'date';
  }

  interface LoginSubmitButtonProps {
    children: React.ReactNode;
  }

  interface MaterialSubmitButtonProps {
    children: React.ReactNode;
  }

  interface ItemListButtonProps {
    children: React.ReactNode;
    onClick: () => void;
  }

  interface SideBarItem {
    id: number;
    name: string;
    link: string;
  }

  interface SideBarMenu {
    menus: SideBarItem[];
  }

  interface SideBarItemListProps {
    name: string;
    link: string;
    navigate: NavigateFunction;
  }

  interface LogOutButtonProps {
    children: React.ReactNode;
  }

  interface LogOutButtonsProps {
    children: React.ReactNode;
    onClick: () => void;
    className: string;
  }

  interface UseLogOutProps {
    navigate: NavigateFunction;
  }
}
