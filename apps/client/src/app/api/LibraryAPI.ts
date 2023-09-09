import useAdminStore from '@store/AdminStore';
import axios from 'axios';

const LibraryAPI = axios.create({
  baseURL: 'http://localhost:3000/api'
});

const LibraryAPIService = () => {
  const { admin } = useAdminStore();

  const login = async ({
    email,
    password
  }: HandleLoginSubmitProps): Promise<AdminResponse> => {
    return LibraryAPI.post<AdminResponse>('/auth/login', {
      email,
      password
    })
      .then(resp => {
        return resp.data;
      })
      .catch((err: Error) => {
        return {
          message: 'Invalid Credentials',
          statusCode: 401,
          name: err.name
        };
      });
  };

  const getAdmins = async (): Promise<GetAdminsResponse> => {
    return LibraryAPI.get<GetAdminsResponse>('/admins', {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getAdminById = async ({
    id
  }: {
    id: number;
  }): Promise<GetAdminByIdResponse> => {
    return LibraryAPI.get<GetAdminsResponse>(`/admins/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data[0];
    });
  };

  const removeAdminById = async ({
    id
  }: {
    id: number;
  }): Promise<RemoveAdminByIdResponse> => {
    return LibraryAPI.delete<RemoveAdminByIdResponse>(`/admins/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const createAdmin = async ({
    subAdmin
  }: {
    subAdmin: SubAdminWithOutId;
  }): Promise<CreateUserResponse> => {
    return LibraryAPI.post<CreateUserResponse>(`/admins`, subAdmin, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const updateAdminById = async ({
    subAdmin,
    id
  }: {
    subAdmin: UpdateSubAdmin;
    id: number;
  }): Promise<UpdateAdminByIdResponse> => {
    return LibraryAPI.patch<UpdateAdminByIdResponse>(
      `/admins/${id}`,
      subAdmin,
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }
    ).then(resp => {
      return resp.data;
    });
  };

  const getUsers = async (): Promise<GetUsersResponse> => {
    return LibraryAPI.get<GetUsersResponse>('/clients', {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getUserById = async ({
    id
  }: {
    id: string;
  }): Promise<GetUserByIdResponse> => {
    return LibraryAPI.get<GetUsersResponse>(`/clients/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data[0];
    });
  };

  const removeUserById = async ({
    id
  }: {
    id: string;
  }): Promise<RemoveUserByIdResponse> => {
    return LibraryAPI.delete<RemoveUserByIdResponse>(`/clients/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const createUser = async ({
    client
  }: {
    client: Client;
  }): Promise<CreateUserResponse> => {
    return LibraryAPI.post<CreateUserResponse>(`/clients`, client, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const updateUserById = async ({
    client,
    id
  }: {
    client: Client;
    id: number;
  }): Promise<UpdateUserByIdResponse> => {
    return LibraryAPI.patch<UpdateUserByIdResponse>(`/clients/${id}`, client, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getMaterials = async (): Promise<GetMaterialsResponse> => {
    return LibraryAPI.get<GetMaterialsResponse>('/materials', {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getMaterialById = async ({
    id
  }: {
    id: number;
  }): Promise<GetMaterialByIdResponse> => {
    return LibraryAPI.get<GetMaterialByIdResponse>(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getUserActiveLoansById = async ({
    id
  }: {
    id: number;
  }): Promise<GetUserActiveLoansById> => {
    return LibraryAPI.get<GetUserActiveLoansById>(
      `/clients/${id}/total-active-loans`,
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }
    ).then(resp => {
      return resp.data;
    });
  };

  const getUserTotalReadById = async ({
    id
  }: {
    id: number;
  }): Promise<GetUserTotalReadById> => {
    return LibraryAPI.get<GetUserTotalReadById>(`/clients/${id}/total-read`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const createMaterial = async ({
    material
  }: {
    material: MaterialWithOutID;
  }): Promise<CreateMaterialResponse> => {
    return LibraryAPI.post<CreateMaterialResponse>(`/materials`, material, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const removeMaterialById = async ({
    id
  }: {
    id: number;
  }): Promise<RemoveMaterialByIdResponse> => {
    return LibraryAPI.delete<RemoveMaterialByIdResponse>(`/materials/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const updateMaterialById = async ({
    id,
    material
  }: {
    id: number;
    material: MaterialWithOutID;
  }): Promise<UpdateMaterialByIdResponse> => {
    return LibraryAPI.patch<UpdateMaterialByIdResponse>(
      `/materials/${id}`,
      material,
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }
    ).then(resp => {
      return resp.data;
    });
  };

  const getOffices = async (): Promise<GetOfficesResponse> => {
    return LibraryAPI.get<GetOfficesResponse>('/offices', {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getOfficeById = async ({
    id
  }: {
    id: number;
  }): Promise<GetOfficeByIdResponse> => {
    return LibraryAPI.get<GetOfficeByIdResponse>(`/offices/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const removeOfficeById = async ({
    id
  }: {
    id: number;
  }): Promise<RemoveOfficeByIdResponse> => {
    return LibraryAPI.delete<RemoveOfficeByIdResponse>(`/offices/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const updateOfficeById = async ({
    id,
    office
  }: {
    id: number;
    office: OfficeWithoutId;
  }): Promise<UpdateOfficeByIdResponse> => {
    return LibraryAPI.patch<UpdateOfficeByIdResponse>(
      `/offices/${id}`,
      office,
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }
    ).then(resp => {
      return resp.data;
    });
  };

  const createOffice = async ({
    office
  }: {
    office: OfficeWithoutId;
  }): Promise<CreateOfficeResponse> => {
    return LibraryAPI.post<CreateOfficeResponse>(`/offices`, office, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const createLoan = async ({
    loan
  }: {
    loan: LoanWithOutID;
  }): Promise<CreateLoanResponse> => {
    return LibraryAPI.post<CreateLoanResponse>('/loans', loan, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getLoans = async (): Promise<GetLoansResponse> => {
    return LibraryAPI.get<GetLoansResponse>('/loans', {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const removeLoanById = async ({
    id
  }: {
    id: number;
  }): Promise<RemoveLoanByIdResponse> => {
    return LibraryAPI.delete<RemoveLoanByIdResponse>(`/loans/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const updateLoanById = async ({
    id,
    loan
  }: {
    loan: Loan;
    id: number;
  }): Promise<UpdateLoanByIdResponse> => {
    return LibraryAPI.patch<UpdateLoanByIdResponse>(`/loans/${id}`, loan, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getLoanById = async ({
    id
  }: {
    id: number;
  }): Promise<GetLoanByIdResponse> => {
    return LibraryAPI.get<GetLoanByIdResponse>(`/loans/${id}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const createReturn = async ({
    data
  }: {
    data: ReturnWithOutId;
  }): Promise<CreateReturnResponse> => {
    return LibraryAPI.post<CreateReturnResponse>(`/returns`, data, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getReturnByLoanId = async ({
    loanId
  }: {
    loanId: number;
  }): Promise<Return> => {
    return LibraryAPI.get<Return>(`/returns/${loanId}`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getAllNotifications =
    async (): Promise<GetAllNotificationsResponse> => {
      return LibraryAPI.get<GetAllNotificationsResponse>('/notifications', {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }).then(resp => {
        return resp.data;
      });
    };

  const removeNotificationById = async ({
    id
  }: {
    id: number;
  }): Promise<RemoveNotificationByIdResponse> => {
    return LibraryAPI.delete<RemoveNotificationByIdResponse>(
      `/notifications/${id}`,
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }
    ).then(resp => {
      return resp.data;
    });
  };

  const getClientMoreInfo = async ({
    id
  }: {
    id: number;
  }): Promise<GetClientMoreInfoByIdResponse> => {
    return LibraryAPI.get<GetClientMoreInfoByIdResponse>(
      `/clients/${id}/more-info`,
      {
        headers: { Authorization: `Bearer ${admin.accessToken}` }
      }
    ).then(resp => {
      return resp.data;
    });
  };

  const getClientLoans = async ({
    id
  }: {
    id: number;
  }): Promise<GetClientLoansByIdResponse> => {
    return LibraryAPI.get<GetClientLoansByIdResponse>(`/clients/${id}/loans`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  const getClientFines = async ({
    id
  }: {
    id: number;
  }): Promise<GetClientFinesByIdResponse> => {
    return LibraryAPI.get<GetClientFinesByIdResponse>(`/clients/${id}/fines`, {
      headers: { Authorization: `Bearer ${admin.accessToken}` }
    }).then(resp => {
      return resp.data;
    });
  };

  return {
    login,
    getUsers,
    getUserById,
    removeUserById,
    createUser,
    updateUserById,
    getMaterials,
    getMaterialById,
    createMaterial,
    removeMaterialById,
    updateMaterialById,
    getOffices,
    getOfficeById,
    removeOfficeById,
    updateOfficeById,
    createOffice,
    createLoan,
    getLoans,
    removeLoanById,
    getUserActiveLoansById,
    getUserTotalReadById,
    updateLoanById,
    getLoanById,
    createReturn,
    getReturnByLoanId,
    getAdmins,
    getAdminById,
    removeAdminById,
    createAdmin,
    updateAdminById,
    getAllNotifications,
    removeNotificationById,
    getClientMoreInfo,
    getClientLoans,
    getClientFines
  };
};

export default LibraryAPIService;
