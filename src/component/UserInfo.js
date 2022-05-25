import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
export default function UserInfo(props) {
  let managerID=props.managerID;
  const [managerInfo, setManagerInfo]=useState();
  useEffect(() => {
    const loadInfo = async ()=>{
        const result = await axios({
            url: `http://localhost:5000/manager/${managerID[0].ManagerID}`,
            method: 'GET',
        })
        setManagerInfo(result.data);
      }
      loadInfo();
  }, []);

  const changeStateInfo=() => (reason)=>{
    if(reason.target.id=='Name'){
      managerInfo[0].Name=document.getElementById(reason.target.id).value;
    }
    if(reason.target.id=='Email'){
      managerInfo[0].Email=document.getElementById(reason.target.id).value;
    }
    if(reason.target.id=='PhoneNumber'){
      managerInfo[0].PhoneNumber=document.getElementById(reason.target.id).value;
    }
    console.log(managerInfo[0])
  }

  const submitChanges=()=>{
      const result = axios({
          url: `http://localhost:5000/updatemanager`,
          method: 'POST',
          data: managerInfo[0],
      })
      result.then(()=>{
        Swal.fire("Cập nhật thành công", result.response?.data, "success");
      })
      .catch((err)=>{
        Swal.fire("Cập nhật thất bại", result.response?.data, "error");
      })
  }

  return (
    <div>
      <h1>Quản lý thông tin cá nhân</h1>
    <hr/>
      <form>
        <div className="form-group"><div className='text-left pb-2'>Tài khoản</div><input type="text" id="ManagerID" className="form-control" disabled defaultValue={managerInfo?managerInfo[0].ManagerID:''} /></div>
        <div className="form-group"><div className='text-left pb-2'>Tên khách hàng</div><input type="text" id="Name" className="form-control" defaultValue={managerInfo?managerInfo[0].Name:''} onChange={changeStateInfo()}/></div>
        <div className="form-group"><div className='text-left pb-2'>Số điện thoại</div><input type="number" id="PhoneNumber" className="form-control" defaultValue={managerInfo?managerInfo[0].PhoneNumber:''} onChange={changeStateInfo()}/></div>
        <div className="form-group"><div className='text-left pb-2'>Email</div><input type="email" id="Email" className="form-control" defaultValue={managerInfo?managerInfo[0].Email:''} onChange={changeStateInfo()}/></div>
        <button className='btn btn-danger' type="button" onClick={submitChanges}>Cập nhật</button>
      </form>
    </div>
  )
}
