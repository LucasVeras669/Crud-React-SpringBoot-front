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
import { useCallback, useState } from "react";
import { TarefasService } from "../../../services/tarefas/TarefasService";

export const Form = ({buscar}) => {
  const [titulo, setTitulo] = useState('')
  console.log(titulo)
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')
  console.log(status)

  const handleStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };


 const salvar = () =>{

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
 
 }


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
                size="small" fullWidth
                onChange={(e)=> setTitulo(e.target.value)}
                >
                  Titulo
                </TextField>
              </Box>
              <Box width="50%">
                <TextField 
                placeholder="Descrição" 
                size="small" 
                fullWidth
                onChange={(e)=> setDescricao(e.target.value)}
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
                        onChange={handleStatus}
                      >
                        <MenuItem value='ABERTO'>ABERTO</MenuItem>
                        <MenuItem value='ANDAMENTO'>ANDAMENTO</MenuItem>
                        <MenuItem value='FECHADO'>FECHADO</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box width="50%">
                    {/* <Calendario /> */}
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
