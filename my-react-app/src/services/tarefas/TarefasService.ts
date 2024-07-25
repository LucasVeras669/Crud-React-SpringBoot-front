import { Api } from "../../shared/api/axios-config"


interface IListagemTarefas {
    id: number;

}

type TTarefasComTotalCount = {
    data: IListagemTarefas[];
   
}

const getAll = async (): Promise<TTarefasComTotalCount | Error> => {
    try {
        const { data } = await Api.get('/tarefas')
        if(data) {
            return{
                data,
            }
        }

        return new Error('Erro ao listar os registros')
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros')
    }
}

const getById = async (): Promise<any> => {}

const create = async (): Promise<any> => {}

const updateById = async (): Promise<any> => {}

const deleteById = async (): Promise<any> => {}

export const TarefasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}