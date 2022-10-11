up:
	docker compose up

down:
	docker compose down --remove-orphans

stop:
	docker compose stop

build:
	docker compose build

admin:
	docker compose run backend python manage.py createsuperuser

migrations:
	docker compose run backend python manage.py makemigrations

migrate:
	docker compose run backend python manage.py migrate