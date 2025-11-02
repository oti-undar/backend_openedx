-- CreateTable
CREATE TABLE `curso` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuariocurso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `curso_id` VARCHAR(191) NOT NULL,
    `is_instructor` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `usuariocurso_user_id_curso_id_key`(`user_id`, `curso_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ejecucionexamen` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `examen_id` VARCHAR(191) NOT NULL,
    `pregunta_ejecucion_actual_id` VARCHAR(191) NULL,
    `fin_examen` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `ejecucionexamen_pregunta_ejecucion_actual_id_key`(`pregunta_ejecucion_actual_id`),
    UNIQUE INDEX `ejecucionexamen_user_id_examen_id_key`(`user_id`, `examen_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `preguntasejecucionexamen` (
    `id` VARCHAR(191) NOT NULL,
    `ejecucion_examen_id` VARCHAR(191) NOT NULL,
    `pregunta_id` VARCHAR(191) NOT NULL,
    `respuesta_id` VARCHAR(191) NULL,
    `inicio` DATETIME(3) NULL,
    `final` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `preguntasejecucionexamen_pregunta_id_ejecucion_examen_id_key`(`pregunta_id`, `ejecucion_examen_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examen` (
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

    UNIQUE INDEX `examen_pregunta_actual_sync_id_key`(`pregunta_actual_sync_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pregunta` (
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
CREATE TABLE `respuesta` (
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
CREATE TABLE `historial` (
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
CREATE TABLE `rubricaholistica` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `competencias` TEXT NOT NULL,
    `capacidades` TEXT NOT NULL,
    `desempenos` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `rubricaholistica_name_user_id_key`(`name`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rubricaanalitica` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `competencias` TEXT NOT NULL,
    `capacidades` TEXT NOT NULL,
    `desempenos` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `rubricaanalitica_name_user_id_key`(`name`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indicadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rubrica_analitica_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `indicadores_name_rubrica_analitica_id_key`(`name`, `rubrica_analitica_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nivelesdelogro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `criterios` TEXT NOT NULL,
    `nota` VARCHAR(191) NOT NULL,
    `rubrica_holistica_id` VARCHAR(191) NULL,
    `indicador_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `nivelesdelogro_name_indicador_id_key`(`name`, `indicador_id`),
    UNIQUE INDEX `nivelesdelogro_name_rubrica_holistica_id_key`(`name`, `rubrica_holistica_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('Activo', 'Inconcluso', 'Disponible', 'Suspendido', 'Inactivo', 'Finalizado') NOT NULL,

    UNIQUE INDEX `state_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
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
ALTER TABLE `usuariocurso` ADD CONSTRAINT `usuariocurso_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariocurso` ADD CONSTRAINT `usuariocurso_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ejecucionexamen` ADD CONSTRAINT `ejecucionexamen_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ejecucionexamen` ADD CONSTRAINT `ejecucionexamen_examen_id_fkey` FOREIGN KEY (`examen_id`) REFERENCES `examen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ejecucionexamen` ADD CONSTRAINT `ejecucionexamen_pregunta_ejecucion_actual_id_fkey` FOREIGN KEY (`pregunta_ejecucion_actual_id`) REFERENCES `preguntasejecucionexamen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `preguntasejecucionexamen` ADD CONSTRAINT `preguntasejecucionexamen_ejecucion_examen_id_fkey` FOREIGN KEY (`ejecucion_examen_id`) REFERENCES `ejecucionexamen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `preguntasejecucionexamen` ADD CONSTRAINT `preguntasejecucionexamen_pregunta_id_fkey` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `preguntasejecucionexamen` ADD CONSTRAINT `preguntasejecucionexamen_respuesta_id_fkey` FOREIGN KEY (`respuesta_id`) REFERENCES `respuesta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen` ADD CONSTRAINT `examen_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen` ADD CONSTRAINT `examen_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen` ADD CONSTRAINT `examen_rubrica_holistica_id_fkey` FOREIGN KEY (`rubrica_holistica_id`) REFERENCES `rubricaholistica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen` ADD CONSTRAINT `examen_rubrica_analitica_id_fkey` FOREIGN KEY (`rubrica_analitica_id`) REFERENCES `rubricaanalitica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen` ADD CONSTRAINT `examen_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen` ADD CONSTRAINT `examen_pregunta_actual_sync_id_fkey` FOREIGN KEY (`pregunta_actual_sync_id`) REFERENCES `pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pregunta` ADD CONSTRAINT `pregunta_examen_id_fkey` FOREIGN KEY (`examen_id`) REFERENCES `examen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respuesta` ADD CONSTRAINT `respuesta_pregunta_id_fkey` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial` ADD CONSTRAINT `historial_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial` ADD CONSTRAINT `historial_examen_id_fkey` FOREIGN KEY (`examen_id`) REFERENCES `examen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rubricaholistica` ADD CONSTRAINT `rubricaholistica_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rubricaanalitica` ADD CONSTRAINT `rubricaanalitica_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `indicadores` ADD CONSTRAINT `indicadores_rubrica_analitica_id_fkey` FOREIGN KEY (`rubrica_analitica_id`) REFERENCES `rubricaanalitica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nivelesdelogro` ADD CONSTRAINT `nivelesdelogro_rubrica_holistica_id_fkey` FOREIGN KEY (`rubrica_holistica_id`) REFERENCES `rubricaholistica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nivelesdelogro` ADD CONSTRAINT `nivelesdelogro_indicador_id_fkey` FOREIGN KEY (`indicador_id`) REFERENCES `indicadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IndicadoresToPregunta` ADD CONSTRAINT `_IndicadoresToPregunta_A_fkey` FOREIGN KEY (`A`) REFERENCES `indicadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IndicadoresToPregunta` ADD CONSTRAINT `_IndicadoresToPregunta_B_fkey` FOREIGN KEY (`B`) REFERENCES `pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
