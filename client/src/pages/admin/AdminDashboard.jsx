import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {

  const[auth]= useAuth()

  return (
    <Layout>
      <div className="m-4 flex flex-row">
        <div className="">
          <AdminMenu />
        </div>
        <div className="m-4 p-12">
          <h1 className="card">Admin Name: {auth?.user?.name}</h1>
          <h1 className="card ">Admin Email: {auth?.user?.email}</h1>
          <h1 className="card">Admin Contact: {auth?.user?.phone}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
