import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        role: "",
        hp: "",
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        // Ambil data lama dari localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Tambahkan user baru ke dalam array
        const newUser = { id: storedUsers.length + 1, ...formData };
        const updatedUsers = [...storedUsers, newUser];

        // Simpan kembali ke localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Arahkan kembali ke halaman user management
        navigate("/dashboard/user-management");
    };

    return (
        <div className="p-4 bg-white">
            <h2>Tambah Pengguna</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama</label>
                    <input type="text" className="form-control" name="nama" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" name="role" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nomor HP</label>
                    <input type="text" className="form-control" name="hp" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Simpan</button>
            </form>
        </div>
    );
}
