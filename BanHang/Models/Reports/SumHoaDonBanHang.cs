using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BanHang.Models.Reports
{
    public class SumHoaDonBanHang
    {
        [DisplayFormat(DataFormatString = "{0:N0}")]
        public double? tongTongTien { get; set; }

        [DisplayFormat(DataFormatString = "{0:N0}")]
        public double? tongGiamGia { get; set; }

        [DisplayFormat(DataFormatString = "{0:N0}")]
        public double? tongThanhToan { get; set; }
    }
}