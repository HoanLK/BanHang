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
    public class NhomHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/NhomHangAPI
        public IQueryable<NhomHang> GetNhomHang()
        {
            return db.NhomHang;
        }

        // GET: api/NhomHangAPI/5
        [ResponseType(typeof(NhomHang))]
        public async Task<IHttpActionResult> GetNhomHang(int id)
        {
            NhomHang nhomHang = await db.NhomHang.FindAsync(id);
            if (nhomHang == null)
            {
                return NotFound();
            }

            return Ok(nhomHang);
        }

        // PUT: api/NhomHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNhomHang(int id, NhomHang nhomHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhomHang.id)
            {
                return BadRequest();
            }

            db.Entry(nhomHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhomHangExists(id))
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

        // POST: api/NhomHangAPI
        [ResponseType(typeof(NhomHang))]
        public async Task<IHttpActionResult> PostNhomHang(NhomHang nhomHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NhomHang.Add(nhomHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = nhomHang.id }, nhomHang);
        }

        // DELETE: api/NhomHangAPI/5
        [ResponseType(typeof(NhomHang))]
        public async Task<IHttpActionResult> DeleteNhomHang(int id)
        {
            NhomHang nhomHang = await db.NhomHang.FindAsync(id);
            if (nhomHang == null)
            {
                return NotFound();
            }

            db.NhomHang.Remove(nhomHang);
            await db.SaveChangesAsync();

            return Ok(nhomHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhomHangExists(int id)
        {
            return db.NhomHang.Count(e => e.id == id) > 0;
        }
    }
}