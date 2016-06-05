namespace BanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HangHoa")]
    public partial class HangHoa
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HangHoa()
        {
            ChiTietBanHang = new HashSet<ChiTietBanHang>();
            ChiTietNhapHang = new HashSet<ChiTietNhapHang>();
        }

        public int id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [StringLength(9)]
        public string mavach { get; set; }

        public int? idNhaSanXuat { get; set; }

        public int? idNhomHang { get; set; }

        public int? idDonViTinh { get; set; }

        public string ten { get; set; }

        public double? giaSi { get; set; }

        public double? giaLe { get; set; }

        public double? giaVon { get; set; }

        public string mota { get; set; }

        public double? tonItNhat { get; set; }

        public double? tonNhieuNhat { get; set; }

        public string hinhanh { get; set; }

        public bool? ngungKinhDoanh { get; set; }

        public string ghichu { get; set; }

        public double? soluong { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietBanHang> ChiTietBanHang { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChiTietNhapHang> ChiTietNhapHang { get; set; }

        public virtual DonViTinh DonViTinh { get; set; }

        public virtual NhaSanXuat NhaSanXuat { get; set; }

        public virtual NhomHang NhomHang { get; set; }
    }
}
