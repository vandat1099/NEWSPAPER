using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Web;

namespace Bao.Models
{
    [Table("News")]
    public partial class News
    {
        internal readonly int CategoryId;

        public long Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [DisplayName("UploadFile")]
        public string Avartar { get; set; }
        public HttpPostedFileBase ImgeFile { get; set; }
        [StringLength(50)]
        public string Sapo { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        public long Category_Id { get; set; }
        public DateTime Createdate { get; set; }
        public DateTime ModifyDate { get; set; }
        [StringLength(10)]
        public bool Active { get; set; }

        internal static object Update(News news)
        {
            throw new NotImplementedException();
        }
    }
}