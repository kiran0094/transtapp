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
const Signup= () => {
  const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstname:'',
        lastname:'',
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
         {
            title: "First Name",
            placeholder: "enter your FirstName",
            type: "text",
            value: formData.firstname,
            onChange: handleChange('firstname'),
        },
         {
            title: "Last Name",
            placeholder: "enter your LastName",
            type: "text",
            value: formData.lastname,
            onChange: handleChange('lastname'),
        },
    ];

  return (
    <div className=" min-h-screen flex justify-center items-center ">

   <Authform 
   title="Signup"
   subtitle="Create your account"
   shema={formFields}
   buttonTittle="Sigup"
   onclick={handleSubmit}
   bottomtext="alreadly have account signup"
   redirect_Link="/signin"
   />
   </div>
  )
}

export default Signup
