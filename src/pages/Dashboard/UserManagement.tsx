import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, PencilSquare, Trash, BoxArrowUpRight } from "react-bootstrap-icons";

type User = {
    id: number;
    nama: string;
    email: string;
    role: string;
    hp: string;
};

export function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(storedUsers);
    }, []);

    return (
        <div className={'p-4 bg-white'}>
            <h2>Manajemen Pengguna</h2>
            <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
                <Link to="/dashboard/user-management/add">
                    <button className="btn btn-success d-flex align-items-center" style={{ gap: 3 }}>
                        <Plus /> Tambah Pengguna
                    </button>
                </Link>
            </div>

            <table className={'table table-bordered table-hover mt-3'} style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>No.</th>
                        <th style={{ width: '40%' }}>Nama</th>
                        <th style={{ width: '20%' }}>Email</th>
                        <th style={{ width: '10%' }}>Role</th>
                        <th style={{ width: '15%' }}>Nomor HP</th>
                        <th style={{ width: '10%' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.nama}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.hp}</td>
                            <td className="text-center">
                                <div className="btn-group" role="group" style={{ gap: '5px' }}>
                                    <Link to={`/usermanagement/detail/${user.id}`}> 
                                        <button className="btn btn-success btn-sm"><BoxArrowUpRight /></button> 
                                    </Link>
                                    <button className="btn btn-warning btn-sm"><PencilSquare /></button>
                                    <button className="btn btn-danger btn-sm"><Trash /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
