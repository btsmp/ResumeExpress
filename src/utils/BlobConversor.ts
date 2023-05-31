import fs from 'fs'

class BlobConversor {
  async convertFileToBase64Blob(filePath: string): Promise<string> {
    try {
      const data = await fs.promises.readFile(filePath)
      const base64Blob = Buffer.from(data).toString('base64')
      return base64Blob
    } catch (error: any) {
      throw new Error(
        `Erro ao converter o arquivo para Blob base64: ${error.message}`,
      )
    }
  }

  async processConversion(filePath: string): Promise<string> {
    try {
      const base64Blob = await this.convertFileToBase64Blob(filePath)
      return base64Blob
    } catch (error: any) {
      throw new Error(
        `Erro ao converter o arquivo para Blob base64: ${error.message}`,
      )
    }
  }
}

export default BlobConversor
