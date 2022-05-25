import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
export default function ChangePasswordComponent(props) {
  let managerID=props.managerID;
  let ManagerID=managerID[0].ManagerID;
  const [managerInfo, setManagerInfo]=useState({OldPassword:'',NewPassword1:'',NewPassword2:''});

  const changeStateInfo=() => (reason)=>{
    if(reason.target.id=='OldPassword'){
      managerInfo.OldPassword=document.getElementById(reason.target.id).value;
    }
    if(reason.target.id=='NewPassword1'){
      managerInfo.NewPassword1=document.getElementById(reason.target.id).value;
    }
    if(reason.target.id=='NewPassword2'){
      managerInfo.NewPassword2=document.getElementById(reason.target.id).value;
    }
    console.log(managerInfo)
  }

  const submitChanges=()=>{
    if(!(managerInfo.NewPassword1==''||managerInfo.OldPassword==''||managerInfo.NewPassword2=='')){
      if(managerInfo.NewPassword1==managerInfo.NewPassword2){
        let submitData={ManagerID:'', OldPassword:'', NewPassword:''};
        submitData.ManagerID=ManagerID;
        submitData.OldPassword=managerInfo.OldPassword;
        submitData.NewPassword=managerInfo.NewPassword1;
        // console.log(submitData);
        const result = axios({
          url: `http://localhost:5000/updatepassword`,
          method: 'POST',
          data: submitData,
        })
        result.then((res)=>{
          console.log(res);
          if(res.data=='error'){
            Swal.fire("Đổi mật khẩu thất bại", "Sai mật khẩu", "error");
            return;
          }
          Swal.fire("Đổi mật khẩu thành công", res.data, "success").then(() => {
            window.location.reload()
          });
        })
        .catch((err)=>{
          Swal.fire("Đổi mật khẩu thất bại", err.data, "error");
        })
      }
      else Swal.fire("Đổi mật khẩu thất bại", 'Mật khẩu nhập lại không khớp', "error");
    }
    else Swal.fire("Đổi mật khẩu thất bại", 'Vui lòng điền đủ thông tin', "error");
  }

  return (
    <div>
      <h1>Đổi mật khẩu</h1>
    <hr/>
      <form>
        <div className="form-group"><div className='text-left pb-2'>Tài khoản</div><input type="text" id="ManagerID" className="form-control" disabled defaultValue={ManagerID?ManagerID:''} /></div>
        <div className="form-group"><div className='text-left pb-2'>Mật khẩu cũ</div><input type="text" id="OldPassword" className="form-control" onChange={changeStateInfo()}/></div>
        <div className="form-group"><div className='text-left pb-2'>Mật khẩu mới</div><input type="text" id="NewPassword1" className="form-control" onChange={changeStateInfo()}/></div>
        <div className="form-group"><div className='text-left pb-2'>Nhập lại mật khẩu mới</div><input type="text" id="NewPassword2" className="form-control" onChange={changeStateInfo()}/></div>
        <button className='btn btn-danger' type="button" onClick={submitChanges}>Đổi mật khẩu</button>
      </form>
    </div>
  )
}
