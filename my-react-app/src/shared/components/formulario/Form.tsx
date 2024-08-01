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
import { Calendario } from "../calendario/Calendario";

export const Form = () => {
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
              <Box marginTop="8px" marginBottom="10px" width="100%">
                <Box display="flex" justifyContent="space-around">
                  <h3>Status</h3>
                  <h3>Data de Conclusão </h3>
                </Box>
                <Box display="flex">
                  <Box width="50%">
                    <Select fullWidth size="small">
                      <MenuItem value="ABERTO">ABERTO</MenuItem>
                      <MenuItem value="ANDAMENTO">ANDAMENTO</MenuItem>
                      <MenuItem value="CONCLUÍDA">CONCLUÍDA</MenuItem>
                    </Select>
                  </Box>
                  <Box width="50%">
                    <Calendario />
                  </Box>
                </Box>
              </Box>
            </FormControl>
          </FormControl>

          <Box marginTop="20px">
            <Button fullWidth variant="contained">
              Salvar
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );
};
