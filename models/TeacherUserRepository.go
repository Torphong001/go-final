// models/TeacherRepository.go
package models

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// สร้าง struct ชื่อ TeacherRepository ที่มีฟิลด์ชื่อ Db เป็น pointer ของ gorm.DB
type TeacherRepository struct {
	Db *gorm.DB
}

// ทำหน้าที่สร้าง Instance ของ TeacherRepository และส่งคืนกลับไป ให้เรียกใช้งานได้
func NewTeacherRepository(db *gorm.DB) *TeacherRepository {
	return &TeacherRepository{Db: db}
}

// ทำหน้าที่ดึงข้อมูล Teacher ทั้งหมดจากฐานข้อมูล และส่งกลับไปให้ผู้ใช้งาน
// (r *TeacherRepository) คือการระบุว่าเป็น method ของ TeacherRepository
// r คือตัวแปรที่เป็น pointer ของ TeacherRepository
// ฟังก์ชัน GetTeachers รับพารามิเตอร์เป็น c *gin.Context และมีการส่งกลับค่าเป็น JSON กลับไปให้ผู้ใช้งานผ่าน c.JSON(200, teachers) ซึ่ง c คือตัวแปรที่เป็น pointer ของ gin.Context
// ในกรณีนี้เราไม่ต้องใช้ return เพราะเราใช้ c.JSON แทน
// ฟังก์ชันนี้ parameter ที่รับมาจะเป็น pointer ของ gin.Context เพราะเราจะใช้ c.JSON ส่งค่ากลับไปให้ผู้ใช้งาน
func (r *TeacherRepository) GetTeachers(c *gin.Context) {
	var teachers []Teacher
	// ดึงข้อมูล Teacher ทั้งหมดจากฐานข้อมูล และเก็บลงในตัวแปร teachers
	r.Db.Find(&teachers)  // SELECT * FROM teachers
	c.JSON(200, teachers) // ส่งข้อมูลกลับไปให้ผู้ใช้งาน
}

// ทำหน้าที่เพิ่มข้อมูล Teacher ลงในฐานข้อมูล และส่งกลับไปให้ผู้ใช้งานผ่าน c.JSON(200, newTeacher)
func (r *TeacherRepository) PostTeacher(c *gin.Context) {
	var newTeacher Teacher
	c.BindJSON(&newTeacher)  // รับค่า JSON จากผู้ใช้งาน และแปลงเป็น struct ของ Teacher
	r.Db.Create(&newTeacher) // INSERT INTO teachers (name, price) VALUES (newTeacher.Name, newTeacher.Price)
	c.JSON(200, newTeacher)  // ส่งข้อมูลกลับไปให้ผู้ใช้งาน
}

// ฟังก์ชันค้นหา Teacher จากฐานข้อมูล โดยใช้ id ที่รับเข้ามาเป็นเงื่อนไขในการค้นหา
// ฟังก์ชันนี้ parameter ที่รับมาจะเป็น pointer ของ gin.Context เพราะเราจะใช้ c.JSON ส่งค่ากลับไปให้ผู้ใช้งาน
func (r *TeacherRepository) GetTeacher(c *gin.Context) {
	id := c.Param("id")      // รับค่า id จากผู้ใช้งาน
	var teacher Teacher      // สร้างตัวแปร teacher เพื่อเก็บข้อมูลที่ค้นหาได้
	r.Db.First(&teacher, id) // SELECT * FROM teachers WHERE id = id
	c.JSON(200, teacher)     // ส่งข้อมูลกลับไปให้ผู้ใช้งาน
}

// ฟังก์ชันอัพเดทข้อมูล Teacher ลงในฐานข้อมูล และส่งกลับไปให้ผู้ใช้งานผ่าน c.JSON(200, teacher)
func (r *TeacherRepository) UpdateTeacher(c *gin.Context) {
	id := c.Param("id")
	var teacher Teacher
	r.Db.First(&teacher, id) // SELECT * FROM teachers WHERE id = id
	c.BindJSON(&teacher)
	r.Db.Save(&teacher) // UPDATE teachers SET name = teacher.Name, price = teacher.Price WHERE id = id
	c.JSON(200, teacher)
}

// ฟังก์ชันลบข้อมูล Teacher ออกจากฐานข้อมูล และส่งกลับไปให้ผู้ใช้งานผ่าน c.JSON(200, gin.H{"id" + id: "is deleted"})
// gin.H ทำหน้าที่สร้าง map ของ key และ value และส่งกลับไปให้ผู้ใช้งาน
// H คือตัวย่อของ Header ใน HTTP
func (r *TeacherRepository) DeleteTeacher(c *gin.Context) {
	id := c.Param("id")
	var teacher Teacher
	r.Db.Delete(&teacher, id) // DELETE FROM teachers WHERE id = id
	c.JSON(200, gin.H{"id" + id: "is deleted"})
}
