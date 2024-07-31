import {
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";


export const Form = () => {


  return (
    <Box minHeight='50vh'>
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
                <TextField placeholder="Título" size="small" fullWidth>
                  Titulo
                </TextField>
              </Box>
              <Box width="50%">
                <TextField placeholder="Descrição" size="small" fullWidth>
                  Descrição
                </TextField>
              </Box>
            </Box>

            <FormControl>
              <Box marginBottom='10px' width="100%">
                <Box >
                  <h3>Status</h3>
                </Box>

                <Select fullWidth size="small">
                  <MenuItem value="ABERTO">ABERTO</MenuItem>
                  <MenuItem value="ANDAMENTO">ANDAMENTO</MenuItem>
                  <MenuItem value="CONCLUÍDA">CONCLUÍDA</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </FormControl>
          <Button variant="contained">Salvar</Button>
        </FormGroup>
      </Box>
    </Box>
  );
};
