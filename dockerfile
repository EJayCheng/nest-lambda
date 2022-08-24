FROM public.ecr.aws/lambda/nodejs:16

ARG FUNCTION_DIR="/var/task"

ENV TZ=Asia/Taipei

WORKDIR ${FUNCTION_DIR}

COPY package.json package-lock.json ./dist  ${FUNCTION_DIR}

RUN npm install --omit=dev
