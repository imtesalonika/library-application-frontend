import { toast } from 'react-toastify'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { useEffect, useState } from 'react'
import { formatWaktu } from '@app/services/format-waktu'
import { CheckLg, XLg } from 'react-bootstrap-icons'

export default function PinjamBuku() {
  const [dataPeminjaman, setDataPeminjaman] = useState([])

  const getDataPeminjaman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pinjam-buku`)

      if (response.status === 200) {
        setDataPeminjaman(response.data.data)
        console.log('Data peminjaman berhasil diambil:', response.data.data) // Tambahkan log
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
      console.error('Gagal mengambil data peminjaman:', e) // Tambahkan log error
    }
  }

  const handleAcceptRejectPeminjaman = async (id: number, status: string) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/pinjam-buku/${id}`, {
        status: status,
      });
  
      if (response.status === 200) {
        await getDataPeminjaman(); // Refresh data
        toast.success(response.data.message);
        console.log('Status peminjaman berhasil diperbarui:', response.data.message);
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
      console.error('Gagal memperbarui status peminjaman:', e);
    }
  };

  const handlePerpanjang = async (id: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/pinjam-buku/perpanjang/${id}`
      )

      if (response.status === 200) {
        await getDataPeminjaman() // Gunakan await untuk memastikan data diperbarui
        toast.success(response.data.message)
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
      console.error('Gagal memperbarui status peminjaman:', e) // Tambahkan log error
    }
  }

  useEffect(() => {
    getDataPeminjaman() // Tidak perlu .then() di sini
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <h1>Peminjaman Buku</h1>

      <table className={'table table-bordered table-hover mt-3'}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul Buku</th>
            <th>Peminjam</th>
            <th>Status</th>
            <th>Tanggal Pinjam</th>
            <th>Batas Peminjaman</th>
            <th>Tanggal Kembali</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {dataPeminjaman?.length > 0 ? (
            dataPeminjaman.map((row: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.judul_buku}</td>
                <td>{row.nama_peminjam}</td>
                <td>{row.status_peminjaman}</td>
                <td>{formatWaktu(row.tanggal_pinjam)}</td>
                <td>{formatWaktu(row.batas_peminjaman)}</td>
                <td>
                  {row.tanggal_kembali ? formatWaktu(row.tanggal_kembali) : '-'}
                </td>
                <td>
                  {row.status_peminjaman === 'REQ' ? (
                    <div className={'d-flex'} style={{ gap: '5px' }}>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          handleAcceptRejectPeminjaman(
                            row.id_peminjaman,
                            'IS BEING BORROWED'
                          )
                        }
                      >
                        <CheckLg />
                      </button>
                      <button
                        onClick={() =>
                          handleAcceptRejectPeminjaman(
                            row.id_peminjaman,
                            'REJECTED'
                          )
                        }
                        className="btn btn-danger btn-sm"
                      >
                        <XLg />
                      </button>
                    </div>
                  ) : row.status_peminjaman === 'DONE' ||
                    row.status_peminjaman === 'REJECTED' ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        handlePerpanjang(row.id_peminjaman).then()
                      }}
                    >
                      Perpanjang
                    </button>
                  ) : (
                    <div
                      className={'d-flex flex-wrap'}
                      style={{
                        gap: 5,
                      }}
                    >
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          handleAcceptRejectPeminjaman(
                            row.id_peminjaman,
                            'DONE'
                          )
                        }
                      >
                        Selesai
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          handlePerpanjang(row.id_peminjaman).then()
                        }}
                      >
                        Perpanjang
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                Tidak ada data!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
