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
    public class DonViTinhAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/DonViTinhAPI
        public IQueryable<DonViTinh> GetDonViTinh()
        {
            return db.DonViTinh;
        }

        // GET: api/DonViTinhAPI/5
        [ResponseType(typeof(DonViTinh))]
        public async Task<IHttpActionResult> GetDonViTinh(int id)
        {
            DonViTinh donViTinh = await db.DonViTinh.FindAsync(id);
            if (donViTinh == null)
            {
                return NotFound();
            }

            return Ok(donViTinh);
        }

        // PUT: api/DonViTinhAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDonViTinh(int id, DonViTinh donViTinh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != donViTinh.id)
            {
                return BadRequest();
            }

            db.Entry(donViTinh).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonViTinhExists(id))
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

        // POST: api/DonViTinhAPI
        [ResponseType(typeof(DonViTinh))]
        public async Task<IHttpActionResult> PostDonViTinh(DonViTinh donViTinh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DonViTinh.Add(donViTinh);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = donViTinh.id }, donViTinh);
        }

        // DELETE: api/DonViTinhAPI/5
        [ResponseType(typeof(DonViTinh))]
        public async Task<IHttpActionResult> DeleteDonViTinh(int id)
        {
            DonViTinh donViTinh = await db.DonViTinh.FindAsync(id);
            if (donViTinh == null)
            {
                return NotFound();
            }

            db.DonViTinh.Remove(donViTinh);
            await db.SaveChangesAsync();

            return Ok(donViTinh);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DonViTinhExists(int id)
        {
            return db.DonViTinh.Count(e => e.id == id) > 0;
        }
    }
}