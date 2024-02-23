// models/Subject.go
package models

import "gorm.io/gorm"

type Subject struct {
	gorm.Model
	Subject_id     string `gorm:"size:10"`
	Subject_name   string
	Subject_credit float32
}
