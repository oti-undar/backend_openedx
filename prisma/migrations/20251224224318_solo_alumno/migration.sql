-- AlterTable
ALTER TABLE `examen` MODIFY `tipo_examen` ENUM('Sync', 'Async', 'Solo', 'Alumno') NOT NULL DEFAULT 'Async';

-- AlterTable
ALTER TABLE `preguntasejecucionexamen` ADD COLUMN `retroalimentacion` TEXT NULL;

-- AlterTable
ALTER TABLE `respuesta` MODIFY `retroalimentacion` TEXT NULL;
