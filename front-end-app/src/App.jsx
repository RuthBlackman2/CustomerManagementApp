import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRecords from './pages/CustomerRecords';
import EditPage from './pages/EditPage';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<CustomerRecords />} />
          <Route path="edit" element={<EditPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
