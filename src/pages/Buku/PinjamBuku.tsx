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
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
    }
  }

  const handleAcceptRejectPeminjaman = async (id: number, status: string) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/pinjam-buku/${id}`, {
        status: status,
      })

      if (response.status === 200) {
        getDataPeminjaman().then()
        toast.success(response.data.message)
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
    }
  }

  useEffect(() => {
    getDataPeminjaman().then()
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
                <td>{row.nama_user}</td>
                <td>{row.status}</td>
                <td>{formatWaktu(row.tanggal_pinjam)}</td>
                <td>
                  {row.tanggal_kembali ? formatWaktu(row.tanggal_kembali) : '-'}
                </td>
                <td>
                  {row.status === 'REQ' ? (
                    <div className={'d-flex'} style={{ gap: '5px' }}>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          handleAcceptRejectPeminjaman(
                            row.id,
                            'ACCEPTED'
                          ).then()
                        }}
                      >
                        <CheckLg />
                      </button>
                      <button
                        onClick={() => {
                          handleAcceptRejectPeminjaman(
                            row.id,
                            'REJECTED'
                          ).then()
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        <XLg />
                      </button>
                    </div>
                  ) : row.status === 'DONE' || row.status === 'REJECTED' ? (
                    '-'
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        handleAcceptRejectPeminjaman(row.id, 'DONE').then()
                      }}
                    >
                      Selesai
                    </button>
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
