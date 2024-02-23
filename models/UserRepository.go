package models

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// UserRepository เป็นโครงสร้างสำหรับจัดการข้อมูลผู้ใช้งานในฐานข้อมูล
type UserRepository struct {
	Db *gorm.DB
}

// NewUserRepository สร้าง instance ของ UserRepository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{Db: db}
}

// GetUsers ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
func (r *UserRepository) GetUsers(c *gin.Context) {
	var users []User
	r.Db.Find(&users)

	c.JSON(200, users)
}

// PostUser เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
func (r *UserRepository) PostUser(c *gin.Context) {
	var newUser User
	c.BindJSON(&newUser)

	r.Db.Create(&newUser)

	newUser.Password = ""

	c.JSON(200, newUser)
}

// GetUser ค้นหาผู้ใช้จากฐานข้อมูลด้วย email
func (r *UserRepository) GetUser(c *gin.Context) {
	email := c.Param("email")
	var user User
	r.Db.First(&user, "email = ?", email)
	c.JSON(200, user)
}

// UpdateUser อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
func (r *UserRepository) UpdateUser(c *gin.Context) {
	email := c.Param("email")
	var user User
	r.Db.First(&user, "email = ?", email)
	c.BindJSON(&user)

	r.Db.Save(&user)
	c.JSON(200, user)
}

// DeleteUser ลบข้อมูลผู้ใช้ออกจากฐานข้อมูล
func (r *UserRepository) DeleteUser(c *gin.Context) {
	email := c.Param("email")
	var user User
	r.Db.First(&user, "email = ?", email)
	r.Db.Delete(&user)
	c.JSON(200, user)
}

// Login ใช้ในการตรวจสอบการเข้าสู่ระบบของผู้ใช้
func (r *UserRepository) Login(c *gin.Context) {
	var user User
	var inputUser User
	c.BindJSON(&inputUser)
	r.Db.First(&user, "email = ?", inputUser.Email)
	if user.ID == 0 {
		c.JSON(401, gin.H{"message": "Invalid email or password"})
		return
	}

	if inputUser.Password != user.Password {
		c.JSON(401, gin.H{"message": "Invalid email or password"})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
