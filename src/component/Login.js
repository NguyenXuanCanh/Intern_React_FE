import React from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Login() {
  const formik = useFormik({
      initialValues: {
          taiKhoan: '',
          matKhau: '',
      },
      validationSchema: Yup.object().shape({
          taiKhoan: Yup.string().required('Tài khoản không được bỏ trống'),
          matKhau: Yup.string().required('Mật khẩu không được bỏ trống').max(32, 'Mật khẩu từ 6-32 ký tự')//.test(/biểu thức chính quy - regular expression/,'mật khẩu phải đúng định dạng'),
      }),
      onSubmit: values => {
          // console.log(values)
          checkLogin(values)
      }
  });

  
  
  const checkLogin= async (userLogin)=>{
    try {
      const result = await axios({
          url: `http://localhost:5000/login`,
          method: 'POST',
          data: userLogin,
      })
      if(result.data!=''){
        sessionStorage.setItem('USER_LOGIN', JSON.stringify(result.data));
        // localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
        // history.push('/home');
        window.location.reload()
        console.log(result.data);
      }else{
        Swal.fire("Đăng nhập thất bại", 'Sai mật khẩu', "error");
      }
    } catch (error) {
      Swal.fire("Đăng nhập thất bại", error.response?.data, "error");

    }
  }
  return (
    <section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-12" >
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src="https://hanbiro.vn/wp-content/uploads/2021/04/hanbiro-logo-black.png" style={{width: 185}} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">Đăng nhập quản lý user</h4>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-outline mb-4">
                        <input type="text" id="form2Example11" name='taiKhoan' className="form-control" placeholder="Tài khoản" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.touched && formik.errors.taiKhoan ? <p className="text-danger">{formik.errors.taiKhoan}</p> : ''}
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example22" name='matKhau' className="form-control" placeholder='Mật khẩu' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.touched && formik.errors.matKhau ? <p className="text-danger">{formik.errors.matKhau}</p> : ''}

                      </div>
                      <div className="text-center pt-1 mb-5 pb-1 row">
                        <div className='col-4'></div>
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 p-3 col-4 border-0" type="submit" >Đăng nhập</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
