using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BanHang.Models.Reports
{
    public class CriterialHoaDonBanHang
    {
        public int id { get; set; }
        public DateTime? tuNgay { get; set; }
        public DateTime? denNgay { get; set; }
        public int? idNhanVien { get; set; }
        public int? idKhachHang { get; set; }
    }
}