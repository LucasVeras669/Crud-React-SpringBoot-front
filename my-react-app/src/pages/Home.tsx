import { useCallback, useEffect, useState } from "react";
import { Environment } from "../shared/environment";
import { useDebounce } from "../hooks";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
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
  TextField,
} from "@mui/material";
import {
  IDetalheTarefas,
  IListagemTarefas,
  TarefasService,
} from "../services/tarefas/TarefasService";
import { Form } from "../shared/components/formulario/Form";

export const Home = () => {
  const [busca, setBusca] = useState("");
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemTarefas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState<IDetalheTarefas>({
    id: "",
    titulo: "",
    descricao: "",
    dataCriacao: "",
    dataConclusao: null,
    status: "",
  });

  const handlePageForm = async (id: number | string | undefined) => {
    const result = await TarefasService.getById(id);

    if (result instanceof Error) {
      alert(result.message);
    } else {
      // Aqui vamos assumir que `result.data` é uma lista e queremos a tarefa com o id especificado
      if(result) {
        setDetail({
          id: result.id,
          titulo: result.titulo,
          descricao: result.descricao,
          dataCriacao: result.dataCriacao,
          dataConclusao: result.dataConclusao,
          status: result.status,
        });
      }
      
      setOpen(true);
      
    }
  };

  const OpenCreatePageForm = () => {
    setDetail({
      id: "",
      titulo: "",
      descricao: "",
      dataCriacao: "",
      dataConclusao: "",
      status: ""
    });

    setOpen(!open)

}

  const handleDetail = () => {
    return detail
  }

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

  const clean = () => {
    setBusca("");
  };

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
      });
    });
  }, [debounce]);

  const handleBuscar = () => {
    search();
  };

  const handleDelete = (id: number | string | undefined) => {
    if (confirm("Realmente deseja apagar?")) {
      TarefasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);

          alert("Registo apagado com sucesso");
        }
      });
    }
  };

  useEffect(() => {
    search();
  }, [search]);



  return (
    <Box boxSizing="border-box" marginLeft="4px" marginRight="4px">
      <Box margin="20px">
        <h1>Tarefas</h1>
      </Box>
      <Divider variant="middle" />
      <Box margin="20px">
        <TextField
          placeholder={Environment.INPUT_DE_BUSCA}
          variant="outlined"
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
          fullWidth
          size="small"
        />
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        marginRight="20px"
        marginBottom="14px"
      >
        <ButtonGroup>
          <Button onClick={clean}>Limpar</Button>
          <Button onClick={search}>Consultar </Button>
          <Button onClick={OpenCreatePageForm}>Nova Tarefa</Button>
        </ButtonGroup>
      </Box>

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
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.dataConclusao}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handlePageForm(row.id)}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(row.id)} color="error">
                    Apagar
                  </Button>
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
                  />
                </TableCell>
              </TableRow>
            }
          </TableFooter>
        </Table>
      </TableContainer>
      {open && <Form rows={rows} setRows = {setRows} buscar={handleBuscar} handleDetail={handleDetail} detail = {detail} setDetail ={setDetail} />}
    </Box>
  );
};
