import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { products,categories } from "../../data/products"; // adjust path if needed
import { addProduct } from "../../services/productService";
export function AddProductPage({onBack, username}) {
  const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  inStock: true,
});

  
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const finalValue = type === "checkbox" ? checked : value;
  setFormData((prev) => ({
    ...prev,
    [name]: finalValue,
  }));
};



 const handleSubmit = async (e) => {
  e.preventDefault();
  const newProduct = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    category: formData.category,
    image: formData.image,
    inStock: formData.inStock,
    adminName: username
  };

  console.log("New Product:", newProduct);

  try {
    const res = await addProduct(newProduct);
    console.log(res.data);
    if (res.data === "success") {
      alert("Product added successfully!");
      setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      inStock: true,
    });
    }
  } catch (error) {
    console.error(error);
    alert("Failed to add product!");
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Button onClick={() => onBack()}>
        ⬅️Back
        </Button>
      <Card>
        <CardHeader>
          <CardTitle>Add New Product (Admin)</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            {/* Product Name */}
            <div className="col-span-2">
              <Label>Product Name</Label>
              <Input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={3}
                required
              />
            </div>

            {/* Price */}
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                name="price"
                value={formData.price || 0}
                onChange={handleChange}
                placeholder="49.99"
                required
              />
            </div>
            {/* Image URL */}
            <div className="col-span-2">
              <Label>Image URL</Label>
              <Input
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                placeholder="https://image-url.com"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* In Stock */}
            <div className="flex items-center gap-2 mt-6">
              <Input
                type="checkbox"
                name="inStock"
                checked={formData.inStock || false}
                className="btn"
                onChange={handleChange}
              />
              <Label>In Stock</Label>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4">
              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
