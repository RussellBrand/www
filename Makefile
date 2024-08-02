test:
	npm test


./.envrc:
	echo 'PATH_add ${PWD}/.venv/bin' > ./.envrc
	echo 'PATH_add ${PWD}/node_modules/.bin' >> ./.envrc
	direnv allow

upgrade-npm:
	npm i npm

install: ./.envrc
	npm install

.PHONY: test

