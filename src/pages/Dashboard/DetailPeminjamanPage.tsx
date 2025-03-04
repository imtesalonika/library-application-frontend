import { apiUrl } from '@app/utils/env'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export function DetailPeminjamanPage() {
  const { month }: any = useParams()
  const [currentData, setCurrentData] = useState<any>([])
  const [allData, setAllData] = useState<any>([])
  const [fromDate, setFromDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [fromDateErr, setFromDateErr] = useState('')
  const [endDateErr, setEndDateErr] = useState('')

  const filterByMonthAndStatus = (data: any) => {
    const bulanIndo: any = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    }

    return data.filter((item: any) => {
      const tanggal = new Date(item.tanggal_pinjam)
      return (
        tanggal.getMonth() === bulanIndo[month] &&
        item.status_peminjaman === 'DONE'
      )
    })
  }

  const getDataPeminjaman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pinjam-buku`, {
        params: {
          start_date: fromDate,
          end_date: endDate,
        },
      })

      if (response.status === 200) {
        setCurrentData(filterByMonthAndStatus(response.data.data))
        setAllData(response.data.data)
        console.log('Data peminjaman berhasil diambil:', response.data.data)
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
      console.error('Gagal mengambil data peminjaman:', e)
    }
  }

  const formatTanggal = (tanggalISO: any) => {
    const tanggal = new Date(tanggalISO)
    const hari = String(tanggal.getDate()).padStart(2, '0') // Ambil tanggal (2 digit)
    const bulan = String(tanggal.getMonth() + 1).padStart(2, '0') // Ambil bulan (2 digit)
    const tahun = tanggal.getFullYear() // Ambil tahun

    return `${hari}-${bulan}-${tahun}`
  }

  const applyFilter = () => {
    setFromDateErr('')
    setEndDateErr('')

    if (fromDate && endDate && endDate < fromDate) {
      setEndDateErr('End date tidak boleh lebih kecil dari start date.')
      return
    }

    getDataPeminjaman().then()
  }

  useEffect(() => {
    getDataPeminjaman().then()
  }, [])

  return (
    <div className="p-4 bg-white">
      <h2>Detail Peminjaman Bulan {month}</h2>

      <div
        className={'d-flex'}
        style={{
          gap: 10,
        }}
      >
        <div className="form-group">
          <label>Start From :</label>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="far fa-calendar-alt"></i>
              </span>
            </div>
            <input
              type="date"
              className="form-control float-right"
              onChange={(e) => {
                setFromDate(e.target.value)
              }}
            />
          </div>
          <span className={'text-danger text-xs no-print'}>{fromDateErr}</span>
        </div>

        <div className="form-group">
          <label>Until :</label>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="far fa-calendar-alt"></i>
              </span>
            </div>
            <input
              type="date"
              className="form-control float-right"
              onChange={(e) => {
                setEndDate(e.target.value)
              }}
            />
          </div>
          <span className={'text-danger text-xs no-print'}>{endDateErr}</span>
        </div>

        <div
          style={{
            marginTop: 32,
          }}
        >
          <button
            className="btn btn-success d-flex align-items-center no-print"
            onClick={() => {
              applyFilter()
            }}
          >
            Terapkan Filter
          </button>
        </div>

        <div
          style={{
            marginTop: 32,
          }}
        >
          <button
            className="btn btn-success d-flex align-items-center no-print"
            onClick={() => {
              window.print()
            }}
          >
            Save As PDF
          </button>
        </div>
      </div>

      <div>
        {`DONE : ${
          allData.filter((item: any) => {
            return item.status_peminjaman === 'DONE'
          }).length
        }, REQ : ${
          allData.filter((item: any) => {
            return item.status_peminjaman === 'REQ'
          }).length
        }, ACCEPTED : ${
          allData.filter((item: any) => {
            return item.status_peminjaman === 'ACCEPTED'
          }).length
        }, REJECTED : ${
          allData.filter((item: any) => {
            return item.status_peminjaman === 'REJECTED'
          }).length
        }`}
      </div>

      <Table bordered hover className="text-center mt-3">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>ID Buku</th>
            <th>Judul Buku</th>
            <th>ID Peminjam</th>
            <th>Peminjam</th>
            <th>Status Peminjaman</th>
            <th>Periode Peminjaman</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((book: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.id_buku}</td>
                <td>{book.judul_buku}</td>
                <td>{book.id_user}</td>
                <td>{book.nama_peminjam}</td>
                <td>{book.status_peminjaman}</td>
                <td>{`${formatTanggal(book.tanggal_pinjam)} s/d ${formatTanggal(book.tanggal_kembali)}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
