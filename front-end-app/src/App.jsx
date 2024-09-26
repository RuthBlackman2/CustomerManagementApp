import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRecords from './pages/CustomerRecords';
import EditPage from './pages/EditPage';
import Layout from './pages/Layout';
import MyRoutes from './assets/routes';

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  )
}

export default App
