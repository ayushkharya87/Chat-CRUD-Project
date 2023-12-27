const mongoose = require('mongoose');
const Chat = require("./models/chat.js")

main().then(() => {
    console.log("connection ok!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


let allChats = [
    {
        from: "ayush",
        to: "john",
        msg: "send your CV",
        created_at: new Date()
    },
    {
        from: "aman",
        to: "ashu",
        msg: "complete this task",
        created_at: new Date()
    },
    {
        from: "naman",
        to: "tony",
        msg: "apply this job",
        created_at: new Date()
    },
    {
        from: "peter",
        to: "abc",
        msg: "come here",
        created_at: new Date()
    },
]

Chat.insertMany(allChats);

