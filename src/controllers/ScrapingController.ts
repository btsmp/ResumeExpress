import puppeteer from 'puppeteer'
import fs from 'fs'
interface Jobs {
  title: string | null
  email: string
}
class ScrapingController {
  private saveJsonFile(jobList: Jobs[]): void {
    const jsonContent = JSON.stringify(jobList, null, 2)
    fs.writeFile('jobs.json', jsonContent, (err) => {
      if (err) {
        console.error('Ocorreu um erro ao salvar o arquivo JSON:', err)
      } else {
        console.log('Lista de vagas salva com sucesso em jobs.json')
      }
    })
  }

  public async getJobs(): Promise<Jobs[]> {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto('https://advancerh.com.br/vagas.php')
    const jobs = await page.evaluate(() => {
      const jobList: Jobs[] = []

      const jobElements = document.querySelectorAll('.container > .card-body')

      jobElements.forEach((element) => {
        const title = element.querySelector('h5')?.textContent as string | null
        const emailElement = element.querySelector('h6 a')
        const email = emailElement
          ? (emailElement.textContent as string)
          : 'false'

        jobList.push({ title, email })
      })

      return jobList
    })

    await browser.close()
    this.saveJsonFile(jobs)

    return jobs
  }
}

export default ScrapingController
