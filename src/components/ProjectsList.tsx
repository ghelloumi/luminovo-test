import React from "react";
import {ProjectCard} from "./ProjectCard";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../common/types/ProjectType";

interface ProjectsListProps {
    projects: Array<ProjectType>;
}

const useProjectsListStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});

export const ProjectsList: React.FC<ProjectsListProps> = ({projects}) => {
    const classes = useProjectsListStyles();
    return (
        <div className={classes.container}>
            {projects.map((project: ProjectType) => (
                <ProjectCard
                    key={project.uniqueId}
                    date={project.creationDate}
                    name={project.projectName}
                    status={project.status}
                />
            ))}
        </div>
    );
};