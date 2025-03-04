import DataTable from 'datatables.net-react'
import DT, { Config } from 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BoxArrowUpRight, PencilSquare, Trash } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

DataTable.use(DT)

export function LaporanPeminjamanPage() {
  const [dataPeminjaman, setDataPeminjaman] = useState<any>([])
  const [allDataPeminjaman, setAllDataPeminjaman] = useState<any>([])

  const getMonthlyBorrowingData = (data: any) => {
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]

    const filteredData = data.filter(
      (item: any) => item.status_peminjaman === 'DONE'
    )

    const borrowCounts = filteredData.reduce((acc: any, item: any) => {
      const monthIndex = new Date(item.tanggal_pinjam).getMonth()
      acc[monthIndex] = (acc[monthIndex] || 0) + 1
      return acc
    }, {})

    return monthNames.map((month, index) => [month, borrowCounts[index] || 0])
  }

  const getDataPeminjaman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pinjam-buku`)

      if (response.status === 200) {
        setDataPeminjaman(getMonthlyBorrowingData(response.data.data))
        setAllDataPeminjaman(response.data.data)
        console.log('Data peminjaman berhasil diambil:', response.data.data) // Tambahkan log
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
      console.error('Gagal mengambil data peminjaman:', e) // Tambahkan log error
    }
  }

  useEffect(() => {
    getDataPeminjaman().then()
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <h2>Laporan Peminjaman</h2>
      <table
        className={'table table-bordered table-hover mt-3 text-center'}
        style={{ width: '100%' }}
      >
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Bulan</th>
            <th style={{ width: '40%' }}>Jumlah Peminjaman</th>
            <th style={{ width: '20%' }}>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All Months</td>
            <td>
              {
                allDataPeminjaman?.filter((item: any) => {
                  return item.status_peminjaman === 'DONE'
                }).length
              }
            </td>
            <td>
              <div className="btn-group" role="group" style={{ gap: '5px' }}>
                <Link to={`/dashboard/borrowed-books-detail/All Month`}>
                  <button
                    className="btn btn-success d-flex align-items-center"
                    style={{ gap: 3 }}
                  >
                    <BoxArrowUpRight />
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          {dataPeminjaman.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>
                <div className="btn-group" role="group" style={{ gap: '5px' }}>
                  <Link to={`/dashboard/borrowed-books-detail/${row[0]}`}>
                    <button
                      className="btn btn-success d-flex align-items-center"
                      style={{ gap: 3 }}
                    >
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
  )
}
