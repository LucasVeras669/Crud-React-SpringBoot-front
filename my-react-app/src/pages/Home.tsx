import { Box, Button, ButtonGroup, Divider, TextField } from "@mui/material";
import { Environment } from "../shared/environment";
import { useEffect, useState } from "react";
import { TarefasService } from "../services/tarefas/TarefasService";
import database from "./../../mock/database.json";
import { useDebounce } from "../hooks";

export const Home = () => {
  const [busca, setBusca] = useState("");
  const { debounce } = useDebounce();
  // console.log(busca)

  // const tarefasFiltradas = database.tarefas.filter((tarefa) =>
  //   tarefa.titulo.includes(busca)
  // );


  useEffect(() => {
    debounce(() => {
      TarefasService.getAll().then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
    });
  }, [busca]);

  return (
    <>
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

      <Box display="flex" justifyContent="flex-end" marginRight="20px">
        <ButtonGroup>
          <Button>Limpar</Button>
          <Button>Consultar </Button>
          <Button>Nova Tarefa</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};
