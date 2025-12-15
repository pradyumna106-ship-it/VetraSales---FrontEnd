import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { sendEmail, sendSMS } from '../services/mailService'
import { useNavigate } from 'react-router-dom'
function AddProduct() {
    const [name,setName] = useState()
    const [price,setPrice] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [adminUsername] = useState(localStorage.getItem('username') || '')
    const [customerEmails,setCustomerEmails] = useState([])
    const [customerPhones,setCustomerPhones] = useState([])
    const navigate = useNavigate()
    useEffect( () =>{
        axios.get("https://vetrasales-backend-production.up.railway.app/api/user/emails")
        .then(res => {
            console.log("retived emails and phone numbers")
            setCustomerEmails(res.data)
        })
        axios.get("https://vetrasales-backend-production.up.railway.app/api/user/phones")
        .then(res => {
            console.log("retived emails and phone numbers")
            setCustomerPhones(res.data)
        })
    },[])
    const handleSubmit = (event) => {
        event.preventDefault();
        const product = {name:name,price:price,description:description,image:image,adminName:adminUsername}
        if ("" in product) {
            alert("Please fill all fields")
        }
        axios.post("https://vetrasales-backend-production.up.railway.app/api/product/addProduct", product,{headers: { "Content-Type": "application/json" }})
        .then(res => {
        console.log("Add Product")
        customerEmails.map(email =>
        sendEmail({
            receiver: email,
            subject: "🔥 New Product Launched on Vetra Sales",
            body:
                `Dear Customer,
                🎉 We are excited to announce a NEW PRODUCT!
                Product Name: ${name}
                Describtion: ${description}
                Price: ₹${price}
                Visit Vetra Sales now and grab it before stock ends!
                Regards,
                Vetra Sales Team`
        })
    );
    customerPhones.map(phone =>
            sendSMS({
                phoneNo:phone,
                content: 
                `🔥 New Product Launched on Vetra Sales
                Dear Customer,
                🎉 We are excited to announce a NEW PRODUCT!
                Product Name: ${name}
                Describtion: ${description}
                Price: ₹${price}
                Visit Vetra Sales now and grab it before stock ends!
                Regards,
                Vetra Sales Team`
            })
    );
        console.log(res.data);
        alert("Product Added Successfully!!")
        })
        .catch(err => {
        console.error(err);
        });
    };
    return (<>
    <button onClick={() => navigate('/admin_page')}>
        Back
        </button>
    <h3>Add Products</h3>
        <form onSubmit={handleSubmit}>
            <label>Name of the Product: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <br /><br />
        <label>Description: </label>
        <textarea  value={description} onChange={(e) => setDescription(e.target.value)}/>
        <br /><br />
        <label>Price: </label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <br /><br />
        <label>Image: </label>
        <input type="Text" value={image} onChange={(e) => setImage(e.target.value)}/>
        <br /><br />
        <button type="submit">ADD Product</button>
    </form>
    </>);
}

export default AddProduct;