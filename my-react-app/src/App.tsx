import { AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <AppThemeProvider>
      <AppRoutes />
    </AppThemeProvider>
  );
}

export default App;
