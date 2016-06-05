namespace BanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NhapHang")]
    public partial class NhapHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NhapHang()
        {
            ChiTietNhapHang = new HashSet<ChiTietNhapHang>();
        }

        public int id { get; set; }

        public int? idNhaCungCap { get; set; }

        public DateTime? thoigian { get; set; }

        public double? tongTien { get; set; }

        public double? giamGia { get; set; }

        public double? thanhtoan { get; set; }

        public string ghichu { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietNhapHang> ChiTietNhapHang { get; set; }

        public virtual NhaCungCap NhaCungCap { get; set; }
    }
}
