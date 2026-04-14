import { requests } from '../api/agent';

const animalService = {
    list: () => requests.get<any[]>('/animales'),
    details: (id: number) => requests.get<any>(`/animales/${id}`),
    create: (animal: any) => requests.post<any>('/animales', animal),
    update: (id: number, animal: any) => requests.put<void>(`/animales/${id}`, animal),
    delete: (id: number) => requests.del<void>(`/animales/${id}`),
};

export default animalService;
