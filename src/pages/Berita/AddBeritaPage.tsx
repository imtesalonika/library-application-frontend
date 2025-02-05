import {ArrowLeft} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export function AddBeritaPage () {
    return (
        <div>
            <h2 className={'font-weight-bold ml-3 pt-3'}>Berita</h2>

            <div className={'d-flex align-items-center bg-white px-3 py-1 mb-3'} style={{gap: 10}}>
                <Link to="/" className={'d-flex flex-column align-items-sm-center justify-content-center rounded-circle'} style={{
                    backgroundColor: '#87C1FF',
                    width: '40px',
                    height: '40px',
                }}>
                    <ArrowLeft size={'30'} color={'#3722AE'} />
                </Link>

                <span style={{
                    color: '#3722AE'
                }} className={'text-lg'}>Tambah Berita</span>
            </div>

            <div className={'px-5'}>
                <div className="mb-3" style={{ width: '49%' }}>
                    <label>File</label>
                    <br />
                    <input type="file" className={'border p-1 rounded-lg w-100 bg-white'} />
                </div>
                <div className={'w-100'}>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Judul Berita</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Deskripsi</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Kategori</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Prodi</label>
                            <select className="form-control">
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
                        </div>
                    </div>
                </div>

                <button
                className={'btn btn-success mb-3'}
                // onClick={() => {
                //     handleSaveBuku().then()
                // }}
                >
                Save
                </button>
            </div>
        </div>
    )
}