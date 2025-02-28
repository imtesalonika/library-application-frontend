import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { isStringContainsNumber } from '@app/utils/is-string-contains-number'
import { ArrowLeft } from 'react-bootstrap-icons'

export function AddTAPage() {
  const { id } = useParams()
  const [judul, setJudul] = useState('')
  const [judulErr, setJudulErr] = useState('')
  const [penulis, setPenulis] = useState('')
  const [penulisErr, setPenulisErr] = useState('')
  const [pembimbing, setPembimbing] = useState('')
  const [pembimbingErr, setPembimbingErr] = useState('')
  const [fakultas, setFakultas] = useState('')
  const [fakultasErr, setFakultasErr] = useState('')
  const [prodiErr, setProdiErr] = useState('')
  const [prodi, setProdi] = useState('')
  const [katakunciErr, setKataKunciErr] = useState('')
  const [katakunci, setKataKunci] = useState('')
  const [abstrak, setAbstrak] = useState('')
  const [abstrakErr, setAbstrakErr] = useState('')
  const [tahun, setTahun] = useState('')
  const [tahunErr, setTahunErr] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [penguji, setPenguji] = useState('')
  const [pengujiErr, setPengujiErr] = useState('')
  const [lokasiErr, setLokasiErr] = useState('')
  const navigation = useNavigate()
  const MySwal = withReactContent(Swal)

  const fakultasProdiMapping = {
    FITE: ['Informatika', 'Teknik Elektro', 'Sistem Informasi'],
    FTI: ['Manajemen Rekayasa', 'Teknik Metalurgi'],
    FTB: ['Bioproses'],
    Vokasi: ['Teknologi Informasi', 'Teknologi Komputer', 'Teknologi Rekayasa Perangkat Lunak'],
  };
  
  type FakultasType = keyof typeof fakultasProdiMapping;

  const getBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tugasakhir/${id}`)
      setJudul(response.data.data.judul)
      setPenulis(response.data.data.penulis)
      setPembimbing(response.data.data.pembimbing)
      setFakultas(response.data.data.fakultas)
      setProdi(response.data.data.prodi)
      setKataKunci(response.data.data.katakunci)
      setAbstrak(response.data.data.abstrak)
      setTahun(response.data.data.tahun)
      setLokasi(response.data.data.lokasi)
      setPenguji(response.data.data.penguji)
    } catch (e: any) {
      console.log(e)
    }
  }

  const validateForm = () => {
    let isValid = true;

    if (judul === '') {
      setJudulErr('Tidak boleh kosong');
      isValid = false;
    }
    if (penulis === '') {
      setPenulisErr('Tidak boleh kosong');
      isValid = false;
    }
    if (isStringContainsNumber(penulis)) {
      setPenulisErr('Tidak boleh mengandung angka!');
      isValid = false;
    }
    if (pembimbing === '') {
      setPembimbingErr('Tidak boleh kosong');
      isValid = false;
    }
    if (fakultas === '') {
      setFakultasErr('Tidak boleh kosong');
      isValid = false;
    }
    if (prodi === '') {
      setProdiErr('Tidak boleh kosong');
      isValid = false;
    }
    if (!fakultasProdiMapping[fakultas as FakultasType]?.includes(prodi)) {
      setProdiErr('Prodi tidak sesuai dengan fakultas yang dipilih');
      isValid = false;
    }
    if (abstrak === '') {
      setAbstrakErr('Tidak boleh kosong');
      isValid = false;
    }
    if (penguji === '') {
      setPengujiErr('Tidak boleh kosong');
      isValid = false;
    }
    if (lokasi === '') {
      setLokasiErr('Tidak boleh kosong');
      isValid = false;
    }

    return isValid;
  };

  const handleSaveTugasAkhir = async () => {
    if (!validateForm()) return;

    try {
      const formData = {
        judul,
        penulis,
        pembimbing,
        fakultas,
        prodi,
        katakunci,
        abstrak,
        tahun,
        lokasi,
        penguji,
      };
      const response = await axios.post(`${apiUrl}/api/tugasakhir`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        navigation('/tugasakhir');
      }
    } catch (e: any) {
      MySwal.fire({
        title: 'Failed!',
        text: e.response?.data?.message,
        icon: 'error',
      });
      console.log(e);
    }
  };

  const handleUpdateTugasAkhir = async () => {
    if (!validateForm()) return;

    try {
      const formData = {
        judul,
        penulis,
        pembimbing,
        fakultas,
        prodi,
        katakunci,
        abstrak,
        tahun,
        lokasi,
        penguji,
      };

      const response = await axios.put(
        `${apiUrl}/api/tugasakhir/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        navigation('/tugasakhir');
      }
    } catch (e: any) {
      MySwal.fire({
        title: 'Failed!',
        text: e.response.data.message,
        icon: 'error',
      });
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getBookData().then()
    }
  }, [id])

  return (
    <div>
      <h2 className={'font-weight-bold ml-3 pt-3'}>Tugas Akhir</h2>
      <div
        className={'d-flex align-items-center bg-white px-3 py-1 mb-3'}
        style={{ gap: 10 }}
      >
        <div
          className={
            'd-flex flex-column align-items-sm-center justify-content-center rounded-circle'
          }
          style={{
            backgroundColor: '#87C1FF',
            width: '40px',
            height: '40px',
          }}
          onClick={() => {
            navigation('/tugasakhir');
          }}
        >
          <ArrowLeft size={'30'} color={'#3722AE'} />
        </div>

        <span
          style={{
            color: '#3722AE',
          }}
          className={'text-lg'}
        >
          {id ? 'Edit Tugas Akhir' : 'Tambah Tugas Akhir'}
        </span>
      </div>
      <div className={'px-5'}>
        <div className={'w-100'}>
          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Judul Tugas Akhir</label>
              <input
                type="text"
                className="form-control"
                name="judul"
                value={judul}
                onChange={(e) => {
                  setJudul(e.target.value)
                }}
              />
              <span className={'text-danger'}>{judulErr}</span>
            </div>
            <div className="form-group col-sm">
              <label>Kata Kunci</label>
              <input
                type="text"
                className="form-control"
                name="katakunci"
                value={katakunci}
                onChange={(e) => {
                  setKataKunci(e.target.value)
                }}
              />
              <span className={'text-danger'}>{katakunciErr}</span>
            </div>
          </div>
          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Penulis</label>
              <input
                type="text"
                className="form-control"
                name="penulis"
                value={penulis}
                onChange={(e) => {
                  setPenulis(e.target.value)
                }}
              />
              <span className={'text-danger'}>{penulisErr}</span>
            </div>
            <div className="form-group col-sm">
              <label>Abstrak</label>
              <textarea
                className="form-control"
                name="abstrak"
                value={abstrak}
                onChange={(e) => {
                  setAbstrak(e.target.value)
                }}
              ></textarea>
              <span className={'text-danger'}>{abstrakErr}</span>
            </div>
          </div>
          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Pembimbing</label>
              <textarea
                className="form-control"
                name="pembimbing"
                value={pembimbing}
                onChange={(e) => {
                  setPembimbing(e.target.value)
                }}
              />
              <span className={'text-danger'}>{pembimbingErr}</span>
            </div>
            <div className="form-group col-sm">
              <label>Tahun</label>
              <input
                type="text"
                className="form-control"
                name="tahun"
                value={tahun}
                onChange={(e) => {
                  setTahun(e.target.value)
                }}
              />
              <span className={'text-danger'}>{tahunErr}</span>
            </div>
          </div>
          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Fakultas</label>
              <select
                className="form-control"
                name="fakultas"
                value={fakultas}
                onChange={(e) => {
                  setFakultas(e.target.value)
                  setProdi('') // Reset prodi ketika fakultas berubah
                }}
              >
                <option value="">Pilih Fakultas</option>
                <option value="FITE">FITE</option>
                <option value="FTI">FTI</option>
                <option value="FTB">FTB</option>
                <option value="Vokasi">Vokasi</option>
              </select>
              <span className={'text-danger'}>{fakultasErr}</span>
            </div>
            <div className="form-group col-sm-6">
              <label>Prodi</label>
              <select
                className="form-control"
                name="prodi"
                value={prodi}
                onChange={(e) => {
                  setProdi(e.target.value)
                }}
              >
                <option value="">Pilih Prodi</option>
                {fakultasProdiMapping[fakultas as FakultasType]?.map((prodiOption: string) => (
                  <option key={prodiOption} value={prodiOption}>
                    {prodiOption}
                  </option>
                ))}
              </select>
              <span className={'text-danger'}>{prodiErr}</span>
            </div>
          </div>
          <div className={'row'}>
            <div className="form-group col-sm-6">
              <label>Lokasi</label>
              <input
                type="text"
                className="form-control"
                name="lokasi"
                value={lokasi}
                onChange={(e) => {
                  setLokasi(e.target.value)
                }}
              />
              <span className={'text-danger'}>{lokasiErr}</span>
            </div>
            <div className="form-group col-sm-6">
              <label>Penguji</label>
              <textarea
                className="form-control"
                name="penguji"
                value={penguji}
                onChange={(e) => {
                  setPenguji(e.target.value)
                }}
              />
              <span className={'text-danger'}>{pengujiErr}</span>
            </div>
          </div>
        </div>
        <button
          className={'btn btn-success mb-3'}
          onClick={() => {
            if (id) {
              handleUpdateTugasAkhir().then();
            } else {
              handleSaveTugasAkhir().then();
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}