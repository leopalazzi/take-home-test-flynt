# set default shell
SHELL := $(shell which bash)
GROUP_ID = $(shell id -g)
USER_ID = $(shell id -u)
GROUPNAME =  flynt
USERNAME = flynt
HOMEDIR = /home/$(USERNAME)
ENV = /usr/bin/env
DKC = docker-compose
DK = docker
DKC_CFG = -f docker-compose.yml

SRC_DIR=.

GIT_ORGA=goflynt
GIT_ORIGIN_NAME=origin
GIT_RELEASE_HEAD_BRANCH=develop
GIT_RELEASE_BASE_BRANCH=master

FLYNT_WEB_GIT_BRANCH=develop
FLYNT_WEB_WORKDIR=web

FLYNT_API_GIT_BRANCH=develop
FLYNT_API_WORKDIR=api

# default shell options
.SHELLFLAGS = -c

.SILENT: ;			   		# no need for @
.ONESHELL: ;				# recipes execute in same shell
.NOTPARALLEL: ;		  		# wait for this target to finish
.EXPORT_ALL_VARIABLES: ; 	# send all vars to shell
default: help;   			# default target

# - ######## - #
# -  DOCKER  - #
# - ######## - #

ps: ascii-flynt ## Display the status of docker containers, eg: `make ps`
	$(ENV) $(DKC) $(DKC_CFG) ps
.PHONY: ps

up: config volumes ## Start the docker containers, eg: `make up` (optional svc param)
	$(ENV) $(DKC) $(DKC_CFG) up -d ${svc}
	$(MAKE) ps
.PHONY: up

logs: ascii-flynt ## Display logs of containers, eg: `make logs` (optional svc param)
	$(ENV) $(DKC) $(DKC_CFG) logs --tail 200 -f ${svc}
.PHONY: logs

stop: ## Stop the containers, eg: `make stop` (optional svc param)
	$(ENV) $(DKC) $(DKC_CFG) stop ${svc}
	$(MAKE) ps
.PHONY: stop

rm: ## Remove the containers, eg: `make rm` (optional svc param)
	$(ENV) $(DKC) $(DKC_CFG) rm -s ${svc}
.PHONY: rm

exec: ## Open an sh into specified container, eg: `make exec svc=web-dev`
	$(ENV) $(DKC) $(DKC_CFG) exec ${svc} sh
.PHONY: exec

restart: ## Restarts a specific container, eg: `make restart` (optional svc param)
	$(ENV) $(DKC) $(DKC_CFG) restart ${svc}
.PHONY: restart

rmup: ## Remove then start the saas containers, eg: `make rmup`
	$(ENV) $(DKC) $(DKC_CFG) rm -s -f api-dev web-dev
	$(MAKE) up
	$(ENV) $(DKC) $(DKC_CFG) logs --tail 200 -f api-dev
.PHONY: rmup	

# - ######### - #
# -  PROJECT  - #
# - ######### - #

config: ## Copy '.env.dist' files to '.env' files, eg: `make config`
	if [ ! -f .env  ]; then  cp .env.dist .env ; fi
.PHONY: config

volumes: ## Creates volumes for docker 
	$(DK) volume create --name web-dev-node-modules
	$(DK) volume create --name api-dev-node-modules
	$(DK) volume create --name db-dev-data
	$(DK) volume create --name pgadmin-data
.PHONY: volumes

vendor-web: volumes ## Install web's vendors, eg: `make vendor-web`
	$(ENV) $(DKC) $(DKC_CFG) run --rm web-dev npm ci
.PHONY: vendor-web

vendor-api: volumes ## Install api's vendors, eg: `make vendor-api`
	$(ENV) $(DKC) $(DKC_CFG) run --rm api-dev npm ci
.PHONY: vendor-api

vendor: ## Install all repositories' vendors, eg: `make vendor`
	$(MAKE) vendor-web
	$(MAKE) vendor-api
.PHONY: vendor

migration-run: volumes ## Run pending migrations, eg: `make migration-run`
	$(ENV) $(DKC) $(DKC_CFG) run --rm api-dev npm run typeorm migration:run
.PHONY: migration-run

migration-revert: ## Run pending migrations, eg: `make migration-revert`
	$(ENV) $(DKC) $(DKC_CFG) run --rm api-dev npm run typeorm migration:revert
.PHONY: migration-revert

migration-generate: ## Create a new migration, eg: `make migration-generate name="maMigration"`
	$(ENV) $(DKC) $(DKC_CFG) run --rm api-dev npm run typeorm migration:generate -- --name ${name}
.PHONY: migration-generate

clean-db: ## Clean database data
	$(ENV) $(DKC) $(DKC_CFG) rm -s -f db
	$(ENV) $(DK) volume rm db-data
.PHONY: clean-db

# - ###### - #
# -  MISC  - #
# - ###### - #

help: ascii-flynt  ## Display commands help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help

ascii-flynt:
	cat assets/flynt-ascii.txt
.PHONY: ascii-flynt
