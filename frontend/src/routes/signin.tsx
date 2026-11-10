import React, { useState } from "react";
import Authform from "../component/authform"

interface schema
  {
      title: string;
      placeholder: string;
      type: string;
      value: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;      
}
const Signin = () => {
  const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const handleSubmit=(e:React.MouseEvent)=>{
      e.preventDefault();
      console.log(formData);
    }

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    // 3. Defined as an array of schema objects (schema[])
    const formFields: schema[] = [
        {
            title: "Email Address",
            placeholder: "Enter your email",
            type: "email",
            value: formData.username,
            onChange: handleChange('username'),
        },
        {
            title: "Password",
            placeholder: "At least 8 characters",
            type: "password",
            value: formData.password,
            onChange: handleChange('password'),
        },
    ];

  return (
    <div className=" min-h-screen flex justify-center items-center ">

   <Authform 
   title="Signin"
   subtitle="login with your account"
   shema={formFields}
   buttonTittle="Sigin"
   onclick={handleSubmit}
   bottomtext="Don't have account sigin"
   redirect_Link="/signup"
   />
   </div>
  )
}

export default Signin
