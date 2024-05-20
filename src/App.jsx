import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, VersionOne, VersionTwo } from './pages'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='version01' element={<VersionOne />}/>
            <Route path='version02' element={<VersionTwo />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App