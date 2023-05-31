import ScrapingController from './controllers/ScrapingController'
import EmailsController from './controllers/EmailsController'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

const mailer = new EmailsController()
const scraper = new ScrapingController()

async function start() {
  const jobs = await scraper.getJobs()

  jobs.forEach((job) => {
    if (emailRegex.test(job.email)) {
      ;(async () => {
        try {
          const emailContent = await mailer.createSendEmailRequest({
            toEmail: job.email,
            subject: `VAGA - ${job.title}`,
            senderEmail: 'brunoctsb@gmail.com',
            senderName: 'Bruno Sampaio',
          })

          console.log(emailContent)

          console.log('Email enviado com sucesso!')
        } catch (error) {
          console.error('Erro ao enviar o email:', error)
        }
      })()
    } else {
      console.log(`${job.title}: Email inválido -> ${job.email}`)
    }
  })
}

start()
