import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');
    const [customerEmails,setCustomerEmails] = useState([])
        const [customerPhones,setCustomerPhones] = useState([])
    useEffect(() =>{
        axios.post("https://vetrasales-backend-production.up.railway.app/api/user/emails")
        .then(res => {
            console.log("retived emails")
            setCustomerEmails(res.data)
        })
        axios.post("https://vetrasales-backend-production.up.railway.app/api/user/phones")
        .then(res => {
            console.log("retived phone numbers")
            setCustomerPhones(res.data)
        })
    },[])
    const handleSubmit = (event) => {
    event.preventDefault();

    const user = { username, email, password, gender, dob, role };
    if ("" in user) {
        alert("Please fill in all fields");
    }
    axios.post("https://vetrasales-backend-production.up.railway.app/api/user/signUp", user,{headers: { "Content-Type": "application/json" }})
        .then(res => {
        console.log("Sign UP")
        console.log(res.data);
        console.info(user.roll)
        navigate('/sign_in_page')
        })
        .catch(err => {
        console.error(err);
        });
        customerEmails.map(email =>
                sendEmail({
                    receiver: email,
                    subject: "Greetings for new Customer 🙏",
                    body:
                        `Dear Customer,
                  🎉 We are excited to welcome you to our e-commerce platform!
                  Thank you for registering with **Vetra Sales**.  
                  We’re glad to have you as part of our community.
                  Explore a wide range of products, exciting offers, and seamless shopping
                  experience designed just for you.
                  Visit Vetra Sales now and start shopping today!
                  Regards,
                  Vetra Sales Team`
                })
            );
            customerPhones.map(phone =>
                    sendSMS({
                        phoneNo:phone,
                        content:
                        `Dear Customer,
                  🎉 We are excited to welcome you to our e-commerce platform!
                  Thank you for registering with **Vetra Sales**.
                  We’re glad to have you as part of our community.
                  Explore a wide range of products, exciting offers, and seamless shopping
                  experience designed just for you.
                  Visit Vetra Sales now and start shopping today!
                  Regards,
                  Vetra Sales Team`
                    })
            );
    };

    return (
    <div className='form-container'>
        <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} >
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Gender: </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender === "Other"}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>
        <br />
        <label>Date of Birth: </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <br />
        <label>Role: </label>
        
<label>
  <input
    type="radio"
    name="role"
    value="admin"
    checked={role === 'admin'}
    onChange={(e) => setRole(e.target.value)}
  />
  Admin
</label>

<label>
  <input
    type="radio"
    name="role"
    value="customer"
    checked={role === 'customer'}
    onChange={(e) => setRole(e.target.value)}
  />
  Customer
</label>
        <br />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default Signup;
