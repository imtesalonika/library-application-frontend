import DataTable from 'datatables.net-react'
import DT, { Config } from 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-buttons-bs4'
import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

DataTable.use(DT)

export function BookPage() {
  const [bookData, setBookData] = useState<any>()
  const MySwal = withReactContent(Swal)
  const navigation = useNavigate()

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

  const handleRemoveBuku = async (bookId: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/book/${bookId}`)

      if (response.status === 200) {
        MySwal.fire({
          text: response.data.message,
          icon: 'success',
          title: 'Success!',
        }).then()
        getBookData().then()
      }
    } catch (e: any) {
      MySwal.fire({
        text: e.response.data.message,
        icon: 'error',
        title: 'Failed!',
      }).then()
      console.log(e)
    }
  }

  const tableOption: Config = {
    ordering: true,
    paging: true,
    searching: true,
    info: true,
    responsive: true,
  }

  return (
    <div className={'p-4 bg-white'}>
      <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
        <Link to={'/book/add'}>
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
          Daftar Peminjaman Buku
        </button>
      </div>

      {bookData !== undefined ? (
        <DataTable
          options={tableOption}
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
          <tbody>
            {bookData?.map((row: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.judul}</td>
                <td>{row.status}</td>
                <td className={'d-flex'} style={{ gap: '5px' }}>
                  <button
                    className="btn btn-success d-flex align-items-center"
                    onClick={() => {
                      navigation(`/book/${row.id}`)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn btn-warning d-flex align-items-center"
                    onClick={() => {
                      navigation(`/book/${row.id}`)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-danger d-flex align-items-center"
                    onClick={() => {
                      handleRemoveBuku(row.id).then()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      ) : (
        ''
      )}
    </div>
  )
}
