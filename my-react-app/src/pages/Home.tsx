import { useEffect, useState } from "react";
import { Environment } from "../shared/environment";
import database from "./../../mock/database.json";
import { DataGrid } from "@mui/x-data-grid";
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
  TableRow,
  TextField,
} from "@mui/material";
import {
  IListagemTarefas,
  TarefasService,
} from "../services/tarefas/TarefasService";

export const Home = () => {
  const [busca, setBusca] = useState("");
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemTarefas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tarefasFiltradas = rows.filter((tarefa) =>
  tarefa.titulo.includes(busca)
 );

  useEffect(() => {
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
  }, [busca]);

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
          <Button>Limpar</Button>
          <Button>Consultar </Button>
          <Button>Nova Tarefa</Button>
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
            {tarefasFiltradas.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.titulo}</TableCell>
                <TableCell align="center">{row.descricao}</TableCell>
                <TableCell align="center">{row.dataCriacao}</TableCell>
                <TableCell align="center">{row.status.status1}</TableCell>
                <TableCell align="center">{row.dataConclusao}</TableCell>
                <TableCell align="center">{row.acao.editar} {row.acao.apagar}</TableCell>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
