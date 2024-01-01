import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Input, Button, } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [catagories, setCatagories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [Catagory, setCatagory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const getAllCatagories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/catagory/get-catagory"
        );

        if (data?.success) {
          setCatagories(data?.catagory);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while getting categories");
      }
    };

    getAllCatagories();
  }, []);
  

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("Catagory", Catagory);
      formData.append("shipping", shipping ? "true" : "false");
      formData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/products/create-product",
        formData
      );

      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <div className="flex flex-row">
      {/* Add your AdminMenu component here */}
      <div>
        <AdminMenu />
      </div>
      <div className="container mx-auto flex flex-col my-10 p-6 bg-white rounded-lg shadow-xl">
        <h1>Create Product</h1>
        <div className="m-1 w-[75%]">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setCatagory(value)}
          >
            {catagories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <div className="mb-3">  
                <label className="bg-green-200 rounded-full p-2 hover:bg-green-400">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

          {photo && (
            <div>
              <img
                className="h-40 w-40"
                src={URL.createObjectURL(photo)}
                alt=""
                height="200px"
              />
            </div>
          )}

          <Input
            className="my-5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write name of your product"
          />

          <Input.TextArea
            className="my-5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write description of your product"
          />

          <Input
            className="my-5"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Set quantity of your product"
          />

          <Input
            className="my-5"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Set price of your product"
          />

          <Select
            bordered={false}
            placeholder="Select shipping"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setShipping(value)}
          >
            <Option value="true">In Stock</Option>
            <Option value="false">Out of Stock</Option>
          </Select>

          <Button
            onClick={createProduct}
            className="py-1 px-3 bg-blue-500 text-white"
          >
            Create Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
