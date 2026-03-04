import { useState } from "react"
import Dashboard from "./Dashboard"
import Dashboard2 from "./Dashboard2"

function App() {
  const [page, setPage] = useState(1)

  return (
    <div>
      <button onClick={() => setPage(1)}>Dashboard 1</button>
      <button onClick={() => setPage(2)}>Dashboard 2</button>

      {page === 1 ? <Dashboard /> : <Dashboard2 />}
    </div>
  )
}

export default App