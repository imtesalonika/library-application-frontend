import DataTable from 'datatables.net-react';
import DT, { Config } from 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import { useState } from "react";
import { Link } from "react-router-dom";
import { BoxArrowUpRight, PencilSquare, Trash } from "react-bootstrap-icons";

DataTable.use(DT);

export function LaporanPeminjamanPage() {
    const [loanData, setLoanData] = useState([
        ['January', 120],
        ['February', 98],
        ['March', 135],
        ['April', 110],
        ['May', 142],
        ['June', 95],
        ['July', 130],
        ['August', 145],
        ['September', 123],
        ['October', 150],
        ['November', 160],
        ['December', 175]
    ]);

    const tableOption: Config = {
        ordering: true,
        paging: false,
        searching: false,
        info: false,
        responsive: true,
    };

    return (
        <div className={'p-4 bg-white'}>
            <h2>Laporan Peminjaman</h2>
            <table className={'table table-bordered table-hover mt-3 text-center'} style={{ width: '100%' }}>
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: '40%' }}>Bulan</th>
                        <th style={{ width: '40%' }}>Jumlah Peminjaman</th>
                        <th style={{ width: '20%' }}>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {loanData.map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>
                                <div className="btn-group" role="group" style={{ gap: '5px' }}>
                                <Link to="/borrowed-books-detail">
    <button className="btn btn-success d-flex align-items-center" style={{ gap: 3 }}>
        <BoxArrowUpRight />
    </button>
</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
