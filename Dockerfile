FROM nginx:latest

# Workdir 한줄로 이동되고, 없으면 디렉토리 만들고 이동 or RUN mkdir /app
WORKDIR /app
# 도커컨테이너 접속되어있는 상태입니다.
RUN mkdir ./build
ADD ./build ./build

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
