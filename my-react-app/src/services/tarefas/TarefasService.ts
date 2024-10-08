import { Api } from "../../shared/api/axios-config";
import { Environment } from "../../shared/environment";

export interface IListagemTarefas {
  id: number | string | undefined
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataConclusao: string | null;
  status: "ABERTO" | "ANDAMENTO" | "FECHADO";
}

export interface IDetalheTarefas {
    id: number | string | undefined
    titulo?: string;
    descricao?: string;
    dataCriacao?: string;
    dataConclusao?: string | null;
    status?: string;
}

export type TDetalheTarefasData = {
  data: IDetalheTarefas[];
};

export type TTarefasComTotalCount = {
  data: IListagemTarefas[];
  totalCount: number;
};

const getAll = async (): Promise<TTarefasComTotalCount | Error> => {
  try {
    const { data, headers } = await Api.get("/tarefas");
    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros"
    );
  }
};

const getById = async (
  id: number | string | undefined
): Promise<IDetalheTarefas | Error> => {
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

const create = async (dados: IDetalheTarefas) => {
  try {
    const { data } = await Api.post<IDetalheTarefas>("/tarefas", dados);

    console.log(data);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao criar os registros"
    );
  }
};

const updateById = async (
  id: number | string | undefined,
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

const deleteById = async (
  id: number | string | undefined
): Promise<void | Error> => {
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
