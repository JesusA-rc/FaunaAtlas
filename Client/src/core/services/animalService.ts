import { requests } from '../api/agent';
import { type Animal } from '../models';

const animalService = {
    list: () => requests.get<Animal[]>('/animales'),
    details: (id: number) => requests.get<Animal>(`/animales/${id}`),
    create: (animal: Animal) => requests.post<Animal>('/animales', animal),
    update: (id: number, animal: Animal) => requests.put<void>(`/animales/${id}`, animal),
    delete: (id: number) => requests.del<void>(`/animales/${id}`),
};

export default animalService;
