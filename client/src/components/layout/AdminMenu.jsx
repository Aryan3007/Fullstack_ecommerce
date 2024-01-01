import { Link } from "react-router-dom"

const AdminMenu = () => {
  return (
    <>
      <div className="container mx-auto flex my-10 p-6 bg-white rounded-lg shadow-xl flex-col">
        <h1 className="text-3xl">Admin Panel</h1>
        <Link to="/dashboard/admin/create-catagory">create catagory</Link>
        <Link to="/dashboard/admin/create-product">create product</Link>
        <Link to="/dashboard/admin/create-users">users</Link>
        <Link to="/dashboard/admin/products">Products</Link>
      </div>
    </>
  )
}

export default AdminMenu
