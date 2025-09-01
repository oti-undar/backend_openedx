import type { getUserIdSchemaProps } from '@/schemas/validation.js'
import { db, db_open_edx } from '@/db/db.js'

export async function isInstructor({ item }: { item: getUserIdSchemaProps }) {
  const userId = item.user_id

  const hasInstructorOrStaffRole = await db_open_edx.$queryRaw<
    { has_role: number }[]
  >`
    SELECT EXISTS (
      SELECT 1
      FROM student_courseaccessrole ar
      WHERE ar.user_id = ${userId}
        AND ar.role IN ('instructor', 'staff')
    ) AS has_role;
    `

  const result = Number(hasInstructorOrStaffRole[0].has_role) === 1

  return result
}
