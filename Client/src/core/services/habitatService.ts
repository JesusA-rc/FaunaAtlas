import { requests } from '../api/agent';

const habitatService = {
    list: () => requests.get<any[]>('/habitats'),
    details: (id: number) => requests.get<any>(`/habitats/${id}`),
    create: (habitat: any) => requests.post<any>('/habitats', habitat),
    update: (id: number, habitat: any) => requests.put<void>(`/habitats/${id}`, habitat),
    delete: (id: number) => requests.del<void>(`/habitats/${id}`),
};

export default habitatService;
