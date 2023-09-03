const { connect, Schema, model, set } = require('mongoose');
const { ChalkAdvanced } = require('chalk-advanced');
set('strictQuery', true);

connect(process.env.DB, {})
  .then(() =>
    console.log(
      `${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green(
        '✅ • Carregado com sucesso [BANCO DE DADOS]',
      )}`,
    ),
  )
  .catch(err =>
    console.log(
      `${ChalkAdvanced.gray('>')} ${ChalkAdvanced.red(
        '❎ • Conexão do banco de dados falhada',
      )}`,
      err,
    ),
  );

const guildSchema = new Schema({
  _id: { type: String, required: true },
  approved: { type: Boolean, default: false },
  roleId: String,
  channelsLockdown: Array,
  channelsAutopublish: Array,
  lockdownTime: Date,
  logs: {
    deletedMessage: String,
    editedMessage: String,
    joinedMember: String,
    leftMember: String,
    punishments: String,
  },
  welcome: {
    active: { type: Boolean, default: false },
    channel: String,
    content: {
      type: String,
      default:
        '{ "content": "Bem-vindo ao nosso servidor %membro, espero que se divirta aqui!" }',
    },
    timeout: { type: Number, default: 0 },
    roles: Array,
  },
  exit: {
    active: { type: Boolean, default: false },
    channel: String,
    content: {
      type: String,
      default: '{ "content": "Adeus %membro, espero que voltemo-nos a ver!" }',
    },
    timeout: { type: Number, default: 0 },
  },
  antifake: {
    active: { type: Boolean, default: false },
    time: { type: Number, default: 7200000 },
    action: { type: String, default: 'Kick' },
    channel: String,
  },
  automessage: [
    {
      _id: String,
      channel: String,
      interval: Number,
    },
  ],
  backup: {
    password: String,
  },
  partner: {
    channel: String,
    message: String,
    role: String,
  },
  partneractivated: { type: Boolean, default: false },
  partnerWarning: {
    activated: { type: Boolean, default: false },
    channel: String,
    message: {
      type: String,
      default: '{ "content": "Obrigado pela parceria %representante!" }',
    },
  },
  rssfeeds: [
    {
      _id: String,
      channel: String,
      message: {
        type: String,
        default: '{ "content": "**%title**\\n%url" }',
      },
      disabled: Boolean,
      lastItem: { type: String, default: '' },
      penultimateItem: { type: String, default: '' },
    },
  ],
  vips: {
    roles: Array,
    registeredVips: [
      {
        _id: String,
        expires: Date,
        roleId: String,
      },
    ],
  },
});

module.exports.Guilds = model('Guilds', guildSchema);
