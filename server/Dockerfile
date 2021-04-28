FROM node:15 as base
RUN npm install -g npm@7.10.0
WORKDIR /usr/src/app
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"
COPY package*.json ./
RUN npm install
EXPOSE 3007

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "start"]

FROM base as prod
ENV NODE_ENV=production
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
