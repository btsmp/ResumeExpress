import ScrapingController from './controllers/ScrapingController'
import EmailsController from './controllers/EmailsController'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/

const mailer = new EmailsController()
const scraper = new ScrapingController()

async function start() {
  const jobs = await scraper.getJobs()
  const senderName = process.env.SENDER_NAME
  const senderEmail = process.env.SENDER_EMAIL
  const attatchPath = process.env.ATTATCH_PATH
  let countSucess = 0
  let countFailed = 0

  if (!senderName || !senderEmail || !attatchPath) {
    throw new Error('Missing env variables')
  }

  if (!emailRegex.test(senderEmail)) {
    throw new Error('Invalid sender email')
  }

  jobs.forEach((job) => {
    if (emailRegex.test(job.email)) {
      ;(async () => {
        try {
          const emailContent = await mailer.createSendEmailRequest({
            toEmail: job.email,
            subject: `VAGA - ${job.title}`,
            senderEmail,
            senderName,
            attatchPath,
          })
          await mailer.sendEmail(emailContent)
          countSucess++
        } catch (error) {
          console.error('Erro ao enviar o email:', error)
          countFailed++
        }
      })()
    } else {
      console.log(`${job.title}: Email inválido -> ${job.email}`)
      countFailed++
    }

    console.log(`TOTAL DE EMAILS ENVIADOS COM SUCESSO --> ${countSucess}`)
    console.log(`TOTAL DE FALHAS--> ${countFailed}`)
  })
}

start()
