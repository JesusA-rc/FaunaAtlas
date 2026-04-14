import { requests } from '../api/agent';
import { type Habitat } from '../models';

const habitatService = {
    list: () => requests.get<Habitat[]>('/habitats'),
    details: (id: number) => requests.get<Habitat>(`/habitats/${id}`),
    create: (habitat: Habitat) => requests.post<Habitat>('/habitats', habitat),
    update: (id: number, habitat: Habitat) => requests.put<void>(`/habitats/${id}`, habitat),
    delete: (id: number) => requests.del<void>(`/habitats/${id}`),
};

export default habitatService;
