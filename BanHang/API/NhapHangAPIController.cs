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
    public class NhapHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/NhapHangAPI
        public IQueryable<NhapHang> GetNhapHang()
        {
            return db.NhapHang;
        }

        // GET: api/NhapHangAPI/5
        [ResponseType(typeof(NhapHang))]
        public async Task<IHttpActionResult> GetNhapHang(int id)
        {
            NhapHang nhapHang = await db.NhapHang.FindAsync(id);
            if (nhapHang == null)
            {
                return NotFound();
            }

            return Ok(nhapHang);
        }

        // PUT: api/NhapHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNhapHang(int id, NhapHang nhapHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhapHang.id)
            {
                return BadRequest();
            }

            db.Entry(nhapHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhapHangExists(id))
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

        // POST: api/NhapHangAPI
        [ResponseType(typeof(NhapHang))]
        public async Task<IHttpActionResult> PostNhapHang(NhapHang nhapHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NhapHang.Add(nhapHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = nhapHang.id }, nhapHang);
        }

        // DELETE: api/NhapHangAPI/5
        [ResponseType(typeof(NhapHang))]
        public async Task<IHttpActionResult> DeleteNhapHang(int id)
        {
            NhapHang nhapHang = await db.NhapHang.FindAsync(id);
            if (nhapHang == null)
            {
                return NotFound();
            }

            db.NhapHang.Remove(nhapHang);
            await db.SaveChangesAsync();

            return Ok(nhapHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhapHangExists(int id)
        {
            return db.NhapHang.Count(e => e.id == id) > 0;
        }
    }
}