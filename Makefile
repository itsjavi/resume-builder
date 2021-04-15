default: build

install:
	docker-compose run --rm app-dev npm install

up:
	docker-compose up -d app
	open http://localhost:4000

down:
	docker-compose down

dev:
	docker-compose up -d app-dev
	open http://localhost:4000

build:
	rm -rf ./build ./.next ./out
	docker-compose run --rm app-dev npm run build

.PHONY: build dist
