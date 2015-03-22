#!/usr/bin/env bash
ids=(550daa643340f578180e9906 550daa643340f578180e9907 550daa643340f578180e9908 550daa643340f578180e9909 550daa643340f578180e990a 550daa643340f578180e990b 550daa643340f578180e990c 550daa643340f578180e990d 550daa643340f578180e990e 550daa643340f578180e990f 550daa643340f578180e9911 550daa643340f578180e9914 550daa643340f578180e9916 550daa643340f578180e9917 550daa643340f578180e9918 550daa643340f578180e9919 550daa643340f578180e991a 550daa643340f578180e991b 550daa643340f578180e991c 550daa643340f578180e991e 550daa643340f578180e991f)

I=0
for id in ${ids[*]}
do
  I=`expr $I + 1`
  curl -o "$I.yml" "https://xplatform.org/api/recordings/$id/annotations" -H 'Cookie: xplatform.sid=s%3AOsagypqR8JEs6-uX68ERufd2.XPnjisbhfV1BO%2F0eKO%2BSoGb50Uplaw8S1tLdUuWq8zI; test.xplatform.sid=s%3AFx4TPZKo_1NKKqwxCGU4c089.Buu3VAJuZorAmOrsFU8bc6P%2FA258Dc4NkjoTsB%2BWIzw; connect.sid=s%3AH0bhCmm7eokcGzdwrLRE6Sj-rHJ27TeF.oEpqkbMnatFX6gtqUSymXlamPy%2Bm9wzFXLR9RrWoMBs; _ga=GA1.2.1454691430.1416173658' -H 'Connection: keep-alive' 
  #wget https://xplatform.org/api/recordings/$id/annotations -O $I.yml --load-cookies cookies.txt
done

