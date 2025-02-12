import { useParams, Link } from "react-router-dom";

type User = {
    id: number;
    nama: string;
    email: string;
    role: string;
    hp: string;
};

export function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.id === Number(id));

    if (!user) {
        return <div className="p-4">Pengguna tidak ditemukan.</div>;
    }

    return (
        <div className="p-4 bg-white">
            <h2>Detail Pengguna</h2>
            <p><strong>Nama:</strong> {user.nama}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Nomor HP:</strong> {user.hp}</p>

            <Link to="/dashboard/user-management">
                <button className="btn btn-primary">Kembali</button>
            </Link>
        </div>
    );
}
