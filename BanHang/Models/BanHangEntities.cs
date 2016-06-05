namespace BanHang.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class BanHangEntities : DbContext
    {
        public BanHangEntities()
            : base("name=BanHangEntities")
        {
        }

        public virtual DbSet<ChiTietBanHang> ChiTietBanHang { get; set; }
        public virtual DbSet<ChiTietNhapHang> ChiTietNhapHang { get; set; }
        public virtual DbSet<DonViTinh> DonViTinh { get; set; }
        public virtual DbSet<HangHoa> HangHoa { get; set; }
        public virtual DbSet<HoaDonBanHang> HoaDonBanHang { get; set; }
        public virtual DbSet<KhachHang> KhachHang { get; set; }
        public virtual DbSet<LoaiHoaDonBanHang> LoaiHoaDonBanHang { get; set; }
        public virtual DbSet<NhaCungCap> NhaCungCap { get; set; }
        public virtual DbSet<NhapHang> NhapHang { get; set; }
        public virtual DbSet<NhaSanXuat> NhaSanXuat { get; set; }
        public virtual DbSet<NhomHang> NhomHang { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<webpages_Membership> webpages_Membership { get; set; }
        public virtual DbSet<webpages_OAuthMembership> webpages_OAuthMembership { get; set; }
        public virtual DbSet<webpages_Roles> webpages_Roles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DonViTinh>()
                .HasMany(e => e.HangHoa)
                .WithOptional(e => e.DonViTinh)
                .HasForeignKey(e => e.idDonViTinh);

            modelBuilder.Entity<HangHoa>()
                .Property(e => e.mavach)
                .IsUnicode(false);

            modelBuilder.Entity<HangHoa>()
                .HasMany(e => e.ChiTietBanHang)
                .WithOptional(e => e.HangHoa)
                .HasForeignKey(e => e.idHangHoa);

            modelBuilder.Entity<HangHoa>()
                .HasMany(e => e.ChiTietNhapHang)
                .WithOptional(e => e.HangHoa)
                .HasForeignKey(e => e.idHangHoa);

            modelBuilder.Entity<HoaDonBanHang>()
                .HasMany(e => e.ChiTietBanHang)
                .WithOptional(e => e.HoaDonBanHang)
                .HasForeignKey(e => e.idHoaDonBanHang);

            modelBuilder.Entity<KhachHang>()
                .Property(e => e.dienthoai)
                .IsUnicode(false);

            modelBuilder.Entity<KhachHang>()
                .Property(e => e.email)
                .IsUnicode(false);

            modelBuilder.Entity<KhachHang>()
                .HasMany(e => e.HoaDonBanHang)
                .WithOptional(e => e.KhachHang)
                .HasForeignKey(e => e.idKhachHang);

            modelBuilder.Entity<LoaiHoaDonBanHang>()
                .HasMany(e => e.HoaDonBanHang)
                .WithOptional(e => e.LoaiHoaDonBanHang)
                .HasForeignKey(e => e.idLoaiHoaDonBanHang);

            modelBuilder.Entity<NhaCungCap>()
                .Property(e => e.dienthoai)
                .IsUnicode(false);

            modelBuilder.Entity<NhaCungCap>()
                .Property(e => e.email)
                .IsUnicode(false);

            modelBuilder.Entity<NhaCungCap>()
                .Property(e => e.masoThue)
                .IsUnicode(false);

            modelBuilder.Entity<NhaCungCap>()
                .HasMany(e => e.NhapHang)
                .WithOptional(e => e.NhaCungCap)
                .HasForeignKey(e => e.idNhaCungCap);

            modelBuilder.Entity<NhapHang>()
                .HasMany(e => e.ChiTietNhapHang)
                .WithOptional(e => e.NhapHang)
                .HasForeignKey(e => e.idNhapHang);

            modelBuilder.Entity<NhaSanXuat>()
                .HasMany(e => e.HangHoa)
                .WithOptional(e => e.NhaSanXuat)
                .HasForeignKey(e => e.idNhaSanXuat);

            modelBuilder.Entity<NhomHang>()
                .HasMany(e => e.HangHoa)
                .WithOptional(e => e.NhomHang)
                .HasForeignKey(e => e.idNhomHang);

            modelBuilder.Entity<User>()
                .Property(e => e.dienthoai)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.HoaDonBanHang)
                .WithOptional(e => e.User)
                .HasForeignKey(e => e.idNhanVien);

            modelBuilder.Entity<webpages_Roles>()
                .HasMany(e => e.User)
                .WithMany(e => e.webpages_Roles)
                .Map(m => m.ToTable("webpages_UsersInRoles").MapLeftKey("RoleId").MapRightKey("UserId"));
        }
    }
}
