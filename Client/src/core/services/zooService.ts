import { requests } from '../api/agent';
import { type Zoo } from '../models';

const zooService = {
    list: () => requests.get<Zoo[]>('/zoos'),
    details: (id: number) => requests.get<Zoo>(`/zoos/${id}`),
    create: (zoo: Zoo) => requests.post<Zoo>('/zoos', zoo),
    update: (id: number, zoo: Zoo) => requests.put<void>(`/zoos/${id}`, zoo),
    delete: (id: number) => requests.del<void>(`/zoos/${id}`),
};

export default zooService;
