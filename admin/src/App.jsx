import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Driver from './pages/driver/Driver'; //DS
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import LogisticsManagerDashboard from './pages/Dashboard/LogisticsManagerDashboard';
import CashierDashboard from './pages/Dashboard/CashierDashboard';
import HrManagerDashboard from './pages/Dashboard/HrManagerDashboard';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';

import { useAuth } from './context/authContext';
import DriverForm from './pages/driver/DriverForm';
import DriverList from './pages/driver/DriverList';
import EditDriver from './pages/driver/EditDriver';
import MainPage from './pages/MainPage/MainPage';
import Invoice from './pages/Invoice/Invoice'; // Import Invoice page
import InvoiceDisplay from './pages/Invoice/InvoiceDisplay';
import UserTable from './pages/User/UserTable'; 
import Sales from './pages/Sales/Sales';
import SampleComponent from './components/DeliverySchedule/SampleComponent' //DS
import AssignedOrders from './components/DeliverySchedule/AssignedOrders' // DS
import ReplyForm from './pages/Reply/ReplyForm';

import SupplierList from './pages/Supplier/SupplierList';
import AddSupplier from './pages/Supplier/AddSupplier';
import UpdateSupplier from './pages/Supplier/UpdateSupplier';
import SupplierComponent from './components/DeliverySchedule/SupplierComponet';


import AddEmployee from './pages/Employee/AddEmployee'; // Adjust the path as necessary
import ListEmployee from './pages/Employee/EmployeeList';
import EditEmployee from './pages/Employee/EditEmployee';
import LeaveForm from './pages/Leaves/LeaveForm';
import LeaveList from './pages/Leaves/LeaveList';

import EmployeeRegister from "./pages/MainPage/EmployeeRegister"; // Adjust if the path is incorrect

import DashboardAcess from "./pages/DashboardAccess/DashboardAccess"
import EmployeeLogin from "./pages/EmployeeLogin/EmployeeLogin"

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<EmployeeLogin />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/cashier" element={<CashierDashboard />} />
          <Route path="/hr" element={<HrManagerDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />

          <Route path="/logistics" element={<LogisticsManagerDashboard />} />
          <Route path="/drivers" element={<DriverList />} />
          <Route path="/drivers/add" element={<DriverForm />} />
          <Route path="/edit-driver/:id" element={<EditDriver />} />
          <Route path="/drivers/orders" element={<Driver />} />{/* DS */}
          <Route path="/sample" element={<SampleComponent />} />{/* DS */}
          <Route path="/assigned-orders" element={<AssignedOrders />} /> {/* DS */}
          
   
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/invoice-display" element={<InvoiceDisplay />} /> 
          <Route path="/users" element={<UserTable />} /> {/* Corrected this line */}
          <Route path="/sales" element={<Sales/>} />

          <Route path="/reply/:id" element={<ReplyForm />} />  {/* Reply to inquiries */}

          <Route path="/sup" element={<SupplierComponent/>}/>
          <Route path="/addSupplier" element={<AddSupplier/>}/>
          <Route path="/listSupplier" element={<SupplierList/>}/>
          <Route path="/updateSupplier/:id" element={<UpdateSupplier />} />

          <Route path="/add-employee" element={<AddEmployee />} /> {/* New route */}
          <Route path="/list-employee" element={<ListEmployee />} /> {/* New route */}
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/new" element={<LeaveForm />} />
          <Route path="/leaves" element={<LeaveList />} />

          <Route path="/register" element={<EmployeeRegister />} />

          <Route path="/acess" element={<DashboardAcess />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
