// models/Teacher.go
package models

import (
	"time"

	"gorm.io/gorm"
)

type Teacher struct {
	gorm.Model
	FirstName string
	LastName  string
	Sex       string `gorm:"size:10"`
	Age       int
	Bod       time.Time `gorm:"type:date"`
}
