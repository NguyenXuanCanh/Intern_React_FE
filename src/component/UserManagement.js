import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserManagement(props) {
  let managerID=props.managerID;
  const [managerInfo, setManagerInfo]=useState();
  const [stateModal,setStateModal] = useState(false);
  const [stateManager,setStateManager] = useState();
  const [stateOpenModal,setStateOpenModal]=useState(false);
  const [stateAdd,setStateAdd]=useState({ManagerID:'', Password: '', Name:'', Email:'', PhoneNumber:''});
  const [deleteIndex,setDeleteIndex]=useState();
  let [key, setKey]=useState('');
  useEffect(() => {
    const loadInfo = async ()=>{
        const result = await axios({
            url: `http://localhost:5000/manager`,
            method: 'GET',
        })
        setManagerInfo(result.data);
      }
      loadInfo();
  }, []);
  // console.log(managerInfo);

  let renderUser=()=>{
    if(managerInfo){
      return managerInfo.map((item, key) => {
        return <tr key={key}>
        <td className="pl-4">{key+1}</td>
        <td>
          <h5 className="font-medium mb-0">{item.Name}</h5>
          <span className="text-muted">{item.ManagerID}</span>
        </td>
        <td>
          <h5 className="font-medium mb-0">{item.Email}</h5>
        </td>
        <td>
          <h5 className="font-medium mb-0">{item.PhoneNumber}</h5>
        </td>
        <td>
          <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" id={key} onClick={openModal}><i className="fa fa-edit" /> </button>
          <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2" id={key} onClick={deleteUser}><i className="fa fa-trash" /> </button>
        </td>
      </tr>
      })
    }
  }
  let deleteUser=(e)=>{
    if(e.target.id){
      setDeleteIndex(e.target.id);
    }
    document.getElementById('del').click();
  }
  let openModal=(e)=>{
    setStateOpenModal(false);
    if(key=='') setKey(e.target.id);
    if(key!=e.target.id){
      setStateModal(false);
      key=e.target.id;
    }
    if(e.target.id){
      setStateModal(true);
      setStateManager(managerInfo[e.target.id]);
    }
  }

  let openAddModal=()=>{
    setStateModal(false);
    setStateOpenModal(true);
  }

  const submitChanges=()=>{
    const result = axios({
        url: `http://localhost:5000/updatemanager`,
        method: 'POST',
        data: stateManager,
    })
    result.then(()=>{
      Swal.fire("C???p nh???t th??nh c??ng", result.response?.data, "success").then(() => {
        window.location.reload()
    });
    })
    .catch((err)=>{
      Swal.fire("C???p nh???t th???t b???i", result.response?.data, "error");
    })
  }
  let changeStateInfo=(reason)=>{
    if(reason.target.id=='Name'){
      stateManager.Name=document.getElementById(reason.target.id).value;
    }
    if(reason.target.id=='Email'){
      stateManager.Email=document.getElementById(reason.target.id).value;
    }
    if(reason.target.id=='PhoneNumber'){
      stateManager.PhoneNumber=document.getElementById(reason.target.id).value;
    }
  }
  let renderModal=()=>{
    return <form>
    <div className="form-group"><div className='text-left pb-2'>T??i kho???n</div><input type="text" id="ManagerID" className="form-control" disabled defaultValue={stateManager.ManagerID} /></div>
    <div className="form-group"><div className='text-left pb-2'>T??n kh??ch h??ng</div><input type="text" id="Name" className="form-control" defaultValue={stateManager.Name} onChange={changeStateInfo}/></div>
    <div className="form-group"><div className='text-left pb-2'>S??? ??i???n tho???i</div><input type="number" id="PhoneNumber" className="form-control" defaultValue={stateManager.PhoneNumber} onChange={changeStateInfo}/></div>
    <div className="form-group"><div className='text-left pb-2'>Email</div><input type="email" id="Email" className="form-control" defaultValue={stateManager.Email} onChange={changeStateInfo}/></div>
    <button className='btn btn-success' type="button" onClick={submitChanges}>C???p nh???t</button>
  </form>
  }

  let changeStateAdd=()=>{
    stateAdd.ManagerID=document.getElementById('ManagerIDAdd').value;
    stateAdd.Password=document.getElementById('PasswordAdd').value;
    stateAdd.Name=document.getElementById('NameAdd').value;
    stateAdd.Email=document.getElementById('EmailAdd').value;
    stateAdd.PhoneNumber=document.getElementById('PhoneNumberAdd').value;
  }
  let submitAdd=()=>{
    const result = axios({
      url: `http://localhost:5000/addmanager`,
      method: 'POST',
      data: stateAdd,
    })
    result.then(()=>{
      Swal.fire("Th??m th??nh c??ng", result.response?.data, "success").then(() => {
        window.location.reload()
    });
    })
    .catch((err)=>{
      Swal.fire("Th??m th???t b???i", result.response?.data, "error");
    })
  }

  let renderOpenModal=()=>{
    return <form>
    <div className="form-group"><div className='text-left pb-2'>T??i kho???n</div><input type="text" id="ManagerIDAdd" className="form-control" onChange={changeStateAdd}/></div>
    <div className="form-group"><div className='text-left pb-2'>M???t kh???u</div><input type="password" id="PasswordAdd" className="form-control" onChange={changeStateAdd}/></div>
    <div className="form-group"><div className='text-left pb-2'>T??n ng?????i d??ng</div><input type="text" id="NameAdd" className="form-control" onChange={changeStateAdd}/></div>
    <div className="form-group"><div className='text-left pb-2'>S??? ??i???n tho???i</div><input type="number" id="PhoneNumberAdd" className="form-control" onChange={changeStateAdd}/></div>
    <div className="form-group"><div className='text-left pb-2'>Email</div><input type="email" id="EmailAdd" className="form-control" onChange={changeStateAdd}/></div>
    <button className='btn btn-success' type="button" onClick={submitAdd}>Th??m ng?????i d??ng</button>
  </form>
  }
  let submitDel=()=>{
    const result = axios({
      url: `http://localhost:5000/deletemanager`,
      method: 'DELETE',
      data: managerInfo[deleteIndex],
    })
    result.then(()=>{
      Swal.fire("X??a th??nh c??ng", result.response?.data, "success").then(() => {
        window.location.reload()
    });
    })
    .catch((err)=>{
      Swal.fire("X??a th???t b???i", result.response?.data, "error");
    })
  }
  return (
    <div>
      <h1>Danh s??ch ng?????i d??ng</h1>
      <hr/>
      <div>
        <button type="button" className="btn btn-primary d-none" id="del" data-toggle="modal" data-target="#myModal"></button>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">B???n c?? ch???c mu???n x??a ng?????i d??ng kh??ng?</h4>
                <button type="button" className="close" data-dismiss="modal">??</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={submitDel}>X??a</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body text-right">
              Th??m ng?????i d??ng <button type="button" className="btn btn-outline-info btn-lg ml-2 btn-circle" onClick={openAddModal}><i className="fa fa-plus" /></button> 
              </div>
              {stateModal ?renderModal():''}
              {stateOpenModal ?renderOpenModal():''}
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">T??n</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">S??? ??i???n tho???i</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Ch???c n??ng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderUser()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
