-- CreateTable
CREATE TABLE `Curso` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioCurso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `curso_id` VARCHAR(191) NOT NULL,
    `is_instructor` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `UsuarioCurso_user_id_curso_id_key`(`user_id`, `curso_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EjecucionExamen` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `examen_id` VARCHAR(191) NOT NULL,
    `pregunta_ejecucion_actual_id` VARCHAR(191) NULL,
    `fin_examen` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `EjecucionExamen_pregunta_ejecucion_actual_id_key`(`pregunta_ejecucion_actual_id`),
    UNIQUE INDEX `EjecucionExamen_user_id_examen_id_key`(`user_id`, `examen_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreguntasEjecucionExamen` (
    `id` VARCHAR(191) NOT NULL,
    `ejecucion_examen_id` VARCHAR(191) NOT NULL,
    `pregunta_id` VARCHAR(191) NOT NULL,
    `respuesta_id` VARCHAR(191) NULL,
    `inicio` DATETIME(3) NULL,
    `final` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `PreguntasEjecucionExamen_pregunta_id_ejecucion_examen_id_key`(`pregunta_id`, `ejecucion_examen_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Examen` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `img` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `audio` VARCHAR(191) NULL,
    `peso` TINYINT NOT NULL DEFAULT 1,
    `user_id` INTEGER NOT NULL,
    `curso_id` VARCHAR(191) NOT NULL,
    `inicio_examen` DATETIME(3) NULL,
    `final_examen` DATETIME(3) NULL,
    `tipo_examen` ENUM('Sync', 'Async', 'Solo') NOT NULL DEFAULT 'Async',
    `rubrica_holistica_id` VARCHAR(191) NULL,
    `rubrica_analitica_id` VARCHAR(191) NULL,
    `state_id` INTEGER NOT NULL,
    `pregunta_actual_sync_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Examen_pregunta_actual_sync_id_key`(`pregunta_actual_sync_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `img` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `audio` VARCHAR(191) NULL,
    `puntos` TINYINT NOT NULL DEFAULT 1,
    `duracion` DECIMAL(6, 2) NULL,
    `examen_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` VARCHAR(191) NOT NULL,
    `respuesta` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `audio` VARCHAR(191) NULL,
    `correcta` BOOLEAN NOT NULL DEFAULT false,
    `pregunta_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historial` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `examen_id` VARCHAR(191) NOT NULL,
    `puntaje` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RubricaHolistica` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `competencias` TEXT NOT NULL,
    `capacidades` TEXT NOT NULL,
    `desempenos` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `RubricaHolistica_name_user_id_key`(`name`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RubricaAnalitica` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `competencias` TEXT NOT NULL,
    `capacidades` TEXT NOT NULL,
    `desempenos` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `RubricaAnalitica_name_user_id_key`(`name`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Indicadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rubrica_analitica_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Indicadores_name_rubrica_analitica_id_key`(`name`, `rubrica_analitica_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NivelesDeLogro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `criterios` TEXT NOT NULL,
    `nota` VARCHAR(191) NOT NULL,
    `rubrica_holistica_id` VARCHAR(191) NULL,
    `indicador_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `NivelesDeLogro_name_indicador_id_key`(`name`, `indicador_id`),
    UNIQUE INDEX `NivelesDeLogro_name_rubrica_holistica_id_key`(`name`, `rubrica_holistica_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('Activo', 'Inconcluso', 'Disponible', 'Suspendido', 'Inactivo', 'Finalizado') NOT NULL,

    UNIQUE INDEX `State_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_superuser` BOOLEAN NOT NULL DEFAULT false,
    `is_staff` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `username` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IndicadoresToPregunta` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_IndicadoresToPregunta_AB_unique`(`A`, `B`),
    INDEX `_IndicadoresToPregunta_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioCurso` ADD CONSTRAINT `UsuarioCurso_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioCurso` ADD CONSTRAINT `UsuarioCurso_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EjecucionExamen` ADD CONSTRAINT `EjecucionExamen_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EjecucionExamen` ADD CONSTRAINT `EjecucionExamen_examen_id_fkey` FOREIGN KEY (`examen_id`) REFERENCES `Examen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EjecucionExamen` ADD CONSTRAINT `EjecucionExamen_pregunta_ejecucion_actual_id_fkey` FOREIGN KEY (`pregunta_ejecucion_actual_id`) REFERENCES `PreguntasEjecucionExamen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreguntasEjecucionExamen` ADD CONSTRAINT `PreguntasEjecucionExamen_ejecucion_examen_id_fkey` FOREIGN KEY (`ejecucion_examen_id`) REFERENCES `EjecucionExamen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreguntasEjecucionExamen` ADD CONSTRAINT `PreguntasEjecucionExamen_pregunta_id_fkey` FOREIGN KEY (`pregunta_id`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreguntasEjecucionExamen` ADD CONSTRAINT `PreguntasEjecucionExamen_respuesta_id_fkey` FOREIGN KEY (`respuesta_id`) REFERENCES `Respuesta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_rubrica_holistica_id_fkey` FOREIGN KEY (`rubrica_holistica_id`) REFERENCES `RubricaHolistica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_rubrica_analitica_id_fkey` FOREIGN KEY (`rubrica_analitica_id`) REFERENCES `RubricaAnalitica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examen` ADD CONSTRAINT `Examen_pregunta_actual_sync_id_fkey` FOREIGN KEY (`pregunta_actual_sync_id`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_examen_id_fkey` FOREIGN KEY (`examen_id`) REFERENCES `Examen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_pregunta_id_fkey` FOREIGN KEY (`pregunta_id`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_examen_id_fkey` FOREIGN KEY (`examen_id`) REFERENCES `Examen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RubricaHolistica` ADD CONSTRAINT `RubricaHolistica_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RubricaAnalitica` ADD CONSTRAINT `RubricaAnalitica_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Indicadores` ADD CONSTRAINT `Indicadores_rubrica_analitica_id_fkey` FOREIGN KEY (`rubrica_analitica_id`) REFERENCES `RubricaAnalitica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NivelesDeLogro` ADD CONSTRAINT `NivelesDeLogro_rubrica_holistica_id_fkey` FOREIGN KEY (`rubrica_holistica_id`) REFERENCES `RubricaHolistica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NivelesDeLogro` ADD CONSTRAINT `NivelesDeLogro_indicador_id_fkey` FOREIGN KEY (`indicador_id`) REFERENCES `Indicadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IndicadoresToPregunta` ADD CONSTRAINT `_IndicadoresToPregunta_A_fkey` FOREIGN KEY (`A`) REFERENCES `Indicadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IndicadoresToPregunta` ADD CONSTRAINT `_IndicadoresToPregunta_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
