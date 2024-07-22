import { ThemeProvider } from "@emotion/react"
import { Button } from "@mui/material"
import { LightTheme } from "./shared/theme"


function App() {
 
  return (
  <ThemeProvider theme={LightTheme}>
    <Button variant="contained" color="primary">Olá Mundo</Button>
  </ThemeProvider>
  )
}

export default App
