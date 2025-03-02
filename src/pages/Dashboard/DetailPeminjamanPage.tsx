import { apiUrl } from "@app/utils/env";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function DetailPeminjamanPage() {
    const {month} : any = useParams();
    const [currentData, setCurrentData] = useState<any>([]);

    const  filterByMonthAndStatus = (data: any) => {
        const bulanIndo: any = {
            "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
            "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
        };

        console.log(data.filter((item: any) => {
            const tanggal = new Date(item.tanggal_pinjam);
            return tanggal.getMonth() === bulanIndo[month] && item.status === 'DONE';
        }));
        
    
        return data.filter((item: any) => {
            const tanggal = new Date(item.tanggal_pinjam);
            return tanggal.getMonth() === bulanIndo[month] && item.status === 'DONE';
        });
    }

    const getDataPeminjaman = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/pinjam-buku`);

            if (response.status === 200) {
                setCurrentData(filterByMonthAndStatus(response.data.data));
                console.log('Data peminjaman berhasil diambil:', response.data.data); // Tambahkan log
            }
        } catch (e: any) {
            toast.error(e.response.data.message);
            console.error('Gagal mengambil data peminjaman:', e); // Tambahkan log error
        }
    };

    const formatTanggal = (tanggalISO: any) => {
        const tanggal = new Date(tanggalISO);
        const hari = String(tanggal.getDate()).padStart(2, '0'); // Ambil tanggal (2 digit)
        const bulan = String(tanggal.getMonth() + 1).padStart(2, '0'); // Ambil bulan (2 digit)
        const tahun = tanggal.getFullYear(); // Ambil tahun
    
        return `${hari}-${bulan}-${tahun}`;
    }

    useEffect(() => {
        getDataPeminjaman().then()
    }, [])
    

    return (
        <div className="p-4 bg-white">
            <h2>Detail Peminjaman</h2>
            
            <Table bordered hover className="text-center">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>Nomor</th>
                        <th style={{ width: "60%" }}>Judul Buku</th>
                        <th style={{ width: "30%" }}>Periode Peminjaman</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((book: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{book.judul_buku}</td>
                            <td>{`${formatTanggal(book.tanggal_pinjam)} s/d ${formatTanggal(book.tanggal_kembali)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}