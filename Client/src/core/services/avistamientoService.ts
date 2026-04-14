import { requests } from '../api/agent';
import { type Avistamiento } from '../models';

const avistamientoService = {
    list: () => requests.get<Avistamiento[]>('/avistamientos'),
    details: (id: number) => requests.get<Avistamiento>(`/avistamientos/${id}`),
    create: (avistamiento: Avistamiento) => requests.post<Avistamiento>('/avistamientos', avistamiento),
    update: (id: number, avistamiento: Avistamiento) => requests.put<void>(`/avistamientos/${id}`, avistamiento),
    delete: (id: number) => requests.del<void>(`/avistamientos/${id}`),
};

export default avistamientoService;
