import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"

const ChangeAdd = (val) => {
    if(val === "Thêm khách hàng" || val === "user"){

        document.getElementById("addCategoryModalLabel").innerHTML = "Thêm khách hàng"
        document.getElementById("editModalLabel").innerHTML = "Thêm khách hàng"

        document.getElementById("staffRole").disabled = true
        document.getElementById("staffSalary").disabled = true
        document.getElementById("editStaffRole").disabled = true
        document.getElementById("editStaffSalary").disabled = true
    }
    else if(val === "Thêm nhân viên" || val === "employee"){
        document.getElementById("addCategoryModalLabel").innerHTML = "Thêm nhân viên"
        document.getElementById("editModalLabel").innerHTML = "Thêm nhân viên"

        document.getElementById("staffRole").disabled = false
        document.getElementById("staffSalary").disabled = false
        document.getElementById("editStaffRole").disabled = false
        document.getElementById("editStaffSalary").disabled = false
    }
}

const getFields = (e, id, account, password, name, email, sex, dob, phone, role, salary) => {
    ChangeAdd(e.target.classList[0])

    document.getElementById("editUserid").value = id
    document.getElementById("editStaffAccount").value = account
    document.getElementById("editStaffPassword").value = password
    document.getElementById("editStaffFullname").value = name
    document.getElementById("editStaffEmail").value = email
    document.getElementById("editStaffSex").value = sex
    document.getElementById("editStaffDoB").value = dob
    document.getElementById("editStaffPhone").value = phone
    document.getElementById("editStaffRole").value = role
    document.getElementById("editStaffSalary").value = salary
}

function Admin_User(){
    const [userInfo, setUserInfo] = useState([])
    const [customer, setCustomerInfo] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/admin/user").then((res) => {
            setUserInfo(res.data[0])
            setCustomerInfo(res.data[1])
          })
          .catch(err => console.log(err))
    }, [])

    // console.log(customer)

    const DateFormat = (date) => {
        let res = ""
        if(userInfo){
            res = new Date(date).getDate() < 10 
            ? (new Date(date).getMonth() < 9
                ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate() 
                : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate())
            : (new Date(date).getMonth() < 9
            ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate()
            : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate())
        }
        return res
    }

    return(
        <>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-md-3">
                        <Sidebar/>
                    </div>
                    <div className="col-md-9">
                        <div className="fs-1 text-danger text-center my-3">KHU VỰC QUẢN LÝ RẠP CHIẾU PHIM</div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Nhân viên</h2>
                            <div className="">
                                <button onClick={(e) => ChangeAdd(e.target.innerHTML)} className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addModal">Thêm nhân viên</button>
                            </div>

                            <div class="modal fade fw-medium" id="addModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <form action="http://localhost:8000/admin/user" method="post">
                                            <input type="hidden" name="action" value="add"/>
                                            <div class="modal-header">
                                            <h5 class="modal-title fw-semibold" id="addCategoryModalLabel">Thêm nhân viên</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            
                                            <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="customerAccount" class="form-label">Tài khoản</label>
                                                <input type="text" class="form-control" id="customerAccount" name="account" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="customerPassword" class="form-label">Mật khẩu</label>
                                                <input type="text" class="form-control" id="customerPassword" name="password" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="customerFullName" class="form-label">Họ tên</label>
                                                <input type="text" class="form-control" id="customerFullName" name="fullname" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="customerEmail" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="customerEmail" name="email" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label className="ms-1" htmlFor="date">Giới tính</label>
                                                <select name="sex" id="sex" className="form-select" aria-label="Default select example">
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="customerAge" class="form-label">Ngày sinh</label>
                                                <input type="date" class="form-control" id="customerAge" name="dob" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="customerPhone" class="form-label">SĐT</label>
                                                <input type="tel" class="form-control" id="customerPhone" name="phone" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="staffRole" class="form-label">Vai trò</label>
                                                <input type="text" class="form-control" id="staffRole" name="role" required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="staffSalary" class="form-label">Lương</label>
                                                <input type="text" class="form-control" id="staffSalary" name="salary" required/>
                                            </div>

                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-danger">Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="table-danger">
                                        <th></th>
                                        <th>ID</th>
                                        <th>Tài khoản</th>
                                        <th>Mật khẩu</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Giới tính</th>
                                        <th>Ngày sinh</th>
                                        <th>SĐT</th>
                                        <th>Vai trò</th>
                                        <th>Lương</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {userInfo.length !=0 
                                    ? <>
                                        {userInfo.map((item) => {
                                            return(
                                                <>
                                                    <tr>
                                                        <td className="d-flex gap-2">
                                                            <button onClick={(e) => getFields(e, item.UserID, item.Login, item.Password, item.Fullname, item.Email, item.Sex, DateFormat(item.DOB), item.PhoneNumber, item.staffType, item.salary)} 
                                                            className="employee p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editModal"><i className="employee fa-solid fa-wrench"></i></button>

                                                            <form method="post" action="http://localhost:8000/admin/user">
                                                                <input type="hidden" name="userid" value={item.UserID} />
                                                                <input type="hidden" name="action" value="delete" />
                                                                <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                            </form>
                                                        </td>
                                                        <td>{item.UserID}</td>
                                                        <td>{item.Login}</td>
                                                        <td>{item.Password}</td>
                                                        <td>{item.Fullname}</td>
                                                        <td>{item.Email}</td>
                                                        <td>{item.Sex}</td>
                                                        <td>{DateFormat(item.DOB)}</td>
                                                        <td>{item.PhoneNumber}</td>
                                                        <td>{item.staffType}</td>
                                                        <td>{item.salary}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                    : <>Loading...</>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container-fluid d-flex align-items-center justify-content-between mt-5">
                            <h2 className="text-danger">Khách hàng</h2>
                            <div className="">
                                <button onClick={(e) => ChangeAdd(e.target.innerHTML)} className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addModal">Thêm khách hàng</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="table-danger">
                                        <th></th>
                                        <th>ID</th>
                                        <th>Tài khoản</th>
                                        <th>Mật khẩu</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Giới tính</th>
                                        <th>Ngày sinh</th>
                                        <th>SĐT</th>
                                        <th>Điểm thành viên</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {customer.length !=0 
                                    ? <>
                                        {customer.map((item) => {
                                            return(
                                                <>
                                                    <tr>
                                                        <td className="d-flex gap-2">
                                                            <button onClick={(e) => getFields(e, item.UserID, item.Login, item.Password, item.Fullname, item.Email, item.Sex, DateFormat(item.DOB), item.PhoneNumber, item.staffType, item.salary)} 
                                                            className="user p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editModal"><i className="user fa-solid fa-wrench"></i></button>
                                                            
                                                            <form action="http://localhost:8000/admin/user" method="post">
                                                                <input type="hidden" name="userid" value={item.UserID} />
                                                                <input type="hidden" name="action" value="delete" />
                                                                <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                            </form>
                                                        </td>
                                                        <td>{item.UserID}</td>
                                                        <td>{item.Login}</td>
                                                        <td>{item.Password}</td>
                                                        <td>{item.Fullname}</td>
                                                        <td>{item.Email}</td>
                                                        <td>{item.Sex}</td>
                                                        <td>{DateFormat(item.DOB)}</td>
                                                        <td>{item.PhoneNumber}</td>
                                                        <td>{item.MemberPoint ?? 0 }</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                    : <>Loading...</>
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="modal fade fw-medium" id="editModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form action="http://localhost:8000/admin/user" method="post">
                            <input type="hidden" name="action" value="edit"/>
                            <input type="hidden" id="editUserid" name="userid" value=""/>
                            <div class="modal-header">
                            <h5 class="modal-title fw-semibold" id="editModalLabel">Sửa nhân viên</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div class="modal-body">
                            <div class="mb-3">
                                <label for="editStaffAccount" class="form-label">Tài khoản</label>
                                <input type="text" class="form-control" id="editStaffAccount" name="account" required/>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffPassword" class="form-label">Mật khẩu</label>
                                <input type="text" class="form-control" id="editStaffPassword" name="password" required/>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffFullname" class="form-label">Họ tên</label>
                                <input type="text" class="form-control" id="editStaffFullname" name="fullname" required/>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="editStaffEmail" name="email" required/>
                            </div>
                            <div class="mb-3">
                                <label className="ms-1" htmlFor="editStaffSex">Giới tính</label>
                                <select name="sex" id="editStaffSex" className="form-select" aria-label="Default select example">
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffDoB" class="form-label">Ngày sinh</label>
                                <input type="date" class="form-control" id="editStaffDoB" name="dob" required/>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffPhone" class="form-label">SĐT</label>
                                <input type="tel" class="form-control" id="editStaffPhone" name="phone" required/>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffRole" class="form-label">Vai trò</label>
                                <input type="text" class="form-control" id="editStaffRole" name="role"/>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffSalary" class="form-label">Lương</label>
                                <input type="text" class="form-control" id="editStaffSalary" name="salary"/>
                            </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-danger">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_User