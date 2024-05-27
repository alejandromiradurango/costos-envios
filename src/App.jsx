import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Form, Layout, LayoutForm, Thanks, VersionOne, VersionThree, VersionTwo } from './pages'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='version01' element={<VersionOne />}/>
            <Route path='version02' element={<VersionTwo />}/>
            <Route path='version03' element={<VersionThree />}/>
          </Route>
          <Route path='/formulario' element={<LayoutForm />}>
            <Route index element={<Form />}/>
            <Route path='gracias' element={<Thanks />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App