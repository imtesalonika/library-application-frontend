import DataTable from 'datatables.net-react'
import DT, { Config } from 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-buttons-bs4'
import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

DataTable.use(DT)

export function BookPage() {
  const [bookData, setBookData] = useState<any>([])

  const getBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/book`)
      setBookData(response.data.data)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    getBookData().then()
  }, [])

  const tableOption: Config = {
    ordering: true,
    paging: true,
    searching: true,
    info: true,
    responsive: true,
    columns: [
      {
        title: 'No',
        data: null,
        render: (data, type, row, meta) => meta.row + 1,
      },
      { title: 'Judul Buku', data: 'judul' },
      {
        title: 'Status',
        data: 'status',
        render: (data) => {
          if (data === 1) {
            return 'Tersedia'
          } else {
            return 'Tidak Tersedia'
          }
        },
      },
      {
        title: 'Tindakan',
        data: null,
        render: () =>
          `<button class="btn btn-danger d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>`,
      },
    ],
  }
  return (
    <div className={'p-4 bg-white'}>
      <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
        <Link to={'/add-book'}>
          <button
            className="btn btn-success d-flex align-items-center"
            style={{
              gap: 3,
            }}
          >
            <Plus /> Add Buku
          </button>
        </Link>

        <button
          className="btn btn-success d-flex align-items-center"
          style={{
            gap: 3,
          }}
        >
          {' '}
          Daftar Peminjaman Buku
        </button>
      </div>

      {bookData.length > 0 ? (
        <DataTable
          options={tableOption}
          data={bookData}
          className={'table table-bordered table-hover mt-3'}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Judul Buku</th>
              <th>Status</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody></tbody>
        </DataTable>
      ) : (
        ''
      )}
    </div>
  )
}
