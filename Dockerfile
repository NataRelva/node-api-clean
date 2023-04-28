# Imagem base do Node.js com suporte para TypeScript
FROM node:16 AS build

# Define o diretório de trabalho
WORKDIR /app

RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*


# Copia o arquivo package.json e o yarn.lock para o diretório de trabalho
COPY package.json .
COPY package-lock.json .

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Compila a aplicação TypeScript
RUN npm run build

# Imagem base do Node.js com PM2
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para a imagem final
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/ecosystem.config.js .
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma-prod ./prisma


# Instala o PM2 globalmente
RUN npm --global install pm2

# Expõe a porta 3000
EXPOSE 3000

# Define o comando padrão para a imagem
CMD ["pm2-runtime", "start", "ecosystem.config.js"]