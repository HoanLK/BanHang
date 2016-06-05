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
    public class NhaSanXuatAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/NhaSanXuatAPI
        public IQueryable<NhaSanXuat> GetNhaSanXuat()
        {
            return db.NhaSanXuat;
        }

        // GET: api/NhaSanXuatAPI/5
        [ResponseType(typeof(NhaSanXuat))]
        public async Task<IHttpActionResult> GetNhaSanXuat(int id)
        {
            NhaSanXuat nhaSanXuat = await db.NhaSanXuat.FindAsync(id);
            if (nhaSanXuat == null)
            {
                return NotFound();
            }

            return Ok(nhaSanXuat);
        }

        // PUT: api/NhaSanXuatAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNhaSanXuat(int id, NhaSanXuat nhaSanXuat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhaSanXuat.id)
            {
                return BadRequest();
            }

            db.Entry(nhaSanXuat).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhaSanXuatExists(id))
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

        // POST: api/NhaSanXuatAPI
        [ResponseType(typeof(NhaSanXuat))]
        public async Task<IHttpActionResult> PostNhaSanXuat(NhaSanXuat nhaSanXuat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NhaSanXuat.Add(nhaSanXuat);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = nhaSanXuat.id }, nhaSanXuat);
        }

        // DELETE: api/NhaSanXuatAPI/5
        [ResponseType(typeof(NhaSanXuat))]
        public async Task<IHttpActionResult> DeleteNhaSanXuat(int id)
        {
            NhaSanXuat nhaSanXuat = await db.NhaSanXuat.FindAsync(id);
            if (nhaSanXuat == null)
            {
                return NotFound();
            }

            db.NhaSanXuat.Remove(nhaSanXuat);
            await db.SaveChangesAsync();

            return Ok(nhaSanXuat);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhaSanXuatExists(int id)
        {
            return db.NhaSanXuat.Count(e => e.id == id) > 0;
        }
    }
}