const userModel = require("../../../DB/model/User")

const profile = async (req, res) => {
    try {
        console.log({ userAuthData: req.user })

        const user = await userModel.findById(req.user._id);

        res.json({ message: "Done", user })
    } catch (error) {

        res.json({ message: "catch error", error })
    }
}


const updateProfilePic = async (req, res) => {
    // console.log({
    //     file: req.file,
    //     fileValidation: req.fileValidation
    // });

    if (req.fileValidation) {
        res.json({ message: "in-valid file format" })
    } else {
        // const imageUrl = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`
        const imageUrl = `${req.destinationFile}/${req.file.filename}`
        const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { profilePic: imageUrl }, { new: true })
        res.json({ message: "Done" })
    }


}




const updateProfileCoverPic = async (req, res) => {
    console.log({
        files: req.files,
        fileValidation: req.fileValidation
    });



    if (req.fileValidation) {
        res.json({ message: "in-valid file format" })
    } else {
        const imageUrls = []
        for (let i = 0; i < req.files.length; i++) {
            imageUrls.push(`${req.destinationFile}/${req.files[i].filename}`)
        }
        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { coverPic: imageUrls }, { new: true })
        res.json({ message: "Done", user })
    }
}

module.exports = {
    profile,
  updateProfilePic,
  updateProfileCoverPic,
}