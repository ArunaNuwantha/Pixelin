import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/projectModel';
import Creator from '../../../models/creatorModel';

export default async function handler (req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
        try{            
            const pid = req.body.projectId;
            const cid = req.body.creatorId;
            const project = await Project.findOne({_id: pid});
            if (!project){
                res.status(400).json({ success: false, message: "Invalid Id."});    
            }
            if (project.creator_ids.includes(cid)){
                res.status(400).json({ success: false, message: "Already assign this creator to this project."}); 
            }
            const creator = await Creator.findOne({_id: cid});
            if (!creator){
                res.status(400).json({ success: false, message: "Invalid Id."});    
            }
            if (creator.project_ids.includes(pid)){
                res.status(400).json({ success: false, message: "Already assign this project to this creator."}); 
            }
            project.creator_ids.push(cid);
            await project.save();
            creator.project_ids.push(pid);
            await  creator.save();
            res.status(200).json({success: true, message: "assigned creator."});
        } catch (error){
            res.status(400).json({success: false, message: "Invalid pixel id..."});
        }
        break
    default:
        res.status(400).json({ success: false });
        break
  }
}
