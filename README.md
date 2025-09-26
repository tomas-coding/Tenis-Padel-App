# 🎾 Tennis & Padel Club

Una aplicación web moderna para la gestión de reservas de pistas de tenis y pádel, desarrollada con Next.js 15.

## ✨ Características

- 🏆 **Sistema de Reservas**: Reserva pistas de tenis y pádel online
- 🏅 **Torneos**: Participa en torneos regulares
- 👤 **Autenticación**: Sistema de login/registro seguro
- 📱 **Responsive**: Diseño adaptativo para móviles y desktop
- 🎨 **UI Moderna**: Interfaz limpia con Tailwind CSS

## 🚀 Demo

[Ver en vivo](https://tennis-padel-club.vercel.app) (próximamente)

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: JWT + bcrypt
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Credenciales de Prueba

### Usuario Administrador
- **Email**: `admin@tennispadelclub.com`
- **Contraseña**: `admin`

### Usuario Normal
- **Email**: `user@tennispadelclub.com`
- **Contraseña**: `password123`

## 🏃‍♂️ Desarrollo Local

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/tennis-padel-club.git
cd tennis-padel-club
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura variables de entorno**
```bash
cp env.example .env.local
# Edita .env.local con tus valores
```

4. **Ejecuta el servidor de desarrollo**
```bash
npm run dev
```

5. **Abre [http://localhost:3000](http://localhost:3000)**

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Configura las variables de entorno:
   - `JWT_SECRET`: Clave secreta para JWT
   - `JWT_EXPIRES_IN`: `7d`
   - `NODE_ENV`: `production`
3. Deploy automático en cada push

## 📁 Estructura del Proyecto

```
├── app/                 # App Router de Next.js
│   ├── api/            # API Routes
│   ├── bookings/       # Página de reservas
│   ├── tournaments/    # Página de torneos
│   └── login/          # Página de login
├── components/         # Componentes reutilizables
├── hooks/             # Custom hooks
├── lib/               # Utilidades y configuración
├── store/             # Estado global (Zustand)
└── types/             # Definiciones de TypeScript
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para la comunidad de tenis y pádel.
