namespace BanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ChiTietNhapHang")]
    public partial class ChiTietNhapHang
    {
        public int id { get; set; }

        public int? idNhapHang { get; set; }

        public int? idHangHoa { get; set; }

        public double? dongia { get; set; }

        public double? giamgia { get; set; }

        public double? soluong { get; set; }

        public double? thanhtien { get; set; }

        public string ghichu { get; set; }

        public virtual HangHoa HangHoa { get; set; }

        public virtual NhapHang NhapHang { get; set; }
    }
}
