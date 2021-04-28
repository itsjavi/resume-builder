FROM node:15 as base
RUN npm install -g npm@7.11.1
WORKDIR /usr/src/app
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"
COPY package*.json ./
RUN npm install
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base as prod
ENV NODE_ENV=production
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
