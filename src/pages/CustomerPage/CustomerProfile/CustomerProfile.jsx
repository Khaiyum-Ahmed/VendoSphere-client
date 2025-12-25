import { useState } from "react";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

/* ================= PASSWORD RULE ================= */
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const CustomerProfile = () => {
    const axios = UseAxiosSecure();
    const { user, loading } = UseAuth();

    /* ================= STATE ================= */
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        phone: "",
        address: "",
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    if (loading) return <div className="text-center py-20">Loading...</div>;

    /* ================= SAVE ALL ================= */
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        try {
            /* ===== UPDATE PROFILE INFO ===== */
            await axios.patch("/customer/profile", formData);

            if (formData.name !== user.displayName) {
                await updateProfile(user, { displayName: formData.name });
            }

            /* ===== PASSWORD CHANGE (OPTIONAL) ===== */
            if (passwords.newPassword) {
                if (passwords.newPassword !== passwords.confirmPassword) {
                    return Swal.fire("Error", "Passwords do not match", "error");
                }

                if (!passwordRegex.test(passwords.newPassword)) {
                    return Swal.fire(
                        "Weak Password",
                        "Min 8 chars, uppercase, lowercase, number & symbol",
                        "warning"
                    );
                }

                if (!passwords.currentPassword) {
                    return Swal.fire(
                        "Required",
                        "Please enter your current password",
                        "warning"
                    );
                }

                /* ===== RE-AUTHENTICATE ===== */
                const credential = EmailAuthProvider.credential(
                    user.email,
                    passwords.currentPassword
                );

                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, passwords.newPassword);
            }

            Swal.fire(
                "Success",
                "Profile updated successfully",
                "success"
            );

            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            <form
                onSubmit={handleSaveChanges}
                className="card bg-base-100 shadow p-6 space-y-5"
            >
                {/* ================= PROFILE ================= */}
                <h3 className="font-semibold text-lg">Personal Information</h3>

                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />

                <input
                    type="email"
                    className="input input-bordered w-full bg-gray-100"
                    value={user.email}
                    disabled
                />

                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                    }
                />

                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                    }
                />

                {/* ================= PASSWORD ================= */}
                <h3 className="font-semibold text-lg mt-6">Change Password</h3>

                {/* CURRENT PASSWORD */}
                <div className="relative">
                    <input
                        type={show.current ? "text" : "password"}
                        className="input input-bordered w-full pr-10"
                        placeholder="Current Password"
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                currentPassword: e.target.value,
                            })
                        }
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() =>
                            setShow({ ...show, current: !show.current })
                        }
                    >
                        {show.current ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {/* NEW PASSWORD */}
                <div className="relative">
                    <input
                        type={show.new ? "text" : "password"}
                        className="input input-bordered w-full pr-10"
                        placeholder="New Password"
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                newPassword: e.target.value,
                            })
                        }
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShow({ ...show, new: !show.new })}
                    >
                        {show.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="relative">
                    <input
                        type={show.confirm ? "text" : "password"}
                        className="input input-bordered w-full pr-10"
                        placeholder="Confirm New Password"
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() =>
                            setShow({ ...show, confirm: !show.confirm })
                        }
                    >
                        {show.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                <p className="text-xs text-gray-500">
                    Password must contain uppercase, lowercase, number & symbol
                </p>

                {/* ================= SAVE ================= */}
                <button className="btn btn-primary w-full text-white mt-4">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default CustomerProfile;
