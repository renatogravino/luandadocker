/**
 * Agenda Controller
 */
let agendaModel = require('../models/AgendaModel');

const create = (req, res, next) => {
  let dt = {};
  dt.nome = req.body.nome;
  dt.telefone = req.body.telefone;

  let model  = new agendaModel(dt);
  let msg = '';
  model.save((err, data)=>{
    if(err){
      console.log('Erro:', err);
      msg = 'Erro: '+ err;
    }
    else {
      console.log('Sucesso', data);
      msg = 'Sucesso' + JSON.stringify(data);
    }
    res.end(msg);
  });
}


const find = (req, res, next) => {
  let msg = '';
  agendaModel.find({}, (err, data)=>{
    if(err){
      console.log(err);
      msg= 'Erro:' + err;
    }
    else {
      console.log('lista:', data);
      msg = 'lista: ' + data;
    }
    res.end(msg);
  });
};


//-------------------
module.exports = {
  create
  , find
  
};