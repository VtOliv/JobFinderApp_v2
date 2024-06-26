# Ferramenta de Busca do Primeiro Emprego

Este é um aplicativo React Native desenvolvido para ajudar os usuários a encontrarem seu primeiro emprego. O aplicativo fornece uma interface amigável para os usuários pesquisarem por oportunidades de emprego, criar perfis e se candidatarem a vagas disponíveis.

## Time de desenvolvimento
| NOME                  | RA           |
| ----------------------| ------------ |
| VITOR DE OLIVEIRA (SM)| 202202149021 |
| ANDERSON              | 202202149802 |
| VICTOR SANTOS         | 202203450352 |
| GUILHERME GOMES       | 202202149926 |
| FABIO FIALHO          | 202201069767 |


## Tecnologias utilizadas
| TIPO                  | ESCOLHA             |
| ----------------------| ------------------- |
| DATABASE              | MONGODB - NOSQL     |
| BIBLIOTECA NATIVA     | REACT NATIVE - EXPO |
| BACKEND               | JAVA + SPRING BOOT  |
| FERRAMENTA SCRUM      | JIRA                |



## Instalação

Para executar o aplicativo localmente, siga estas etapas:

1. Certifique-se de ter o ambiente de desenvolvimento React Native configurado em sua máquina. Você pode encontrar instruções para configurar o ambiente [aqui](https://reactnative.dev/docs/environment-setup).

2. Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

3. Navegue até o diretório do projeto:

    ```bash
    cd nome-do-repositorio
    ```

4. Instale as dependências do projeto:

    ```bash
    npm install
    ```

5. Execute o aplicativo no emulador ou dispositivo:

    ```bash
    npx react-native run-android
    # ou
    npx react-native run-ios
    ```

## Escolhas de tecnogias


Database - MongoDB
Foi escolhido a plataforma MongoDB como base para persistência de dados do nosso App pelos seguintes motivos:
- O MongoDB oferece uma instância limitada em cloud para uso pessoal ou estudos
- Os bancos NoSQL tem uma performance superior em aplicações simples ou de baixa complexidade
- Mesmo sem ter relacionamentos nativos por ser NoSQL, ainda é possível fazer relacionamentos diretamente no código
- O MongoDB armazena dados em JSON, o que facilita a extração para testes mock ( sem backend e database )

Backend - Java + SpringBoot
Foi escolhido como backend Java + SpringBoot pelos seguintes motivos:
- O Java com o spring oferece todas as ferramentas para se fazer um sistema API Rest
- A integração do Java com o MongoDB é simples e muito completa, sendo possivel fazer de forma simples de consultas até filtros por query via código
- Todo o time ja estudou Java anteriormente, então era a linguagem que todos tinham um conhecimento em comum

Ferramenta Scrum - Jira
Foi escolhido o Jira para acompanhamento do scrum pelos seguintes motivos:
- O Jira é uma ferramenta de Scrum muito conceituada no mercado e muito completa
- O Jira oferece toda a estrutura de backlog e quadro de sprint pré-montados, sendo necessário somente ajustá-lo a sua necessidade
- O Jira tem suporte para fazer acompanhamento da sprint desde o poker planner até as métricas de cada sprint.


## Diagrama de fluxo

Diagrama que visa mostrar os possíveis fluxos de navegação do usuário

![](assets/JobFinderDiagram.jpg)

## Uso

O aplicativo "Ferramenta de Busca do Primeiro Emprego" é destinado a pessoas que estão procurando seu primeiro emprego. Aqui estão algumas das principais funcionalidades e usos do aplicativo:

### Para quem busca emprego :

- **Cadastro simplificado**: Os usuários poderão se cadastrar informando poucos dados , podendo opcionalmente complementar com mais dados após o processo.

![](assets/cadastro.jpg)

![](assets/login.jpg)

- **Pesquisa de Vagas**: Os usuários podem pesquisar por vagas de emprego filtrando por cargo, empresa ou horário.

![](assets/listadevagas.jpg)
  
- **Criação de Perfil**: Os usuários podem criar perfis pessoais onde podem adicionar suas informações de contato, habilidades e experiências.

![](assets/perfil.jpg)

### Para quem oferece emprego :

- **Cadastro de Vagas**: Os recrutadores podem cadastrar suas respectivas vagas por meio do app de forma rápida e simples.

![](assets/cadastrodevaga.jpg)

## Perguntas Frequentes

### Como posso atualizar meu perfil?

Para atualizar seu perfil, faça login no aplicativo e vá para a seção "Meu Perfil". Lá você terá a opção de editar suas informações, adicionar novas habilidades ou experiências.

### Como faço para me candidatar a uma vaga?

Para se candidatar a uma vaga, pesquise por vagas disponíveis, clique na vaga desejada e selecione a opção "Candidatar-se". Você será direcionado a uma página onde poderá enviar seu currículo e carta de apresentação.

### Posso acompanhar minha candidatura?

Sim, o aplicativo oferece a visão do status da sua candidatura e também dispara emails para avisar cada mudança ocorrida no status.

---

Esperamos que este aplicativo seja útil para você na busca pelo seu primeiro emprego! Se tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma issue neste repositório.
