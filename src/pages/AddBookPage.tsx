import {ArrowLeft} from "react-bootstrap-icons";

export function AddBookPage () {
    return (
        <div>
            <h2 className={'font-weight-bold ml-3 pt-3'}>Buku</h2>

            <div className={'d-flex align-items-center bg-white px-3 py-1 mb-3'} style={{gap: 10}}>
                <div className={'d-flex flex-column align-items-sm-center justify-content-center rounded-circle'} style={{
                    backgroundColor: '#87C1FF',
                    width: '40px',
                    height: '40px',
                }}>
                    <ArrowLeft size={'30'} color={'#3722AE'} />
                </div>

                <span style={{
                    color: '#3722AE'
                }} className={'text-lg'}>Tambah Buku</span>
            </div>

            <div className={'px-5'}>
                <div className="mb-3" style={{width: '49%'}}>
                    <label>File</label>
                    <br/>
                    <input type="file" className={'border p-1 rounded-lg w-100 bg-white'}/>
                </div>


                <div className={'w-100'}>
                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Judul Buku</label>
                            <input type="text" className="form-control"/>
                        </div>

                        <div className="form-group col-sm">
                            <label>Jumlah Halaman</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Penulis</label>
                            <input type="text" className="form-control"/>
                        </div>

                        <div className="form-group col-sm">
                            <label>Bahasa</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Penerbit</label>
                            <input type="text" className="form-control"/>
                        </div>

                        <div className="form-group col-sm">
                            <label>Edisi</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Tahun Terbit</label>
                            <input type="text" className="form-control"/>
                        </div>

                        <div className="form-group col-sm">
                            <label>Status</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>ISBN</label>
                            <input type="text" className="form-control"/>
                        </div>

                        <div className="form-group col-sm">
                            <label>Abstrak</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}