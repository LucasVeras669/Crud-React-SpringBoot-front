import { Box, Button, ButtonGroup, Divider, TextField } from "@mui/material";
// import { useAppThemeContext } from "../shared/contexts"

export const Home = () => {
  // const {toggleTheme } = useAppThemeContext()

  return (
    <>
      <Box margin="20px">
        <h1>Tarefas</h1>
      </Box>
      <Divider variant="middle" />
      <Box margin="20px">
        <TextField
          placeholder="Pesquisar..."
          variant="outlined"
          fullWidth
          size="small"
        />
      </Box>

      <Box display='flex' justifyContent='flex-end' marginRight='20px'>
        <ButtonGroup>
          <Button>Limpar</Button>
          <Button>Consultar </Button> 
          <Button>Nova Tarefa</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};
