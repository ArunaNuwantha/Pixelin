import dbConnect from '../../../lib/dbConnect';
import Creator from '../../../models/creatorModel';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const creators = await Creator.find({});
        res.status(200).json(creators);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break
    case 'POST':
      try {

        let isUserAvailable = await Creator.findOne({ email: req.body.email });
        if (isUserAvailable) {
          return res.status(201).json({ message: "email already registered" });
        }

        const creator = new Creator({ name: req.body.name, email: req.body.email, imageUrl: req.body.image });
        await creator.save()
          .then(console.log("creator saved."))
          .catch((e) => console.log("error: " + e));
        return res.status(201).json({ success: true, data: creator });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break
    default:
      res.status(400).json({ success: false });
      break
  }
}
