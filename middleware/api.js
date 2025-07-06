require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Importar el módulo path

// Configuración de la base de datos
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importación de rutas con manejo de errores
try {
  const authRoutes = require('./routes/auth');
  const buildRoutes = require('./routes/builds');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/builds', buildRoutes);
} catch (error) {
  console.error('❌ Error al cargar las rutas:', error);
  process.exit(1);
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 API del Proyecto Final 1.0 funcionando');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('⚠️ Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌍 Servidor corriendo en http://localhost:${PORT}`);
});