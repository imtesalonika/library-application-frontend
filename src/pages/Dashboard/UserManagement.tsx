import DataTable from 'datatables.net-react';
import DT, { Config } from 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import { useState } from "react";
import { Plus, PencilSquare, Trash, BoxArrowUpRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

DataTable.use(DT);

export function UserManagement() {
    const [dataTableData, setDataTableData] = useState([
        [1, 'Gerry Benyamin Abdiel Bukit', 'gerrybenyamin@email.com', 'Pustakawan', '08123456789'],
        [2, 'Gerry Benyamin Abdiel Bukit', 'gerrybenyamin@email.com', 'Pustakawan', '08129876543'],
        [3, 'Gerry Benyamin Abdiel Bukit', 'gerrybenyamin@email.com', 'Pustakawan', '08213456789'],
        [4, 'Gerry Benyamin Abdiel Bukit', 'gerrybenyamin@email.com', 'Pustakawan', '08124567890'],
        [5, 'Gerry Benyamin Abdiel Bukit', 'gerrybenyamin@email.com', 'Pustakawan', '08135678901']
    ]);

    const tableOption: Config = {
        ordering: true,
        paging: true,
        searching: true,
        info: true,
    };

    return (
        <div className={'p-4 bg-white'}>
            <h2>Manajemen Pengguna</h2>
            <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
                <Link to={"/usermanagement/add"}>
                    <button className="btn btn-success d-flex align-items-center" style={{ gap: 3 }}>
                        <Plus/> Tambah Pengguna
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
                    {dataTableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                            <td>{row[4]}</td>
                            <td className="text-center">
                                <div className="btn-group" role="group" style={{ gap: '5px' }}>
                                    <Link to={`/usermanagement/detail/${row[0]}`}> 
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
