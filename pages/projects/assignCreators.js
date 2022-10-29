import { useState } from 'react'
import Layout from '../../components/Layout';
import { BASE_URL } from '../../lib/constants';
import { assignCreator } from '../../services/projectService';

export default function AssignCreators({ projects, creators }) {

    const [creatorId, setCreatorId] = useState("");
    const [projectId, setProjectId] = useState("");

    const [creator, setCreator] = useState("Select Creator");
    const [project, setProject] = useState("Select Project");

    const submitHandler = async () => {
        console.log("button click");
        console.log(creatorId, projectId);
        try {
            const res = await assignCreator({ creatorId, projectId });
            alert("assigned creator");
        } catch (err) {
            if (err.response.status == 400 || err.response.status == 404)
                console.log(err);
        }
    }

    return (
        <Layout>
            <div className='w-screen h-screen p-10'>
                <div className='flex space-x-4'>
                    <select className='form-select rounded-md' name='creators' id='creators'>
                        {creators.map(c => (
                            <option key={c._id}><button key={c._id} onClick={() => { setCreatorId(c._id); setCreator(c.name); }} >{c.name}</button></option>
                        ))}
                    </select>
                    <select className='form-select rounded-md' name='projects' id='projects'>
                        {projects.map(p => (
                            <option key={p._id}><button key={p._id} className="dropdown-item" onClick={() => { setProjectId(p._id); setProject(p.title); }} >{p.title}</button></option>
                        ))}
                    </select>
                    <div className='col-4'>
                        <button className="bg-primary-0 text-white p-4 rounded-md" onClick={submitHandler} >Assign Project</button>
                    </div>
                </div>
            </div>

        </Layout>
    )
}


AssignCreators.getInitialProps = async (ctx) => {
    const baseUrl = BASE_URL;
    const res = await fetch(`${baseUrl}/api/creators`);
    const creators = await res.json();
    const pres = await fetch(`${baseUrl}/api/projects`);
    const projects = await pres.json();

    return {
        projects: projects,
        creators: creators
    };
}