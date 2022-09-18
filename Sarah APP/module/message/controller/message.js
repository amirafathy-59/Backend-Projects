const messageModel = require("../../../DB/model/Message");
const userModel = require("../../../DB/model/User");


const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;// recieverId
        const messageBody = req.body.messageBody
        const { senderId } = req.query
        const user = await userModel.findById(id).select('name')// return null or object
        if (!user) {
            res.json({ message: "in-valid reciever account id" })
        } else {
            if (senderId) {// to check that user is exist or not
                const senderUser = await userModel.findById(senderId);
                if (senderUser) {

                    const message = await messageModel.insertMany({ messageBody, reciverId: user._id, senderId });
                    const User= await userModel.findByIdAndUpdate({_id:id},{$push:{messagesArray:message[0]._id}},{new:true})
                    res.json({ message: "Done", User })
                } else {
                    res.json({ message: "invalid - login user" })
                }
            } else {// if user is a guest 

                const message = await messageModel.insertMany({ messageBody, reciverId: user._id })
                res.json({ message: "Done", message })
            }

        }
    } catch (error) {

    }

}


const messageList = async (req, res) => {
    try {
        const messages = await messageModel.find({ reciverId: req.user._id }).select("-senderId")
        res.json({ message: "Done", messages })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}
const messageByMeList = async (req, res) => {
    try {
        const messages = await messageModel.find({ senderId: req.user._id }).populate([{
            path: "reciverId",
            select: "name email"
        }, {
            path: "senderId",
            select: "name email"
        }])
        res.json({ message: "Done", messages })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}
const deleteMessage = async (req, res) => { // reciver can do this
    try {
        const message = await messageModel.deleteOne({ reciverId: req.user._id,_id:req.params.id })
        
        const User= await userModel.findByIdAndDelete({_id:id},{$pull:{messagesArray:message[0]._id}},{new:true})
        if (message.deletedCount) {
            
        res.json({ message: "Done, message deleted", message })
        } else {
            
        res.json({ message: "in-valid message id or you not authorized " })
        }
    }

     catch (error) {
        res.json({ message: "catch error", error })
    }
}
module.exports = {
    sendMessage,
    messageList,
    messageByMeList,
    deleteMessage
}