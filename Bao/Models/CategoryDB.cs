using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Bao.Models;

namespace Bao.Models
{
    public class CategoryDB
    {

        string strcon = "data source= DESKTOP-JFQCD59\\SQLEXPRESS; initial catalog=newspaper;initial catalog=newspaper;integrated security=True;MultipleActiveResultSets=True;";


        public List<Category> ListAll()
        {
            List<Category> lst = new List<Category>();
            using (SqlConnection con = new SqlConnection(strcon))
            {
                con.Open();
                SqlCommand com = new SqlCommand("Select_Category", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Category
                    {
                        Id = Convert.ToInt64(rdr["Id"]),
                       Name = rdr["Name"].ToString(),
                       Slug = rdr["Slug"].ToString(),
                       ParentId = Convert.ToInt64(rdr["ParentId"]),
                       Active = Convert.ToBoolean(rdr["Active"]),

                       Createdate = Convert.ToDateTime(rdr["Createdate"])
                    });
                }
                return lst;
            }
        }

        //thêm data
        public int Add(Category cate)
        {
            int i;
            using(SqlConnection con = new SqlConnection(strcon))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertCategory", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", cate.Id);
                com.Parameters.AddWithValue("@Name", cate.Name);
                com.Parameters.AddWithValue("@Slug", cate.Slug);
                com.Parameters.AddWithValue("@ParentId", cate.ParentId);
                com.Parameters.AddWithValue("@Active", cate.Active);
                com.Parameters.Add("@Createdate", cate.Createdate).Value = DateTime.Now.ToString();
                com.Parameters.AddWithValue("@Action", "Insert");
                
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //sửa data|| cập nhật data
        public int Update(Category cate)
        {
            int i;
            using (SqlConnection con = new SqlConnection(strcon))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertCategory", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", cate.Id);
                com.Parameters.AddWithValue("@Name", cate.Name);
                com.Parameters.AddWithValue("@Slug", cate.Slug);
                com.Parameters.AddWithValue("@ParentId", cate.ParentId);
                com.Parameters.AddWithValue("@Active", cate.Active);
                com.Parameters.AddWithValue("@Action", "Update");
               
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        public int Delete(int Id)
        {
            int i;
            using(SqlConnection con = new SqlConnection(strcon))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteCategory", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", Id);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        internal static List<Category> GetCategories()
        {
            throw new NotImplementedException();
        }
    }
}