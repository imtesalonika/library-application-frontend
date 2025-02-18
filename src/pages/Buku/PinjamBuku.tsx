import { toast } from 'react-toastify'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { useEffect, useState } from 'react'
import { formatWaktu } from '@app/services/format-waktu'

export default function PinjamBuku() {
  const [dataPeminjaman, setDataPeminjaman] = useState([])

  const getDataPeminjaman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pinjam-buku`)

      if (response.status === 200) {
        setDataPeminjaman(response.data.data)
      }
    } catch (e: any) {
      toast.success(e.response.data.message)
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
            <th>Judul Pengumuman</th>
            <th>Isi Pengumuman</th>
            <th>Kategori</th>
            <th>Created At</th>
            <th>Updated At</th>
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
                <td>{formatWaktu(row.tanggal_kembali)}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    style={{ gap: '5px' }}
                  >
                    {/*<button*/}
                    {/*  className="btn btn-warning btn-sm"*/}
                    {/*  onClick={() => {*/}
                    {/*    navigate(`/pengumuman/edit/${row.id}`)*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <PencilSquare />*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*  onClick={() => {*/}
                    {/*    handleRemovePengumuman(row.id).then()*/}
                    {/*  }}*/}
                    {/*  className="btn btn-danger btn-sm"*/}
                    {/*>*/}
                    {/*  <Trash />*/}
                    {/*</button>*/}
                  </div>
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
