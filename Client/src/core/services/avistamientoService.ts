import { requests } from '../api/agent';

const avistamientoService = {
    list: () => requests.get<any[]>('/avistamientos'),
    details: (id: number) => requests.get<any>(`/avistamientos/${id}`),
    create: (avistamiento: any) => requests.post<any>('/avistamientos', avistamiento),
    update: (id: number, avistamiento: any) => requests.put<void>(`/avistamientos/${id}`, avistamiento),
    delete: (id: number) => requests.del<void>(`/avistamientos/${id}`),
};

export default avistamientoService;
