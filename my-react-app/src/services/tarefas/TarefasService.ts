import { Api } from "../../shared/api/axios-config";

export interface IListagemTarefas {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataConclusao: string;
  status: {
    status1: string;
    status2: string;
    status3: string;
  };
  acao: string
 
}

export interface IDetalheTarefas {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataConclusao: string;
  status: {
    status1: string;
    status2: string;
    status3: string;
  };

}

type TTarefasComTotalCount = {
  data: IListagemTarefas[];
};

const getAll = async (): Promise<TTarefasComTotalCount | Error> => {
  try {
    const { data } = await Api.get("/tarefas");
    if (data) {
      return {
        data,
      };
    }

    return new Error("Erro ao listar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros"
    );
  }
};

const getById = async (id: number): Promise<IDetalheTarefas | Error> => {
  try {
    const { data } = await Api.get(`/tarefas/${id}`);
    if (data) {
      return data;
    }

    return new Error("Erro ao consultar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao consultar os registros"
    );
  }
};

const create = async (
  dados: Omit<IDetalheTarefas, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheTarefas>("/tarefas", dados);
    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao criar os registros"
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheTarefas
): Promise<void | Error> => {
  try {
    await Api.put(`/tarefas/${id}`, dados);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar os registros"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/tarefas/${id}`);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao apagar os registros"
    );
  }
};

export const TarefasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
