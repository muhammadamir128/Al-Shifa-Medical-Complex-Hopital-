BEGIN TRY

BEGIN TRAN;

-- CreateSchema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'dbo') EXEC sp_executesql N'CREATE SCHEMA [dbo];';

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000),
    [avatar] NVARCHAR(1000),
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [users_role_df] DEFAULT 'PATIENT',
    [isActive] BIT NOT NULL CONSTRAINT [users_isActive_df] DEFAULT 1,
    [emailVerified] BIT NOT NULL CONSTRAINT [users_emailVerified_df] DEFAULT 0,
    [twoFactorEnabled] BIT NOT NULL CONSTRAINT [users_twoFactorEnabled_df] DEFAULT 0,
    [twoFactorSecret] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[patients] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [dateOfBirth] DATETIME2,
    [gender] NVARCHAR(1000),
    [bloodGroup] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [emergencyContact] NVARCHAR(1000),
    [medicalHistory] NVARCHAR(1000),
    [allergies] NVARCHAR(1000),
    [insuranceNumber] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [patients_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [patients_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [patients_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[doctors] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [specialization] NVARCHAR(1000),
    [qualification] NVARCHAR(1000),
    [licenseNumber] NVARCHAR(1000),
    [departmentId] NVARCHAR(1000),
    [consultationFee] FLOAT(53),
    [availability] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [doctors_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [doctors_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [doctors_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[nurses] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [departmentId] NVARCHAR(1000),
    [qualification] NVARCHAR(1000),
    [licenseNumber] NVARCHAR(1000),
    [shift] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [nurses_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [nurses_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [nurses_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[departments] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [head] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [departments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [departments_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [departments_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[appointments] (
    [id] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000) NOT NULL,
    [doctorId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000),
    [date] DATETIME2 NOT NULL,
    [startTime] NVARCHAR(1000) NOT NULL,
    [endTime] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [appointments_status_df] DEFAULT 'SCHEDULED',
    [type] NVARCHAR(1000),
    [reason] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [appointments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [appointments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[medical_records] (
    [id] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000) NOT NULL,
    [doctorId] NVARCHAR(1000) NOT NULL,
    [diagnosis] NVARCHAR(1000),
    [treatment] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [attachments] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [medical_records_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [medical_records_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[prescriptions] (
    [id] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000) NOT NULL,
    [doctorId] NVARCHAR(1000) NOT NULL,
    [appointmentId] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [prescriptions_status_df] DEFAULT 'PENDING',
    [notes] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [prescriptions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [prescriptions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [prescriptions_appointmentId_key] UNIQUE NONCLUSTERED ([appointmentId])
);

-- CreateTable
CREATE TABLE [dbo].[prescription_items] (
    [id] NVARCHAR(1000) NOT NULL,
    [prescriptionId] NVARCHAR(1000) NOT NULL,
    [medicationId] NVARCHAR(1000) NOT NULL,
    [dosage] NVARCHAR(1000) NOT NULL,
    [frequency] NVARCHAR(1000) NOT NULL,
    [duration] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [instructions] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [prescription_items_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [prescription_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[medications] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [genericName] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [manufacturer] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [unitPrice] FLOAT(53) NOT NULL,
    [stockQuantity] INT NOT NULL CONSTRAINT [medications_stockQuantity_df] DEFAULT 0,
    [reorderLevel] INT NOT NULL CONSTRAINT [medications_reorderLevel_df] DEFAULT 10,
    [expiryDate] DATETIME2,
    [batchNumber] NVARCHAR(1000),
    [location] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [medications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [medications_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[vitals] (
    [id] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000) NOT NULL,
    [nurseId] NVARCHAR(1000),
    [temperature] FLOAT(53),
    [bloodPressure] NVARCHAR(1000),
    [heartRate] INT,
    [respiratoryRate] INT,
    [weight] FLOAT(53),
    [height] FLOAT(53),
    [oxygenSaturation] FLOAT(53),
    [notes] NVARCHAR(1000),
    [recordedAt] DATETIME2 NOT NULL CONSTRAINT [vitals_recordedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [vitals_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [vitals_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[lab_requests] (
    [id] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000) NOT NULL,
    [doctorId] NVARCHAR(1000) NOT NULL,
    [testType] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [priority] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [lab_requests_status_df] DEFAULT 'PENDING',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [lab_requests_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [lab_requests_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[lab_results] (
    [id] NVARCHAR(1000) NOT NULL,
    [requestId] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000) NOT NULL,
    [results] NVARCHAR(1000) NOT NULL,
    [notes] NVARCHAR(1000),
    [technician] NVARCHAR(1000),
    [reportedAt] DATETIME2 NOT NULL CONSTRAINT [lab_results_reportedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [lab_results_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [lab_results_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[billings] (
    [id] NVARCHAR(1000) NOT NULL,
    [appointmentId] NVARCHAR(1000) NOT NULL,
    [patientId] NVARCHAR(1000),
    [totalAmount] FLOAT(53) NOT NULL,
    [discount] FLOAT(53) NOT NULL CONSTRAINT [billings_discount_df] DEFAULT 0,
    [tax] FLOAT(53) NOT NULL CONSTRAINT [billings_tax_df] DEFAULT 0,
    [grandTotal] FLOAT(53) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [billings_status_df] DEFAULT 'PENDING',
    [paymentMethod] NVARCHAR(1000),
    [paymentDate] DATETIME2,
    [notes] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [billings_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [billings_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [billings_appointmentId_key] UNIQUE NONCLUSTERED ([appointmentId])
);

-- CreateTable
CREATE TABLE [dbo].[billing_items] (
    [id] NVARCHAR(1000) NOT NULL,
    [billingId] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [unitPrice] FLOAT(53) NOT NULL,
    [total] FLOAT(53) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [billing_items_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [billing_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[notifications] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [message] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000),
    [isRead] BIT NOT NULL CONSTRAINT [notifications_isRead_df] DEFAULT 0,
    [link] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [notifications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [notifications_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tasks] (
    [id] NVARCHAR(1000) NOT NULL,
    [nurseId] NVARCHAR(1000),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [priority] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [dueDate] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [tasks_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [tasks_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[audit_logs] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000),
    [action] NVARCHAR(1000) NOT NULL,
    [entity] NVARCHAR(1000),
    [entityId] NVARCHAR(1000),
    [details] NVARCHAR(1000),
    [ipAddress] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [audit_logs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [audit_logs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[settings] (
    [id] NVARCHAR(1000) NOT NULL,
    [key] NVARCHAR(1000) NOT NULL,
    [value] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [settings_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [settings_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [settings_key_key] UNIQUE NONCLUSTERED ([key])
);

-- CreateTable
CREATE TABLE [dbo].[messages] (
    [id] NVARCHAR(1000) NOT NULL,
    [senderId] NVARCHAR(1000) NOT NULL,
    [receiverId] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [isRead] BIT NOT NULL CONSTRAINT [messages_isRead_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [messages_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [messages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[doctor_schedules] (
    [id] NVARCHAR(1000) NOT NULL,
    [doctorId] NVARCHAR(1000) NOT NULL,
    [dayOfWeek] INT NOT NULL,
    [startTime] NVARCHAR(1000) NOT NULL,
    [endTime] NVARCHAR(1000) NOT NULL,
    [isAvailable] BIT NOT NULL CONSTRAINT [doctor_schedules_isAvailable_df] DEFAULT 1,
    [slotDuration] INT NOT NULL CONSTRAINT [doctor_schedules_slotDuration_df] DEFAULT 30,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [doctor_schedules_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [doctor_schedules_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [doctor_schedules_doctorId_dayOfWeek_key] UNIQUE NONCLUSTERED ([doctorId],[dayOfWeek])
);

-- CreateTable
CREATE TABLE [dbo].[file_attachments] (
    [id] NVARCHAR(1000) NOT NULL,
    [uploadedBy] NVARCHAR(1000) NOT NULL,
    [fileName] NVARCHAR(1000) NOT NULL,
    [originalName] NVARCHAR(1000) NOT NULL,
    [mimeType] NVARCHAR(1000) NOT NULL,
    [size] INT NOT NULL,
    [entityType] NVARCHAR(1000),
    [entityId] NVARCHAR(1000),
    [url] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [file_attachments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [file_attachments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[inventory_transactions] (
    [id] NVARCHAR(1000) NOT NULL,
    [medicationId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [previousStock] INT NOT NULL,
    [newStock] INT NOT NULL,
    [reason] NVARCHAR(1000),
    [performedBy] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [inventory_transactions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [inventory_transactions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[otp_tokens] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [expiresAt] DATETIME2 NOT NULL,
    [used] BIT NOT NULL CONSTRAINT [otp_tokens_used_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [otp_tokens_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [otp_tokens_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[patients] ADD CONSTRAINT [patients_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[doctors] ADD CONSTRAINT [doctors_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[doctors] ADD CONSTRAINT [doctors_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[departments]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[nurses] ADD CONSTRAINT [nurses_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[nurses] ADD CONSTRAINT [nurses_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[departments]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[doctors]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[appointments] ADD CONSTRAINT [appointments_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[medical_records] ADD CONSTRAINT [medical_records_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[medical_records] ADD CONSTRAINT [medical_records_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[doctors]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[prescriptions] ADD CONSTRAINT [prescriptions_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[prescriptions] ADD CONSTRAINT [prescriptions_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[doctors]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[prescriptions] ADD CONSTRAINT [prescriptions_appointmentId_fkey] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[appointments]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[prescription_items] ADD CONSTRAINT [prescription_items_prescriptionId_fkey] FOREIGN KEY ([prescriptionId]) REFERENCES [dbo].[prescriptions]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[prescription_items] ADD CONSTRAINT [prescription_items_medicationId_fkey] FOREIGN KEY ([medicationId]) REFERENCES [dbo].[medications]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[vitals] ADD CONSTRAINT [vitals_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[vitals] ADD CONSTRAINT [vitals_nurseId_fkey] FOREIGN KEY ([nurseId]) REFERENCES [dbo].[nurses]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[lab_requests] ADD CONSTRAINT [lab_requests_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[doctors]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[lab_results] ADD CONSTRAINT [lab_results_requestId_fkey] FOREIGN KEY ([requestId]) REFERENCES [dbo].[lab_requests]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[lab_results] ADD CONSTRAINT [lab_results_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[billings] ADD CONSTRAINT [billings_appointmentId_fkey] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[appointments]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[billing_items] ADD CONSTRAINT [billing_items_billingId_fkey] FOREIGN KEY ([billingId]) REFERENCES [dbo].[billings]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[notifications] ADD CONSTRAINT [notifications_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tasks] ADD CONSTRAINT [tasks_nurseId_fkey] FOREIGN KEY ([nurseId]) REFERENCES [dbo].[nurses]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[audit_logs] ADD CONSTRAINT [audit_logs_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[messages] ADD CONSTRAINT [messages_senderId_fkey] FOREIGN KEY ([senderId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[messages] ADD CONSTRAINT [messages_receiverId_fkey] FOREIGN KEY ([receiverId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[doctor_schedules] ADD CONSTRAINT [doctor_schedules_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[doctors]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[file_attachments] ADD CONSTRAINT [file_attachments_uploadedBy_fkey] FOREIGN KEY ([uploadedBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[inventory_transactions] ADD CONSTRAINT [inventory_transactions_medicationId_fkey] FOREIGN KEY ([medicationId]) REFERENCES [dbo].[medications]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[otp_tokens] ADD CONSTRAINT [otp_tokens_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
