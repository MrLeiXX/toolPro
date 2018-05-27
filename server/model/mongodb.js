var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/toolclt';
mongoose.connect(DB_URL);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    passWord: String,
    content: [{
        date: String,
        detail: String
    }]
});

var Tooluser = mongoose.model('Tooluser', userSchema);

module.exports = Tooluser;