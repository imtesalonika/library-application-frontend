import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, PencilSquare, Trash, BoxArrowUpRight } from "react-bootstrap-icons";
import axios from "axios";
import { apiUrl } from "@app/utils/env";


export function UserManagement() {
    const [users, setUsers] = useState<any>([]);

    const getAllUsers = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/users`);
          setUsers(response.data.data);
        } catch (e) {
          console.log(e);
        }
      }

    useEffect(() => {
        getAllUsers().then();
    }, []);

    return (
        <div className={'p-4 bg-white'}>
            <h2>Manajemen Pengguna</h2>

            <table className={'table table-bordered table-hover mt-3'} style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>No.</th>
                        <th style={{ width: '40%' }}>Nama</th>
                        <th style={{ width: '20%' }}>Email</th>
                        <th style={{ width: '10%' }}>Role</th>
                        <th style={{ width: '15%' }}>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
