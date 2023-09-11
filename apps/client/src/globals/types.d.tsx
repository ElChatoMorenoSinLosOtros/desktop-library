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
    classNameDiv?: string;
    notRequired?: boolean;
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
    className?: string;
    notRequired?: boolean;
  }

  interface GlobalSubmitButtonProps {
    children: React.ReactNode;
    className?: string;
  }

  interface GlobalButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
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

  type SubAdmin = {
    adminId: number;
    email: string;
    name: string;
    role: string;
    actions: AdminActions;
    createdAt: Date;
    updatedAt: Date;
  };

  type SubAdminWithOutId = {
    email: string;
    name: string;
    role: string;
    actions: AdminActions;
  };

  type UpdateSubAdmin = {
    email: string;
    name: string;
    role: string;
    actions: AdminActions;
    password: string;
  };

  type GetAdminsResponse = SubAdmin[];

  type GetAdminByIdResponse = SubAdmin;

  type CreateAdminResponse = SubAdmin;

  type UpdateAdminByIdResponse = SubAdmin;

  type RemoveAdminByIdResponse = SubAdmin;

  type ActionChecked = {
    id: number;
    checked: boolean;
    action: Action;
  };

  type AdminPermissionsProps = {
    actions: ActionChecked[];
    setActions: React.Dispatch<React.SetStateAction<ActionChecked[]>>;
    disabled?: boolean;
  };

  type GlobalInfoFormProps = {
    children: React.ReactNode;
    title: string;
    subTitle?: string;
  };

  type AdminInfoPageParams = {
    id: string;
  };

  type ActionCardProps = {
    action: ActionChecked;
    disabled?: boolean;
    handleChange: ({ index }: { index: number }) => void;
    index: number;
  };

  type Notify = {
    notificationId: number;
    notificationName: string;
    notificationType: string;
    notificationDate: Date | string;
    notificationContent: string;
    notificationRead: boolean;
  };

  type GetAllNotificationsResponse = Notify[];

  type RemoveNotificationByIdResponse = Notify;

  type ClientMoreInfo = {
    totalRead: number;
    totalActiveLoans: number;
    totalFine: number;
    totalReserves: number;
  };

  type GetClientMoreInfoByIdResponse = ClientMoreInfo;

  type GetClientLoansByIdResponse = Loan[];

  type GetClientFinesByIdResponse = Fine[];

  type Fine = {
    fineId: number;
    debt: number;
    createDate: Date | string;
    paid: boolean;
    loanId: number;
    clientId: number;
  };

  type GetFinesResponse = Fine[];

  type GetFinesByIdResponse = Fine[];

  type RemoveFineByIdResponse = Fine;

  type UpdateFineByIdResponse = Fine;

  type Reserve = {
    reserveId: number;
    clientId: number;
    materialId: number;
    reserveDate: Date | string;
    executeDate: Date | string;
    returnDate: Date | string;
    executed: boolean;
  };

  type ReserveWithOutID = {
    clientId: number;
    materialId: number;
    reserveDate: Date | string;
    executeDate: Date | string;
    returnDate: Date | string;
    executed: boolean;
  };

  type CreateReserve = {
    clientId: number;
    materialId: number;
    executeDate: Date | string;
    returnDate: Date | string;
  };

  type UpdateReservePageParams = {
    id: string;
  };

  type InfoReservePageParams = {
    id: string;
  };

  type RemoveReserveByIdResponse = Reserve;

  type UpdateReserveByIdResponse = Reserve;

  type GetReserveByIdResponse = Reserve;

  type GetUserActiveReservesById = number;

  type CreateReserveResponse = Reserve;

  type GetReservesResponse = Reserve[];

  type DeleteButtonFProps = {
    onClick: () => void;
    className: string;
    type: string;
    children?: React.ReactNode;
  };
}
