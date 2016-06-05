namespace BanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NhaCungCap")]
    public partial class NhaCungCap
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NhaCungCap()
        {
            NhapHang = new HashSet<NhapHang>();
        }

        public int id { get; set; }

        public string ten { get; set; }

        [StringLength(50)]
        public string dienthoai { get; set; }

        public string diachi { get; set; }

        [StringLength(250)]
        public string email { get; set; }

        public string congty { get; set; }

        public string masoThue { get; set; }

        public string ghichu { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NhapHang> NhapHang { get; set; }
    }
}
