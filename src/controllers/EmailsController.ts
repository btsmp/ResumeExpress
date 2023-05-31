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
    this.htmlContent = `<!DOCTYPE html><html><body><p>Caro recrutador,</p><p> Estou me candidatando à vaga disponível em sua empresa e gostaria de destacar minha forte motivação em aprender e desenvolver novas habilidades, mesmo não tendo experiência prévia nessa área específica. Como videomaker autônomo desde 2019, adquiri habilidades sólidas em produção, edição e captura de vídeos, utilizando softwares como Adobe Premiere Pro, Adobe Photoshop e Adobe Lightroom. Tenho facilidade de adaptação, sou proativo, comunicativo e dinâmico. Estou confiante de que posso aprender rapidamente e contribuir para o sucesso da equipe.<br/>Agradeço a atenção e aguardo um retorno positivo.<p/><br /> <span> Atenciosamente,<br/>Allan </span></body></html>`
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

  public sendEmail(emailRequest: EmailShape): void {
    if (this.apiKey) {
      this.emailApi
        .sendTransacEmail(emailRequest)
        .then(function (data) {
          console.log(data)
        })
        .catch(function (error) {
          console.error(error)
        })
    } else {
      console.error('API key is not defined.')
    }
  }
}

export default EmailsController
