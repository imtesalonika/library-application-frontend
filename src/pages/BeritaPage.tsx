import DataTable from 'datatables.net-react';
import DT, { Config } from 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-buttons-bs4';
import { useState } from "react";
import { Plus, PencilSquare, Trash, BoxArrowUpRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

DataTable.use(DT);

export function BeritaPage() {
    const [dataTableData, setDataTableData] = useState([
        [1, 'Sharing Session terkait Program Pembinaan Mahasiswa Wirausaha (P2MW)', 'Perpustakaan', ''],
        [2, 'Sosialisasi Pedoman dan Panduan yang Berlaku di LPPM Tahun 2024', 'Perpustakaan', ''],
        [3, 'Pembekalan Mahasiswa Kerja Praktik Prodi Teknik Bioproses', 'Perpustakaan', ''],
        [4, 'Institut Teknologi Del Jalin Kerjasama dengan Hidrokinetik Technologies Sdn. Bhd.', 'Perpustakaan', ''],
        [5, 'Mahasiswa Teknik Elektro IT Del Berhasil Meraih Medali Emas Pada IDEA FEST 2024', 'Perpustakaan', ''],
        [6, 'Pelatihan Metagenomics Analysis from Environmental Samples using Oxford Nanopore Technologies', 'Perpustakaan', ''],
        [7, 'Del Debate Championship (DDC) 2024', 'Perpustakaan', '']
    ]);

    const tableOption: Config = {
        ordering: true,
        paging: true,
        searching: true,
        info: true,
        responsive: true,
    };

    return (
        <div className={'p-4 bg-white'}>
            <h2>Berita</h2>
            <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
                <Link to={"/addberita"}>
                    <button className="btn btn-success d-flex align-items-center" style={{
                        gap: 3
                    }}><Plus/> Add Berita
                    </button>
                </Link>
            </div>

            <table className={'table table-bordered table-hover mt-3'}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Judul Berita</th>
                        <th>Kategori</th>
                        <th>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td className="text-center">
                                <div className="btn-group" role="group" style={{ gap: '5px' }}>
                                    <button className="btn btn-success btn-sm"><BoxArrowUpRight /></button>
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
