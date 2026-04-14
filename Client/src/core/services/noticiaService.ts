import { requests } from '../api/agent';

const noticiaService = {
    list: () => requests.get<any[]>('/noticias'),
    details: (id: number) => requests.get<any>(`/noticias/${id}`),
    create: (noticia: any) => requests.post<any>('/noticias', noticia),
    update: (id: number, noticia: any) => requests.put<void>(`/noticias/${id}`, noticia),
    delete: (id: number) => requests.del<void>(`/noticias/${id}`),
};

export default noticiaService;
