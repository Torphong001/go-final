package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-final/db"
	"github.com/go-final/models"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	dbType := os.Getenv("DB_TYPE")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	database, err := db.ConnectDatabase(dbType, dbUser, dbPassword, dbHost, dbPort, dbName)
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	err = database.AutoMigrate(&models.Student{}, &models.Subject{}, &models.User{}, &models.Teacher{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	userRepo := models.NewUserRepository(database)
	studentRepo := models.NewStudentRepository(database)
	subjectRepo := models.NewSubjectRepository(database)
	teacherRepo := models.NewTeacherRepository(database)

	r := gin.Default()

	// กำหนด cors (Cross-Origin Resource Sharing)
	r.Use(cors.New(cors.Config{
		// 3000 คือ port ที่ใช้งานใน frontend react
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/users", userRepo.GetUsers)
	r.GET("/students", studentRepo.GetStudents)
	r.GET("/subjects", subjectRepo.GetSubjects)
	r.GET("/teachers", teacherRepo.GetTeachers)
	go r.POST("/users", userRepo.PostUser)
	r.POST("/students", studentRepo.PostStudent)
	r.POST("/subjects", subjectRepo.PostSubject)
	r.POST("/teachers", teacherRepo.PostTeacher)

	r.GET("/users/:email", userRepo.GetUser)
	r.GET("/students/:id", studentRepo.GetStudent)
	r.GET("/subjects/:id", subjectRepo.GetSubject)
	r.GET("/teachers/:id", teacherRepo.GetTeachers)

	r.PUT("/users/:email", userRepo.UpdateUser)
	r.PUT("/students/:id", studentRepo.UpdateStudent)
	r.PUT("/subjects/:id", subjectRepo.UpdateSubject)
	r.PUT("/teachers/:id", teacherRepo.UpdateTeacher)

	r.DELETE("/users/:email", userRepo.DeleteUser)
	r.DELETE("/students/:id", studentRepo.DeleteStudent)
	r.DELETE("/subjects/:id", subjectRepo.DeleteSubject)
	r.DELETE("/teachers/:id", teacherRepo.DeleteTeacher)

	r.POST("/users/login", userRepo.Login)

	// ถ้าไม่มี api ที่ตรงกับที่กำหนด จะแสดงข้อความ Not found
	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "Not found"})
	})

	// Run the server
	if err := r.Run(":5000"); err != nil {
		log.Fatalf("Server is not running: %v", err)
	}

}
