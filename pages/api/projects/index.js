import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/projectModel';
import { Pixel } from '../../../models/pixelModel';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find({});
        res.status(200).json(projects);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break
    case 'POST':
      try {
        const width = parseInt(req.body.width);
        const height = parseInt(req.body.height);
        const project = new Project({ title: req.body.title, height: height, width: width, pixel_board: [] });
        await project.save();
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break
    default:
      res.status(400).json({ success: false });
      break
  }
}
