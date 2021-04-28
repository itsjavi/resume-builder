default: build

install:
	docker-compose run --rm client npm install
	docker-compose run --rm server npm install

up:dev
dev:
	docker-compose up -d
	open http://localhost:4000

down:
	docker-compose down

build:
	cd client && \
		rm -rf ./build ./.next ./out && \
		docker-compose run --rm app npm run build

.PHONY: build dist
