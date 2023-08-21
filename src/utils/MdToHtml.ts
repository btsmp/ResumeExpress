import fs from 'fs'
import MarkdownIt from 'markdown-it'
import path from 'path'

const md = new MarkdownIt()
const filePath = path.join(__dirname, '../assets/content.md')

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.log('erro ao ler arquivo .md -->' + err)
  }
  const html = md.render(data)
  console.log(html)
})
