import {
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TarefasService } from "../../../services/tarefas/TarefasService";

export const Form = ({ buscar, handleDetail, detail, setDetail }: any) => {
  const [titulo, setTitulo] = useState("");

  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  const handleStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDetailStatus = (event: SelectChangeEvent) => {
    setDetail({ ...detail, status: event.target.value as string });
  };

  const handleUpdate = async (id: number | string | undefined) => {
    const result = await TarefasService.updateById(id, detail)
      .then((result: any) => {
        if (result instanceof Error) {
          console.log("entrou aqui");
          alert(result.message);
        } else {
          alert("Tarefa editada com sucesso!");
        }
      })
      .finally(() => {
        buscar();
      });
  };

  const handleSalve = () => {
    const objeto = {
      titulo: titulo,
      descricao: descricao,
      dataCriacao: new Date().toLocaleDateString(),
      dataConclusao: null,
      status: status,
    };


    TarefasService.create(objeto)
      .then((result) => {
        if (result instanceof Error) {
          alert("Erro ao criar a tarefa:");
        } else {
          
          alert("Tarefa criada com sucesso");
        }
        setTitulo('')
        setDescricao('')
        setStatus('')
      })
      .catch((error) => {
        alert("Erro inesperado:");
      })
      .finally(() => {
        buscar();
      });
  };

  const salvar = () => {
    if (!detail.id) {
      handleSalve()
    } else {
      handleUpdate(detail.id);
    }
  };

  useEffect(() => {
    console.log(detail);
  });

  useEffect(() => {
    handleDetail();
  }, [handleDetail]);

  return (
    <Box minHeight="80vh">
      <Box margin="20px">
        <h2>Novas Tarefas/ Editar</h2>
      </Box>
      <Box margin="20px">
        <Box marginTop="10px" marginBottom="10px">
          <Divider />
        </Box>

        <FormGroup>
          <FormControl>
            <Box display="flex" width="100%" gap={1}>
              <Box width="50%">
                <TextField
                  placeholder="Título"
                  value={detail.id ? detail.titulo : titulo}
                  size="small"
                  fullWidth
                  onChange={
                    detail.id
                      ? (e) => setDetail({ ...detail, titulo: e.target.value })
                      : (e) => setTitulo(e.target.value)
                  }
                >
                  Titulo
                </TextField>
              </Box>
              <Box width="50%">
                <TextField
                  placeholder="Descrição"
                  size="small"
                  value={detail.id ? detail.descricao : descricao}
                  fullWidth
                  onChange={
                    detail.id
                      ? (e) =>
                          setDetail({ ...detail, descricao: e.target.value })
                      : (e) => setDescricao(e.target.value)
                  }
                >
                  Descrição
                </TextField>
              </Box>
            </Box>

            <FormControl>
              <Box marginTop="8px" marginBottom="10px" width="100%">
                <Box display="flex" justifyContent="space-around">
                  <h3>Status</h3>
                </Box>
                <Box display="flex">
                  <Box width="50%">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        value={detail.id? detail.status : status}
                        onChange={detail.id ? handleDetailStatus : handleStatus}
                      >
                        <MenuItem value="ABERTO">ABERTO</MenuItem>
                        <MenuItem value="ANDAMENTO">ANDAMENTO</MenuItem>
                        <MenuItem value="FECHADO">FECHADO</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </FormControl>
          </FormControl>

          <Box marginTop="20px">
            <Button onClick={salvar} fullWidth variant="contained">
              Salvar
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );
};
