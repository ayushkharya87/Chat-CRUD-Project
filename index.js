const express = require("express")
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOverride = require("method-override")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("connection ok!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


// index route
app.get("/chats", async (req, resp) => {
   let chats = await Chat.find();
   console.log(chats);
   resp.render("index.ejs", {chats})
})

// new route
app.get("/chats/new", (req, resp) => {
    resp.render("new.ejs");
})

// create route
app.post("/chats", (req, resp) => {
    let {from, to, msg} = req.body; 
    let newChat = new Chat({
        from:from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save().then((res) => {
        console.log("chat saved");
    }).catch(err => {
        console.log(err);
    });

    resp.redirect("/chats")
});

// edit route
app.get("/chats/:id/edit", async (req, resp) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    resp.render("edit.ejs", { chat });
});

// update route
app.put("/chats/:id", async (req, resp) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true})

    resp.redirect("/chats");
})

// delete route
app.delete("/chats/:id", async (req, resp) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id)
    resp.redirect("/chats");
})


app.get("/", (req, resp) => {
    resp.send("ok")
})

app.listen(8080, () => {
    console.log("server is ok!");
});

