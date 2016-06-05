using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BanHang.Models.Account
{
    public class Register
    {
        [Required(ErrorMessage = "Vui lòng nhập UserName")]
        public string Username { get; set; }


        [Required(ErrorMessage = "Vui lòng nhập Mật khẩu")]
        [DataType(DataType.Password)]
        public string Password { get; set; }


        [Required(ErrorMessage = "Vui lòng nhập Xác nhận mật khẩu")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Mật khẩu không khớp")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập Tên")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Vui lòng chọn Quyền")]
        public int Role { get; set; }
    }
}