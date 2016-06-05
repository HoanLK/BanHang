using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BanHang.Models.Account
{
    public class Login
    {
        [Required(ErrorMessage = "Vui lòng nhập Username")]
        public string Username { get; set; }


        [Required(ErrorMessage = "Vui lòng nhập Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}