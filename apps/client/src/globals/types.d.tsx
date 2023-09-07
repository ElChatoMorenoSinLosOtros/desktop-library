import { NavigateFunction } from 'react-router-dom';

export {};

declare global {
  interface TextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
    className?: string;
    classNameTitle?: string;
    disabled?: boolean;
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
    actions?: AdminActions;
  }

  interface UseLoginProps {
    email: string;
    password: string;
    office: string;
    isRegister: boolean;
  }

  interface HandleLoginSubmitProps {
    email: string;
    password: string;
  }

  type Action = {
    id: number;
    title: string;
    url: string;
  };

  type AdminActions = {
    menu: Action[];
  };

  interface Admin {
    name: string;
    email: string;
    role: string;
    accessToken: string;
    actions: AdminActions;
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

  interface DeleteStore {
    type: string;
    onClick: () => void;
    setOnClick: ({ onClick }: { onClick: () => void }) => void;
    setType: ({ type }: { type: string }) => void;
  }

  interface OfficeStore {
    office: string;
    setOffice: ({ office }: { office: string }) => void;
  }

  interface LoginFormProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface UseHandleLoginProps {
    setError: React.Dispatch<React.SetStateAction<string>>;
  }

  interface LoginFormTextFieldProps {
    title: string;
    name: string;
    placeholder: string;
    type: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
    disabled?: boolean;
  }

  interface LoginSubmitButtonProps {
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

  interface MenuOptionButtonProps {
    src: string;
    title: string;
    navigate: NavigateFunction;
  }

  interface OptionMenu {
    id: number;
    url: string;
    title: string;
  }

  interface OptionsMenu {
    menu: OptionMenu[];
  }

  interface GlobalFormProps {
    title: string;
    children: React.ReactNode;
    subTitle: string;
  }

  interface GlobalTextFieldProps {
    title: string;
    name: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
    disabled?: boolean;
  }

  interface GlobalSubmitButtonProps {
    children: React.ReactNode;
    className?: string;
  }

  interface GlobalButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
  }

  type User = {
    clientId: number;
    name: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber: number;
    typeUser: string;
  };

  type GetUsersResponse = User[];

  type GetUserByIdResponse = User;

  type RemoveUserByIdResponse = User;

  type InfoPersonPageParams = {
    id: string;
  };

  interface CommonHeaderProps {
    title: string;
    subTitle?: string;
  }

  interface GlobalListProps {
    title: string;
    children: React.ReactNode;
  }

  interface DeleteButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className: string;
  }

  interface GlobalSelectFilterProps {
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultValue: string;
    options: string[];
  }

  interface GlobalFilterPerson {
    value: string;
    children: React.ReactNode;
    isDisabled?: boolean;
  }

  interface LineProps {
    className?: string;
  }

  interface GlobalSearchInputProps {
    inputValue: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  type Client = {
    name: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber: number;
    typeUser: string;
  };

  type CreateUserResponse = User;

  type UpdateUserByIdResponse = User;

  type NewDataPersonPageParams = {
    id: string;
  };

  interface GlobalTextProps {
    title: string;
    text: string;
    className?: string;
  }

  interface InfoPersonProps {
    title: string;
    number: number;
    isDouble?: boolean;
  }

  type UpdateLoanPageParams = {
    id: string;
  };

  type Material = {
    materialId: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationYear: number;
    pageCount: number;
    quantity: number;
    available: boolean;
    type_material: string;
  };

  type Loan = {
    loanId: number;
    clientId: number;
    materialId: number;
    loanDate: Date | string;
    returnDate: Date | string;
    returned: boolean;
  };

  type LoanWithOutID = {
    clientId: number;
    materialId: number;
    loanDate: Date | string;
    returnDate: Date | string;
    returned: boolean;
  };

  type MaterialWithOutID = {
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationYear: number;
    pageCount: number;
    quantity: number;
    available: boolean;
    type_material: string;
  };

  type GetMaterialsResponse = Material[];

  type GetMaterialByIdResponse = Material;

  type GetUserActiveLoansById = number;

  type GetUserTotalReadById = number;

  type CreateMaterialResponse = Material;

  type RemoveMaterialByIdResponse = Material;

  type UpdateMaterialByIdResponse = Material;

  type CreateLoanResponse = Loan;

  type GetLoansResponse = Loan[];

  type RemoveLoanByIdResponse = Loan;

  type UpdateLoanByIdResponse = Loan;

  type NewDataMaterialPageParams = {
    id: string;
  };

  type InfoMaterialPageParams = {
    id: string;
  };

  type Office = {
    officeId: number;
    name: string;
    created_at: string;
    updated_at: string;
  };

  type GetOfficesResponse = Office[];

  type GetOfficeByIdResponse = Office;

  type CreateOfficeResponse = Office;

  type RemoveOfficeByIdResponse = Office;

  type UpdateOfficeByIdResponse = Office;

  type OfficeWithoutId = {
    name: string;
  };

  type InfoLoanPageParams = {
    id: string;
  };

  type GetLoanByIdResponse = Loan[];

  interface OfficeName {
    office: string;
  }

  type Return = {
    returnId: number;
    loanId: number;
    returnDate: Date | string;
  };

  type ReturnWithOutId = {
    loanId: number;
  };

  type CreateReturnResponse = Return;

  type GetReturnByLoanIdResponse = Return;

  interface Auth {
    isLoggedIn: boolean;
  }

  interface AuthStore {
    auth: Auth;
    login: () => void;
    logout: () => void;
  }
}
