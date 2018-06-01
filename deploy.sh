docker stop user-center-service \
; docker rm user-center-service \
; cd /app/user-center-service \
&& git pull \
&& docker build -t user-center-service . \
&& docker run -e TZ="Asia/Shanghai" -d -p 20001:7001 --name user-center-service \
--mount type=bind,source=/app/config/user-center-service,target=/app/config \
user-center-service