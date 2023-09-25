#!/bin/bash

# Instale as dependências
npm install

# Construa o projeto React
npm run build

# Crie o arquivo .tgz
npm pack

# Mova o arquivo .tgz para um local onde o GitHub possa acessá-lo
mv meu-orcamento-online-*.tgz ./build
