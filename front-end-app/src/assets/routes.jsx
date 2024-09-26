import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRecords from '../pages/CustomerRecords';
import EditPage from "../pages/EditPage";

const MyRoutes = ( ) => {
    return (
        <Routes>
          <Route path="/" element={<CustomerRecords />} />
          <Route path="edit" element={<EditPage />} />
        </Routes>
    )
}

export default MyRoutes;

