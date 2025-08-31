# ===== DOCKERFILE PARA FRONTEND =====
# Etapa de construcción (multi-stage build)
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# ===== ETAPA DE PRODUCCIÓN =====
# Imagen base: Nginx Alpine (servidor web ligero)
FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
