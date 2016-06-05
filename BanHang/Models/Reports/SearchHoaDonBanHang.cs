using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BanHang.Models.Reports
{
    public class SearchHoaDonBanHang
    {
        public IEnumerable<HoaDonBanHang> hoadonBanHangs { get; set; }
        public CriterialHoaDonBanHang critHoaDonBanHang { get; set; }
        public SumHoaDonBanHang sumHoaDonBanHang { get; set; }
    }
}