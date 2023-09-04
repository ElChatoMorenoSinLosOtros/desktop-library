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
    updateMaterialById
  };
};

export default LibraryAPIService;
