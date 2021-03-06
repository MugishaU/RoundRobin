#!/usr/bin/env bash

zip -r RoundRobin.zip . -x "update-lambda.sh" -x ".*" -x "package*" -x "README.md"

aws lambda update-function-code --function-name round-robin --zip-file fileb://RoundRobin.zip

TRIES=20
STATE=$(aws lambda get-function --function-name round-robin --query 'Configuration.LastUpdateStatus' | jq -r)
echo "STATE: $STATE"
while [ "$STATE" != "Successful" ]
do
  echo "Waiting for lambda to update..."
  sleep 5
  STATE=$(aws lambda get-function --function-name round-robin --query 'Configuration.LastUpdateStatus' | jq -r)
  echo "STATE: $STATE"
  let TRIES-=1
  if [ $TRIES -le 0 ]
  then
    echo "Breaking, this took too long"
    exit 1
  fi
done

rm RoundRobin.zip