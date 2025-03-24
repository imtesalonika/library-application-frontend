import { toast } from 'react-toastify'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { useEffect, useState } from 'react'
import { CheckLg, XLg } from 'react-bootstrap-icons'
import moment from 'moment-timezone'
import DataTable from 'datatables.net-react'
import DT, { Config } from 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-buttons-bs4'

// Initialize DataTable with DT
DataTable.use(DT)


export default function PinjamBuku() {
  const [dataPeminjaman, setDataPeminjaman] = useState([])

  const getDataPeminjaman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pinjam-buku`);
  
      if (response.status === 200) {
        setDataPeminjaman(response.data.data);
        console.log('Data peminjaman berhasil diambil:', response.data.data);
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
      console.error('Gagal mengambil data peminjaman:', e);
    }
  };

  const handleAcceptRejectPeminjaman = async (
    id: number,
    status: string,
    id_buku: string
  ) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/pinjam-buku/${id}`, {
        status: status,
        id_buku: id_buku,
      })

      if (response.status === 200) {
        await getDataPeminjaman() // Refresh data
        toast.success(response.data.message)
        console.log(
          'Status peminjaman berhasil diperbarui:',
          response.data.message
        )
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
      console.error('Gagal memperbarui status peminjaman:', e)
    }
  }

  const handlePerpanjang = async (id: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/pinjam-buku/perpanjang/${id}`
      )

      if (response.status === 200) {
        await getDataPeminjaman()
        toast.success(response.data.message)
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
      console.error('Gagal memperbarui status peminjaman:', e)
    }
  }

  useEffect(() => {
    getDataPeminjaman()
  }, [])

  const tableOption: Config = {
    ordering: true,
    paging: true,
    searching: true,
    info: true,
    responsive: true,
  }

  return (
    <div className={'p-4 bg-white'}>
      <h1>Peminjaman Buku</h1>
  
      {dataPeminjaman?.length > 0 ? (
        <DataTable
          options={tableOption}
          className={'table table-bordered table-hover mt-3'}
        >
          <thead>
          <tr>
      <th style={{ width: '3%' }}>No.</th>
      <th style={{ width: '25%' }}>Judul Buku</th>
      <th style={{ width: '13%' }}>Peminjam</th>
      <th style={{ width: '12%' }}>Status</th>
      <th style={{ width: '10%' }}>Tanggal Pinjam</th>
      <th style={{ width: '10%' }}>Batas Peminjaman</th>
      <th style={{ width: '10%' }}>Tanggal Kembali</th>
      <th style={{ width: '27%' }}>Tindakan</th>
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
                              'IS BEING BORROWED',
                              row.id_buku
                            )
                          }
                        >
                          <CheckLg />
                        </button>
                        <button
                          onClick={() =>
                            handleAcceptRejectPeminjaman(
                              row.id_peminjaman,
                              'REJECTED',
                              row.id_buku
                            )
                          }
                          className="btn btn-danger btn-sm"
                        >
                          <XLg />
                        </button>
                      </div>
                    ) : row.status_peminjaman === 'DONE' ||
                      row.status_peminjaman === 'REJECTED' ? (
                      '-'
                    ) : (
                      <div
                        className={'d-flex flex-wrap'}
                        style={{
                          gap: 5,
                        }}
                      >
                        <button
                          onClick={() =>
                            handleAcceptRejectPeminjaman(
                              row.id_peminjaman,
                              'REJECTED',
                              row.id_buku
                            )
                          }
                          className="btn btn-danger btn-sm"
                        >
                          Tidak diambil
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            handlePerpanjang(row.id_peminjaman).then();
                          }}
                        >
                          Perpanjang
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleAcceptRejectPeminjaman(
                              row.id_peminjaman,
                              'DONE',
                              row.id_buku
                            )
                          }
                        >
                          Selesai
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  Tidak ada data!
                </td>
              </tr>
            )}
          </tbody>
        </DataTable>
      ) : (
        <p className="text-center mt-3">Tidak ada data peminjaman!</p>
      )}
    </div>
  );
  
}

export function formatWaktu(waktu: any) {
  if (!waktu) return '-'

  // Mengonversi waktu ke zona waktu Asia/Jakarta
  return moment.tz(waktu, 'Asia/Jakarta').format('DD MMM YYYY HH:mm')
}
