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
import { Calendario } from "../calendario/Calendario";
import { useCallback, useEffect, useState } from "react";
import { TarefasService } from "../../../services/tarefas/TarefasService";

export const Form = ({buscar, handleDetail, detail, setDetail }: any) => {
  const [titulo, setTitulo] = useState('')
  console.log(titulo)
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')
  console.log(status)

  const handleStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);

  };
  
  const handleDetailStatus = (event: SelectChangeEvent) => {
    setDetail({...detail, status: event.target.value as string});
  };



 const salvar = () =>{

  if(!detail) {
    const objeto = {
      titulo: titulo,
      descricao: descricao,
      dataCriacao: new Date().toLocaleDateString(),
      dataConclusao: null,
      status: status
    }
    
    TarefasService.create(objeto)
  .then((result) => {
    if (result instanceof Error) {
      console.error('Erro ao criar a tarefa:', result.message);
    } else {
      console.log('Tarefa criada com sucesso. ID:', result);
    }
  })
  .catch((error) => {
    console.error('Erro inesperado:', error);
  })
  .finally(()=>{
    buscar()

  })

  } else {
    console.log("Entrou aqui na mudança ", detail)
  }
   
 
 }

 useEffect(()=> {
  handleDetail()
 }, [handleDetail])

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
                value={detail ? detail.titulo : titulo}
                size="small" fullWidth
                onChange={detail ? (e) => setDetail({...detail, titulo: e.target.value}) : (e) => setTitulo(e.target.value)}
                >
                  Titulo
                </TextField>
              </Box>
              <Box width="50%">
                <TextField 
                placeholder="Descrição" 
                size="small" 
                value={detail ? detail.descricao : descricao}
                fullWidth
                onChange={detail ? (e) => setDetail({...detail, descricao: e.target.value}) : (e) => setDescricao(e.target.value)}
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
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        value={detail ? detail.status : status}
                        onChange={detail ? handleDetailStatus : handleStatus}
                      >
                        <MenuItem value='ABERTO'>ABERTO</MenuItem>
                        <MenuItem value='ANDAMENTO'>ANDAMENTO</MenuItem>
                        <MenuItem value='FECHADO'>FECHADO</MenuItem>
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
