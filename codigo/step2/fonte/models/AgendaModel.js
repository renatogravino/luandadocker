let mongoose = require('mongoose');

let localdb = process.env.MONGO_URL || 'localhost';
let strConnect = `mongodb://${localdb}/luanda`;

mongoose.connect(strConnect, { useNewUrlParser: true })
  .catch(error => console.error('Erro na conexão', error));

// pega conexão
let db = mongoose.connection;

db.on('error',function(err){
  console.log('MongoDB erro na conexão', err);
});

db.on('open', function(){
  console.log('MongoDB aberta');
});

db.on('connected', function(){
  console.log('MongoDB conectado');
});

db.on('disconnected',function(){
   console.log('MongoDB desconectou');
});

db.on('close', function(){
  console.log('MongoDB encerrou conexão')
});

let Schema = mongoose.Schema;

let AgendaSchema = new Schema({
  nome : { type: String, default: '', required: true }
  , telefone : { type: String, default: '', required: true }
});

module.exports = mongoose.model('Agenda', AgendaSchema);
