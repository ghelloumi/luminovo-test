import React, {useEffect, useState} from "react";
import {ProjectType} from "./common/types/ProjectType";
import {addUniqueId} from "./common/utils";
import {AppService} from "./services/app.service";
import {Filters} from "./components/organisms/Filters";
import {ProjectsList} from "./components/molecules/ProjectsList";
import {Loader} from "./components/atoms/Loader";

function App() {
    // Hooks
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [initialProjects, setInitialProjects] = useState<ProjectType[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [noProject, setNoProject] = useState<boolean>(false);

    // Service
    const appService = new AppService()

    // Specify that API is called once on page load
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const projectsFromServer = await appService.fetchProjects();
                const projectsList = projectsFromServer && addUniqueId(projectsFromServer.data)
                setProjects(projectsList);
                setInitialProjects(projectsList)
            } catch (e) {
                console.error(e)
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, []);

    // If there is an error loading data
    if (error) {
        return (
            <div>Error...</div>
        )
    }

    // If data is loading from server
    if (loading) {
        return (
            <Loader/>
        )
    }

    // render App
    return (
        <div>
            <Filters setProjects={setProjects} initialProjects={initialProjects} setNoProject={setNoProject}/>
            {noProject ? <div>No project was found...</div> : <ProjectsList projects={projects}/>}
        </div>
    );
}

export default App;
