
Este é um bot desenvolvido em Typescript que utiliza as bibliotecas Sendinblue e Puppeteer para buscar emails e títulos de vagas de emprego em determinados sites e enviar emails automaticamente.

## Requisitos

Certifique-se de ter o seguinte software instalado em seu ambiente de desenvolvimento:

- Node.js
- npm 

## Configuração

Siga as etapas abaixo para configurar e executar o bot:

1. Clone este repositório para o seu ambiente local.

```bash
git clone https://github.com/btsmp/ResumeExpress
```

2. Navegue até o diretório do projeto.

```bash
cd bot-for-jobs
```

3. Instale as dependências do projeto.

```bash
npm install
```


4. Modifique o arquivo `.env.example` com suas variáveis de ambiente


5. Execute o bot.

```bash
npm start
```

O bot buscará automaticamente os emails e títulos das vagas de emprego nos sites configurados e enviará os emails para o endereço de destino especificado.


## Limitações

Este bot foi desenvolvido com fins educacionais e de demonstração. Certifique-se de usar o bot de acordo com os termos de serviço dos sites que está rastreando e enviando emails. Além disso, este bot pode não funcionar corretamente se houver alterações significativas na estrutura dos sites-alvo.

## Contribuição

Contribuições são bem-vindas! Se você quiser adicionar recursos, corrigir bugs ou melhorar a documentação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença Apache 2.0. Consulte o arquivo [LICENSE](https://raw.githubusercontent.com/btsmp/bot-for-jobs/master/LICENSE) para obter mais informações.
