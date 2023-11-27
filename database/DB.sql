-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_wedding
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_wedding
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_wedding` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `db_wedding` ;

-- -----------------------------------------------------
-- Table `db_wedding`.`dichvu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`dichvu` (
  `idDichVu` INT NOT NULL AUTO_INCREMENT,
  `tenDichVu` TEXT NOT NULL,
  `giaThue` FLOAT NOT NULL,
  `hienThi` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDichVu`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`khachhang`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`khachhang` (
  `idKhachHang` INT NOT NULL AUTO_INCREMENT,
  `tenKhachHang` TEXT NOT NULL,
  `dienThoai` TEXT NOT NULL,
  `hienThi` INT NOT NULL DEFAULT '1',
  `diaChi` TEXT NOT NULL,
  PRIMARY KEY (`idKhachHang`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`hopdong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`hopdong` (
  `idHopDong` VARCHAR(255) NOT NULL,
  `ngayTao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ngayThanhToan` DATE NULL DEFAULT NULL,
  `tienCoc` FLOAT NOT NULL,
  `giamGia` FLOAT NOT NULL DEFAULT '0',
  `tongTien` FLOAT NOT NULL,
  `trangThaiThanhToan` ENUM('Đã thanh toán', 'Chưa thanh toán') NOT NULL,
  `trangThaiHopDong` TEXT NOT NULL,
  `trangThaiPhatSinh` ENUM('Có phát sinh', 'Không có phát sinh') NULL DEFAULT NULL,
  `hienThi` INT NOT NULL DEFAULT '1',
  `idKhachHang` INT NOT NULL,
  PRIMARY KEY (`idHopDong`),
  INDEX `fk_HopDong_KhachHang1_idx` (`idKhachHang` ASC) VISIBLE,
  CONSTRAINT `fk_HopDong_KhachHang1`
    FOREIGN KEY (`idKhachHang`)
    REFERENCES `db_wedding`.`khachhang` (`idKhachHang`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`sanpham`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`sanpham` (
  `idSanPham` INT NOT NULL AUTO_INCREMENT,
  `tenSanPham` TEXT NOT NULL,
  `anhSanPham` TEXT NOT NULL,
  `giaThue` FLOAT NOT NULL,
  `trangThai` ENUM('Sẵn sàng', 'Chưa sẵn sàng') NOT NULL,
  `hienThi` INT NOT NULL DEFAULT '1',
  `loaiSanPham` ENUM('Cô Dâu', 'Chú Rể') NOT NULL,
  PRIMARY KEY (`idSanPham`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`hopdongchitiet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`hopdongchitiet` (
  `idHopDongChiTiet` VARCHAR(255) NOT NULL,
  `diaDiem` TEXT NULL DEFAULT NULL,
  `ngayThucHien` DATE NULL DEFAULT NULL,
  `ngayThue` DATE NULL DEFAULT NULL,
  `ngayTra` DATE NULL DEFAULT NULL,
  `hienThi` INT NULL DEFAULT '1',
  `idDichVu` INT NULL DEFAULT NULL,
  `idSanPham` INT NULL DEFAULT NULL,
  `idHopDong` VARCHAR(255) NULL DEFAULT NULL,
  `idHDTamThoi` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idHopDongChiTiet`),
  INDEX `fk_HopDongChiTiet_DichVu_idx` (`idDichVu` ASC) VISIBLE,
  INDEX `fk_HopDongChiTiet_SanPham1_idx` (`idSanPham` ASC) VISIBLE,
  INDEX `fk_HopDongChiTiet_HopDong1_idx` (`idHopDong` ASC) VISIBLE,
  CONSTRAINT `fk_HopDongChiTiet_DichVu`
    FOREIGN KEY (`idDichVu`)
    REFERENCES `db_wedding`.`dichvu` (`idDichVu`),
  CONSTRAINT `fk_HopDongChiTiet_HopDong1`
    FOREIGN KEY (`idHopDong`)
    REFERENCES `db_wedding`.`hopdong` (`idHopDong`),
  CONSTRAINT `fk_HopDongChiTiet_SanPham1`
    FOREIGN KEY (`idSanPham`)
    REFERENCES `db_wedding`.`sanpham` (`idSanPham`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`congviec`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`congviec` (
  `idCongViec` INT NOT NULL AUTO_INCREMENT,
  `trangThaiCongViec` TEXT NOT NULL,
  `ngayGiatSanPham` DATE NULL DEFAULT NULL,
  `ngaySanSang` DATE NULL DEFAULT NULL,
  `hienThi` INT NOT NULL DEFAULT '1',
  `idHDCT` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idCongViec`),
  INDEX `fk_CongViec_HopDongChiTiet1_idx` (`idHDCT` ASC) VISIBLE,
  CONSTRAINT `fk_CongViec_HopDongChiTiet1`
    FOREIGN KEY (`idHDCT`)
    REFERENCES `db_wedding`.`hopdongchitiet` (`idHopDongChiTiet`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`nhanvien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`nhanvien` (
  `idNhanVien` VARCHAR(255) NOT NULL,
  `hoVaTen` TEXT NOT NULL,
  `matKhau` TEXT NOT NULL,
  `ngaySinh` DATE NOT NULL,
  `gioiTinh` TEXT NOT NULL,
  `dienThoai` TEXT NOT NULL,
  `diaChi` TEXT NOT NULL,
  `anhDaiDien` TEXT NOT NULL,
  `vaiTro` TEXT NOT NULL,
  `hienThi` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`idNhanVien`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`phatsinh`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`phatsinh` (
  `idPhatSinh` INT NOT NULL AUTO_INCREMENT,
  `phiPhatSinh` FLOAT NULL DEFAULT NULL,
  `hanTra` DATE NULL DEFAULT NULL,
  `noiDung` TEXT NOT NULL,
  `hienThi` INT NOT NULL,
  `idHopDong` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idPhatSinh`),
  INDEX `fk_PhatSinh_HopDong1_idx` (`idHopDong` ASC) VISIBLE,
  CONSTRAINT `fk_PhatSinh_HopDong1`
    FOREIGN KEY (`idHopDong`)
    REFERENCES `db_wedding`.`hopdong` (`idHopDong`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `db_wedding`.`thamgia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_wedding`.`thamgia` (
  `idThamGia` INT NOT NULL AUTO_INCREMENT,
  `idCongViec` INT NOT NULL,
  `idNhanVien` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idThamGia`),
  INDEX `fk_ThamGia_CongViec1_idx` (`idCongViec` ASC) VISIBLE,
  INDEX `fk_ThamGia_NhanVien1_idx` (`idNhanVien` ASC) VISIBLE,
  CONSTRAINT `fk_ThamGia_CongViec1`
    FOREIGN KEY (`idCongViec`)
    REFERENCES `db_wedding`.`congviec` (`idCongViec`),
  CONSTRAINT `fk_ThamGia_NhanVien1`
    FOREIGN KEY (`idNhanVien`)
    REFERENCES `db_wedding`.`nhanvien` (`idNhanVien`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- 
INSERT INTO `hopdongchitiet` (`idHopDongChiTiet`, `ngayThue`, `ngayTra`, `idSanPham`)
VALUES
  ('HDCT202311230921', '2023-12-05', '2023-12-10', 2);