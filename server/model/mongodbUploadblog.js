var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/toolclt';
mongoose.connect(DB_URL);

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    createtime: String,
    content: String
});

var Toolblog = mongoose.model('Toolblog', blogSchema);

module.exports = Toolblog;