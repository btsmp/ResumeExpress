import { config as dotenvConfig } from 'dotenv'
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client'
import BlobConversor from '../utils/BlobConversor'

dotenvConfig()

interface Sender {
  email: string
  name: string
}

interface Recipient {
  email: string
  name: string
}

interface Attachment {
  content: string
  name: string
}

interface EmailShape {
  sender: Sender
  to: Recipient[]
  subject: string
  htmlContent: string
  attachment?: Attachment[]
}

interface EmailRequest {
  toEmail: string
  subject: string
  senderEmail: string
  senderName: string
  attatchPath: string
}

class EmailsController {
  private conversor: BlobConversor
  private emailApi: TransactionalEmailsApi
  private htmlContent: string
  private apiKey: string | undefined

  constructor() {
    this.apiKey = process.env.API_KEY
    this.emailApi = new TransactionalEmailsApi()
    if (this.apiKey) {
      this.emailApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.apiKey)
    }
    this.conversor = new BlobConversor()
    this.htmlContent = `
    <!DOCTYPE html>
    <html><body><p>Caro recrutador,</p><p> Estou me candidatando à vaga disponível em sua empresa e gostaria de destacar minha forte motivação em aprender e desenvolver novas habilidades.<br/>Adquiri habilidades sólidas em atendimento ao cliente e vendas. Tenho facilidade de adaptação, sou proativo, comunicativo e dinâmico. Estou confiante de que posso aprender rapidamente e contribuir para o sucesso da equipe.<br/>Agradeço a atenção e aguardo um retorno positivo.<p/><br /> <span> Atenciosamente,<br/>Kamilli Vitória </span></body></html>`
  }

  public async createSendEmailRequest({
    toEmail,
    subject,
    senderEmail,
    senderName,
    attatchPath,
  }: EmailRequest): Promise<EmailShape> {
    const attachment = await this.conversor.processConversion(attatchPath)
    return {
      sender: { email: senderEmail, name: senderName },
      to: [{ email: toEmail, name: 'Recrutador' }],
      subject,
      htmlContent: this.htmlContent,
      attachment: [
        {
          content: attachment,
          name: 'curriculo.pdf',
        },
      ],
    }
  }

  public async sendEmail(emailRequest: EmailShape): Promise<void> {
    if (this.apiKey) {
      try {
        await this.emailApi.sendTransacEmail(emailRequest)
        console.log('Email enviado com sucesso!')
      } catch (err) {
        console.log(err)
      }
    } else {
      console.error('API key is not defined.')
    }
  }
}

export default EmailsController
