import Project from '../../../models/projectModel';
import { Pixel } from '../../../models/pixelModel';
import dbConnect from '../../../lib/dbConnect';


function findPixelIndex(pixel_board, pixelId) {
    if (pixel_board.length > 0) {
        for (let i = 0; i < pixel_board.length; i++) {
            if (pixel_board[i]._id.toString() === pixelId) {
                return i;
            }
        }
    }
    return -1;
}

export default async function handler(req, res) {

    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'PATCH':
            try {
                const project = await Project.findOne({ _id: req.body.projectId });
                if (!project) {
                    res.status(400).json({ success: false, message: "invalid project id." });
                }
                // console.log(project);

                const idx = findPixelIndex(project.pixel_board, req.body.pixelId);
                console.log(idx);
                if (idx === -1) {
                    const pixel = new Pixel({ X: req.body.X, Y: req.body.Y, color: req.body.color });
                    project.pixel_board.push(pixel);
                } else {
                    project.pixel_board[idx].color = req.body.color;
                }
                await project.save();
                res.status(200).json({ success: true, message: "pixel color updated" });

                // res.socket.server.io.emit("project", { X: req.body.X, Y: req.body.Y, color: req.body.color });
                res.socket.server.io.emit("pixel", req.body);
            } catch (error) {
                res.status(400).json({ success: false, message: "Invalid pixel id...", error: error.data });
            }
            break
        // case 'PUT':
        //     try {
        //         const project = await Project.findOne({ _id: req.body.projectId });
        //         if (!project) {
        //             res.status(400).json({ success: false, message: "invalid project id." });
        //         }

        //         const idx = findPixelIndex(project.pixel_board, req.body.pixelId);
        //         if (idx === -1) {
        //             const pixel = new Pixel({ X: req.body.X, Y: req.body.Y });
        //             project.pixel_board.push(pixel);
        //             await project.save();
        //             res.status(200).json({ success: true, pixel: pixel });
        //         } else {
        //             project.pixel_board[idx].color = req.body.color;
        //             await project.save();
        //             res.status(200).json({ success: true, message: "pixel color updated" });
        //         }

        //         res.socket.server.io.emit("project", project);
        //         // res.socket.server.io.emit("pixel", req.body);
        //     } catch (error) {
        //         res.status(400).json({ success: false, message: "Invalid pixel id..." });
        //     }
        //     break
        default:
            res.status(400).json({ success: false });
            break
    }
}
