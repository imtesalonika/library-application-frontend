import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type User = {
    id: number;
    nama: string;
    email: string;
    role: string;
    hp: string;
};

export function UserEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.id === Number(id));

    if (userIndex === -1) {
        return <div className="p-4">Pengguna tidak ditemukan.</div>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState(users[userIndex]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/dashboard/user-management");
    };

    return (
        <div className="p-4 bg-white">
            <h2>Edit Pengguna</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nama</label>
                    <input type="text" name="nama" value={user.nama} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <input type="text" name="role" value={user.role} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Nomor HP</label>
                    <input type="text" name="hp" value={user.hp} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Simpan</button>
            </form>
        </div>
    );
}
