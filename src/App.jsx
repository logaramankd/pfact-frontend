import { useState } from "react"
import AppRouter from "./routes/AppRouter"
import { createTheme, CssBaseline, IconButton, ThemeProvider } from "@mui/material"
import { Brightness4, Brightness7 } from "@mui/icons-material"

function App() {
  const [mode, setMode] = useState("light")

  const theme = createTheme({
    palette: {
      mode: mode
    },
  })

  const toggleMode = () => {
    setMode((prev) => (prev == 'light' ? "dark" : "light"))
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter mode={mode} toggleMode={toggleMode} />
    </ThemeProvider>
  )
}

export default App
