import React from 'react';
 
import { BrowserRouter, Route,Routes } from 'react-router-dom';
 
import Dashboard from './components/Dashboard';
 
import VoucherDashboard from './components/VoucherDashboard';
 
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
 
          <Route exact path='/dashboard' element={<Dashboard/>}></Route>
 
          <Route exact path='/voucher-dashboard/:email/:exam' element={<VoucherDashboard/>}></Route>
         
        </Routes>
       
      </div>
    </BrowserRouter>
   
  );
}
 
export default App;