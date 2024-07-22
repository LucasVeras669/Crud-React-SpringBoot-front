import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAppThemeContext } from "../shared/contexts"
import { Button } from "@mui/material"

export const AppRoutes = () => {
    const {toggleTheme } = useAppThemeContext()

    return (
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<Button variant="contained" color="primary" onClick={toggleTheme}>Pagina Inicial</Button>}/>
        <Route path="*" element={<Navigate to='/' />}/>
       </Routes>
       </BrowserRouter>
    )
}