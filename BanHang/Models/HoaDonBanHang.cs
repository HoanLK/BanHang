namespace BanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HoaDonBanHang")]
    public partial class HoaDonBanHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HoaDonBanHang()
        {
            ChiTietBanHang = new HashSet<ChiTietBanHang>();
        }

        public int id { get; set; }

        public int? idLoaiHoaDonBanHang { get; set; }

        public int? idKhachHang { get; set; }

        public int? idNhanVien { get; set; }

        public DateTime? thoigian { get; set; }

        public string hinhanh { get; set; }

        public double? tongTien { get; set; }

        public double? giamgia { get; set; }

        public double? thanhtoan { get; set; }

        public int? daThanhToan { get; set; }

        public string ghichu { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietBanHang> ChiTietBanHang { get; set; }

        public virtual KhachHang KhachHang { get; set; }

        public virtual LoaiHoaDonBanHang LoaiHoaDonBanHang { get; set; }

        public virtual User User { get; set; }
    }
}
