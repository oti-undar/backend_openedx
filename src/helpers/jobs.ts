import { jobs } from '@/index.js'
import { differenceInMilliseconds } from 'date-fns'

export function listJobs() {
  return Array.from(jobs.values()).map(j => ({
    id: j.id,
    runAt: j.runAt,
  }))
}

export function createJob(id: string, runAt: Date, callback: () => void) {
  if (jobs.has(id)) cancelJob(id)

  const delay = differenceInMilliseconds(runAt, new Date())
  if (delay <= 0) {
    callback()
    return
  }

  const timeout = setTimeout(() => {
    callback()
    jobs.delete(id)
  }, delay)

  jobs.set(id, { id, timeout, runAt, callback })
}

export function cancelJob(id: string) {
  const job = jobs.get(id)
  if (job) {
    clearTimeout(job.timeout)
    jobs.delete(id)
  }
}

export function editJob(id: string, newDate: Date, newCallback: () => void) {
  const job = jobs.get(id)

  if (job) cancelJob(id)
  createJob(id, newDate, newCallback)
}
