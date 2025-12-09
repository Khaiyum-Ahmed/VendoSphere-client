import React, { useState } from 'react';
import { Form, Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import axios from 'axios';
import UseAxios from '../../../hooks/UseAxios';
import SocialLogin from '../Login/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = UseAxios();


    const from = location.state?.from || "/";
    const handleRegister = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update user info in the database
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    role: data.role, // default role
                    phone: data.phone,
                    address: data.address,
                    image: profilePic,
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data, userInfo)


                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name & pic updated')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await axios.post(imageUploadUrl, formData)
        setProfilePic(res.data.data.url)
    }
    return (
        <div className='max-w-xl'>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className='mb-6'>
                    <h1 className='text-black font-extrabold text-5xl mb-2'>Create an Account</h1>
                    <p className='font-medium text-base'>Register with VendoSphere</p>
                </div>
                <fieldset className="fieldset">
                    {/* Image field */}
                    <input type="file"
                        onChange={handleImageUpload}
                        className="input w-full"
                        placeholder="Upload Your Profile Picture" />


                    {/* name field */}
                    <input type="text"
                        {...register("name", { required: true, minLength: 6 })}
                        className="input w-full" placeholder="Your Name" />
                    {errors.name?.type === "required" && (<p className='text-red-500'>Name is required?</p>)}
                    {errors.name?.type === "minLength" && (<p className='text-red-500'>Name must be 4 characters or longer!</p>)}

                    {/* email field */}
                    <input type="email"
                        {...register("email", { required: "email address is required" })}
                        aria-invalid={errors.email ? "true" : "false"}
                        className="input w-full" placeholder="Email" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                    {/* Phone */}
                    <input
                        {...register("phone", { required: "Phone number is required" })}
                        placeholder="Phone Number"
                        className="input input-bordered w-full"
                    />
                    <p className="text-error text-sm">{errors.phone?.message}</p>

                    {/* Address */}
                    <input
                        {...register("address")}
                        placeholder="Address (optional)"
                        className="input input-bordered w-full"
                    />

                    {/* Role */}
                    <select
                        {...register("role", { required: "Select a role" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Role</option>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                    <p className="text-error text-sm">{errors.role?.message}</p>


                    {/* Password field */}
                    <input type="password"
                        {...register("password", { required: true, minLength: 6 })}
                        className="input w-full" placeholder="Password" />

                    {errors.password?.type === "required" && (<p className='text-red-500'>Invalid password!</p>)}
                    {errors.password?.type === "minLength" && (<p className='text-red-500'> Password must be 6 characters or longer!</p>)}

                    {/* register button */}
                    <button className="btn btn-primary text-white mt-4">Register</button>
                </fieldset>
                <p className='text-[#71717A] py-2'>Already have an account? <Link to="/login" className='text-primary '>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;