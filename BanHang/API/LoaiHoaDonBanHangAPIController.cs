using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BanHang.Models;

namespace BanHang.API
{
    public class LoaiHoaDonBanHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/LoaiHoaDonBanHangAPI
        public IQueryable<LoaiHoaDonBanHang> GetLoaiHoaDonBanHang()
        {
            return db.LoaiHoaDonBanHang;
        }

        // GET: api/LoaiHoaDonBanHangAPI/5
        [ResponseType(typeof(LoaiHoaDonBanHang))]
        public async Task<IHttpActionResult> GetLoaiHoaDonBanHang(int id)
        {
            LoaiHoaDonBanHang loaiHoaDonBanHang = await db.LoaiHoaDonBanHang.FindAsync(id);
            if (loaiHoaDonBanHang == null)
            {
                return NotFound();
            }

            return Ok(loaiHoaDonBanHang);
        }

        // PUT: api/LoaiHoaDonBanHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLoaiHoaDonBanHang(int id, LoaiHoaDonBanHang loaiHoaDonBanHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != loaiHoaDonBanHang.id)
            {
                return BadRequest();
            }

            db.Entry(loaiHoaDonBanHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoaiHoaDonBanHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/LoaiHoaDonBanHangAPI
        [ResponseType(typeof(LoaiHoaDonBanHang))]
        public async Task<IHttpActionResult> PostLoaiHoaDonBanHang(LoaiHoaDonBanHang loaiHoaDonBanHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LoaiHoaDonBanHang.Add(loaiHoaDonBanHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = loaiHoaDonBanHang.id }, loaiHoaDonBanHang);
        }

        // DELETE: api/LoaiHoaDonBanHangAPI/5
        [ResponseType(typeof(LoaiHoaDonBanHang))]
        public async Task<IHttpActionResult> DeleteLoaiHoaDonBanHang(int id)
        {
            LoaiHoaDonBanHang loaiHoaDonBanHang = await db.LoaiHoaDonBanHang.FindAsync(id);
            if (loaiHoaDonBanHang == null)
            {
                return NotFound();
            }

            db.LoaiHoaDonBanHang.Remove(loaiHoaDonBanHang);
            await db.SaveChangesAsync();

            return Ok(loaiHoaDonBanHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LoaiHoaDonBanHangExists(int id)
        {
            return db.LoaiHoaDonBanHang.Count(e => e.id == id) > 0;
        }
    }
}