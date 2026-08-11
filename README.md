# Together Run 2026

Frontend oficial da corrida solidária Together Run, realizada pela ADRA em Fortaleza/CE.

## Desenvolvimento

```bash
npm install
npm run dev
```

Para validar uma entrega, execute `npm run lint` e `npm run build`.

## Atualização de conteúdo

O arquivo `src/data.ts` é a fonte única para dados operacionais:

- `LINKS`: inscrição, sites oficiais, Instagram e páginas dos treinões;
- `EVENT`: nome, data, local, distâncias, organizador e programação;
- `CONTACTS`: e-mails e WhatsApp;
- `INSTITUTIONS`: cadastro das instituições beneficiadas;
- `FAQ`: perguntas e respostas;
- `GALLERY`: imagens, textos alternativos e categorias da galeria.

As imagens ficam em `public/assets`. Ao substituir um arquivo mantendo o nome, todas as páginas que o utilizam são atualizadas sem alteração nos componentes.

## Informações oficiais pendentes

Os componentes sinalizam como pendentes, sem inventar conteúdo:

- regulamento oficial e regras de participação;
- categorias detalhadas, idades e regras para a largada Kids e PCD;
- local, data e horários da retirada de kits;
- quantidade mínima e lista de alimentos aceitos;
- protocolo de triagem e divisão dos alimentos;
- detalhes e critérios de premiação;
- endereço, público atendido, contato e descrição completa da Associação Beija-Flor;
- público atendido e confirmação dos detalhes operacionais da ACOLD;
- patrocinadores, apoiadores e respectivos logotipos;
- redes sociais institucionais adicionais.
