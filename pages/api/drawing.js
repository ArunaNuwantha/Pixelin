
export default async function handler(req, res) {

    const { method } = req;

    switch (method) {
        case 'PATCH':
            try {
                // console.log(req.body);
                res.socket.server.io.emit("image", req.body.image);
                res.status(200).json({ message: "image updated" });
                return;
            } catch (error) {
                res.status(400).json({ success: false, message: "Invalid pixel id...", error: error.data });
            }
            break

        default:
            res.status(400).json({ success: false });
            break
    }
}
