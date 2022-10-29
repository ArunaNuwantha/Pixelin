import Project from '../../../models/projectModel';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {

  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const project = await Project.findOne({ _id: req.query.id }).populate('pixel_board');
        res.status(200).json(project);
      } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Id." });
      }
      break
    case 'PATCH':
      try {
        const project = await Project.findOne({ _id: req.query.id });
        console.log(req.body);
        project.imageData = req.body.imageData;
        await project.save();
        res.status(200).json(project);
      } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Id." });
      }
      break
    case 'DELETE':
      try {
        const project = await Project.deleteOne({ _id: req.query.id });
        console.log(`project ${req.query.id} is deleted...`);
        res.status(200).json(project);
      } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Id." });
      }
      break
    default:
      res.status(400).json({ success: false });
      break
  }
}
