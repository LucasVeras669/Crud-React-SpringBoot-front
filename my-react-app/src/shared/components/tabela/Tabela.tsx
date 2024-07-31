import {
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  debounce,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IListagemTarefas, TarefasService } from "../../../services/tarefas/TarefasService";


export const Tabela = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [rows, setRows] = useState<IListagemTarefas[]>([]);

  const [busca, setBusca] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const tarefasFiltradas = rows.filter((tarefa) =>
    tarefa.titulo.includes(busca)
  );

  const paginatedTasks = tarefasFiltradas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  const clean = useCallback(() => {
    setBusca("");
  }, [])

  const search = useCallback(() => {
    setIsLoading(true);
    debounce(() => {
        TarefasService.getAll().then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              setRows(result.data);
            }
    })
    })}, [])


  useEffect(() => {
    search();
  }, [busca]);

    
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Data de Criação</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Data da Conclusão</TableCell>
            <TableCell align="center">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedTasks.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.titulo}</TableCell>
              <TableCell align="center">{row.descricao}</TableCell>
              <TableCell align="center">{row.dataCriacao}</TableCell>
              <TableCell align="center">{row.status.status1}</TableCell>
              <TableCell align="center">{row.dataConclusao}</TableCell>
              <TableCell align="center">
                <Button>{row.acao.editar}</Button>
                <Button color="error">{row.acao.apagar}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6}>
                <LinearProgress variant="indeterminate" />
              </TableCell>
            </TableRow>
          )}
          {
            <TableRow>
              <TableCell colSpan={6}>
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  count={tarefasFiltradas.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Linhas por página:"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count}`
                  }
                  backLabel="Anterior"
                  nextLabel="Próxima"
                />
              </TableCell>
            </TableRow>
          }
        </TableFooter>
      </Table>
    </TableContainer>
  );

  return {clean, search}

};
