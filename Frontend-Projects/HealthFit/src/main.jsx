import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ExercisesDataProvider } from "./contexts/ExercisesDataContext"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ExercisesDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ExercisesDataProvider>
  // </StrictMode>
)
