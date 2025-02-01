import DataTable from 'datatables.net-react';
import DT, {Config} from 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-buttons-bs4';
import {useState} from "react";
import {Plus} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

DataTable.use(DT);

export function BookPage () {
    const [dataTableData, setDataTableData] = useState(
        [
            [1, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [2, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [3, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [3, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [3, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [3, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [3, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [4, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [4, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [4, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [4, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [4, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [5, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [6, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [6, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [6, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [6, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
            [6, 'Mengenang Makanan Enak', 'Tersedia', 'Test test test'],
        ]
    )

    const tableOption: Config = {
        ordering: true, // Mengaktifkan fitur pengurutan,
        paging: true, // Mengaktifkan pagination
        searching: true, // Mengaktifkan fitur pencarian
        info: true, // Menampilkan informasi jumlah data
        responsive: true, // Membuat tabel responsif,
    }
    return (
        <div className={'p-4 bg-white'}>
            <div className={'d-flex mb-3 w-100'} style={{gap : 10}}>
                <Link to={"/add-book"}>
                    <button className="btn btn-success d-flex align-items-center" style={{
                        gap: 3
                    }}><Plus/> Add Buku
                    </button>
                </Link>

                <button className="btn btn-success d-flex align-items-center" style={{
                    gap: 3
                }}> Daftar Peminjaman Buku
                </button>
            </div>

            <DataTable data={dataTableData} options={tableOption} className={'table table-bordered table-hover mt-3'}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Judul Buku</th>
                    <th>Status</th>
                    <th>Tindakan</th>
                </tr>
                </thead>
            </DataTable>
        </div>
    )
}