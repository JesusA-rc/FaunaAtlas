import { requests } from '../api/agent';
import { type Noticia } from '../models';

const noticiaService = {
    list: () => requests.get<Noticia[]>('/noticias'),
    details: (id: number) => requests.get<Noticia>(`/noticias/${id}`),
    create: (noticia: Noticia) => requests.post<Noticia>('/noticias', noticia),
    update: (id: number, noticia: Noticia) => requests.put<void>(`/noticias/${id}`, noticia),
    delete: (id: number) => requests.del<void>(`/noticias/${id}`),
};

export default noticiaService;
