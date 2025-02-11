import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@app/utils/env";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { isStringContainsNumber } from "@app/utils/is-string-contains-number";

export function AddTAPage() {
    const { id } = useParams();
    const [judulTugasAkhir, setJudulTugasAkhir] = useState('');
    const [judulTugasAkhirErr, setJudulTugasAkhirErr] = useState('');
    const [penulis, setPenulis] = useState('');
    const [penulisErr, setPenulisErr] = useState('');
    const [pembimbing, setPembimbing] = useState('');
    const [pembimbingErr, setPembimbingErr] = useState('');
    const [fakultas, setFakultas] = useState('');
    const [fakultasErr, setFakultasErr] = useState('');
    const [prodiErr, setProdiErr] = useState('');
    const [prodi, setProdi] = useState('');
    const [katakunciErr, setKataKunciErr] = useState('');
    const [katakunci, setKataKunci] = useState('');
    const [abstrak, setAbstrak] = useState('');
    const [abstrakErr, setAbstrakErr] = useState('');
    const navigation = useNavigate();
    const MySwal = withReactContent(Swal);
    
    const getBookData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/tugasakhir/${id}`);
          setJudulTugasAkhir(response.data.data.judul);
          setPenulis(response.data.data.penulis);
          setPembimbing(response.data.data.pembimbing);
          setFakultas(response.data.data.fakultas);
          setProdi(response.data.data.prodi);
          setKataKunci(response.data.data.katakunci);
          setAbstrak(response.data.data.abstrak);
        } catch (e: any) {
          console.log(e);
        }
    };

    const handleSaveTugasAkhir = async () => {
      try {
          const formData = {
              judul: judulTugasAkhir,
              penulis,
              pembimbing,
              fakultas,
              prodi,
              katakunci,
              abstrak
          };
  
          const response = await axios.post(`${apiUrl}/api/tugasakhir`, formData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          if (response.status === 200) {
              navigation('/tugasakhir');
          }
      } catch (e: any) {
          MySwal.fire({
              title: 'Failed!',
              text: e.response?.data?.message || 'Terjadi kesalahan',
              icon: 'error',
          });
          console.log(e);
      }
    }; 

    const handleUpdateTugasAkhir = async () => {
        try {
          const formData = new FormData();
          formData.append('judul', judulTugasAkhir);
          formData.append('penulis', penulis);
          formData.append('pembimbing', pembimbing);
          formData.append('fakultas', fakultas);
          formData.append('prodi', prodi);
          formData.append('katakunci', katakunci);
          formData.append('abstrak', abstrak);

          const response = await axios.put(`${apiUrl}/api/tugasakhir/${id}`, formData);

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
          getBookData().then();
        }
    }, [id]);

    return (
        <div>
            <h2 className={'font-weight-bold ml-3 pt-3'}>Tugas Akhir</h2>
            <div className={'px-5'}>
                <div className={'w-100'}>
                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Judul Tugas Akhir</label>
                            <input type="text" className="form-control" name="judul" value={judulTugasAkhir} onChange={(e) => {setJudulTugasAkhir(e.target.value)}} />
                            <span className={'text-danger'}>{judulTugasAkhirErr}</span>
                        </div>
                        <div className="form-group col-sm">
                            <label>Kata Kunci</label>
                            <input type="text" className="form-control" name="katakunci" value={katakunci} onChange={(e) => {setKataKunci(e.target.value)}} />
                            <span className={'text-danger'}>{katakunciErr}</span>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Penulis</label>
                            <input type="text" className="form-control" name="penulis" value={penulis} onChange={(e) => {setPenulis(e.target.value)}} />
                            <span className={'text-danger'}>{penulisErr}</span>
                        </div>
                        <div className="form-group col-sm">
                            <label>Abstrak</label>
                            <textarea className="form-control" name="abstrak" value={abstrak} onChange={(e) => {setAbstrak(e.target.value)}}></textarea>
                            <span className={'text-danger'}>{abstrakErr}</span>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Pembimbing</label>
                            <input type="text" className="form-control" name="pembimbing" value={pembimbing} onChange={(e) => {setPembimbing(e.target.value)}} />
                            <span className={'text-danger'}>{pembimbingErr}</span>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Fakultas</label>
                            <select className="form-control" name="fakultas" value={fakultas} onChange={(e) => {setFakultas(e.target.value)}}>
                                <option value="">Pilih Fakultas</option>
                                <option value="FITE">FITE</option>
                                <option value="FTI">FTI</option>
                                <option value="FTB">FTB</option>
                                <option value="Vokasi">Vokasi</option>
                            </select>
                            <span className={'text-danger'}>{fakultasErr}</span>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Prodi</label>
                            <select className="form-control" name="prodi" value={prodi} onChange={(e) => {setProdi(e.target.value)}}>
                                <option value="">Pilih Prodi</option>
                                <option value="Informatika">Informatika</option>
                                <option value="Teknik Elektro">Teknik Elektro</option>
                                <option value="Sistem Informasi">Sistem Informasi</option>
                                <option value="Teknik Bioproses">Teknik Bioproses</option>
                                <option value="Manajemen Rekayasa">Manajemen Rekayasa</option>
                                <option value="Teknik Metalurgi">Teknik Metalurgi</option>
                                <option value="Teknologi Informasi">Teknologi Informasi</option>
                                <option value="Teknologi Komputer">Teknologi Komputer</option>
                                <option value="Teknologi Rekayasa Perangkat Lunak">Teknologi Rekayasa Perangkat Lunak</option>
                            </select>
                            <span className={'text-danger'}>{prodiErr}</span>
                        </div>
                    </div>
                </div>
                <button 
                    className={'btn btn-success mb-3'} 
                    onClick={() => {
                        setJudulTugasAkhirErr('');
                        setPenulisErr('');
                        setPembimbingErr('');
                        setAbstrakErr('');
                        setFakultasErr('');
                        setProdiErr('');
                        setKataKunciErr('');
        
                        if (judulTugasAkhir === '') {
                          setJudulTugasAkhirErr('Tidak boleh kosong');
                          return;
                        }
                        if (penulis === '') {
                          setPenulisErr('Tidak boleh kosong');
                          return;
                        }
                        if (isStringContainsNumber(penulis)) {
                          setPenulisErr('Tidak boleh mengandung angka!');
                          return;
                        }
                        if (pembimbing === '') {
                          setPembimbingErr('Tidak boleh kosong');
                          return;
                        }
                        if (isStringContainsNumber(pembimbing)) {
                          setPembimbingErr('Tidak boleh mengandung angka!');
                          return;
                        }
                        if (fakultas === '') {
                            setFakultasErr('Tidak boleh kosong');
                            return;
                        }
                        if (isStringContainsNumber(fakultas)) {
                            setFakultasErr('Tidak boleh mengandung angka!');
                            return;
                        }
                        if (prodi === '') {
                            setProdiErr('Tidak boleh kosong');
                            return;
                          }
                          if (isStringContainsNumber(prodi)) {
                            setProdiErr('Tidak boleh mengandung angka!');
                            return;
                        }
                        if (abstrak === '') {
                          setAbstrakErr('Tidak boleh kosong');
                          return;
                        }
        
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
    );
}
