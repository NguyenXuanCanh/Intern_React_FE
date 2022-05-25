import React, {useState, useEffect} from 'react';
import Login from './Login.js';
import axios from 'axios';
import UserInfo from './UserInfo.js';
import UserManagement from './UserManagement.js';
import ChangePasswordComponent from './ChangePasswordComponent.js';
import Swal from 'sweetalert2'

export default function Home() {
  const [login, setLogin] = useState(JSON.parse(sessionStorage.getItem('USER_LOGIN')));
  const [managerChoice, setManagerChoice]=useState('qlttcn');
  const setManagerState = () => (reason) => {
    setManagerChoice(reason.target.id)
  };

  let logOut=()=>{
    sessionStorage.removeItem('USER_LOGIN');
      Swal.fire("Đăng xuất thành công", "Nhấn ok để thoát", "success").then(() => {
          window.location.reload()
      })
  }

  if(login){
    return (
    <div className="row user" style={{width: '100%'}}>
        <div className="col-2 user-left border-right border-bottom" style={{minHeight: '100%'}}>
            <div className="userInfo">
            {/* <img src="https://i.pravatar.cc/150?u=123@admin" /> */}
            <div className="username"></div>
            </div>
            <div className="openList">
            <ul>
                <li className="title p-2 pl-4 border-bottom"><i className="fas fa-house-user" /><span>Thông tin chung</span></li>
                {managerChoice== 'qlttcn' ? 
                <li className="option p-2 pl-4 bg__active ani-button" id="qlttcn" onClick={setManagerState()}><i className="fas fa-id-card-alt"/><span>Thông tin cá nhân</span></li>
                : <li className="option p-2 pl-4 ani-button" id="qlttcn" onClick={setManagerState()}><i className="fas fa-id-card-alt"/><span>Thông tin cá nhân</span></li>
                }
                {managerChoice== 'qldsnd' ? 
                <li className="option p-2 bg__active pl-4 ani-button" id="qldsnd" onClick={setManagerState()}><i className="fas fa-id-card-alt" /><span>Quản lý danh sách user</span></li>
                : <li className="option p-2 pl-4 ani-button" id="qldsnd" onClick={setManagerState()}><i className="fas fa-id-card-alt" /><span>Quản lý danh sách user</span></li>
                }
                {managerChoice== 'qlpw' ? 
                <li className="option p-2 pl-4 bg__active ani-button" id="qlpw" onClick={setManagerState()}><i className="fas fa-id-card-alt" /><span>Đổi mật khẩu</span></li>
                : <li className="option p-2 pl-4 ani-button" id="qlpw" onClick={setManagerState()}><i className="fas fa-id-card-alt" /><span>Đổi mật khẩu</span></li>
                }
                <li className="option p-2 pl-4 ani-button" id="qlpw" onClick={logOut}><i className="fas fa-id-card-alt" /><span>Đăng xuất</span></li>
                
            </ul>
            </div>
        </div>
        <div className="col-10 user-right">
            <div className="pt-5 container">
            <div className="row">
                <div className="col-12">
                <div className="user-right-right">
                    {managerChoice== 'qlttcn' ? <UserInfo managerID={login}></UserInfo> : managerChoice== 'qldsnd' ? <UserManagement></UserManagement> : <ChangePasswordComponent managerID={login}></ChangePasswordComponent>}
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
  }else{
    return (
        <Login></Login>
    )
  }
}
