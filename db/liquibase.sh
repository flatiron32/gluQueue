#!/bin/bash
set -ev

cd db

if [ "${SCORE_DB_URL}" = "" ]; then
  SCORE_DB_URL="jdbc:mysql://localhost:13306/score"
fi

if [ "${SCORE_DB_USERNAME}" = "" ]; then
  SCORE_DB_USERNAME="root"
fi

java -jar liquibase.jar --username=${SCORE_DB_USERNAME} --url=${SCORE_DB_URL} update
