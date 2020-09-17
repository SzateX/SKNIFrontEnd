import { ProjectModel } from '@/models/ProjectModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import axios from '../axios';

export class ProjectsService {
    private readMoreGuard = '---readmore---';

    public async getAllProjects(): Promise<ProjectModel[]> {
        return (await axios('api/project/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProject(projectNumber: number, removeReadMore: boolean = true): Promise<ProjectModel> {
        const project = (await axios('api/project/' + projectNumber, {
            params: {
                format: 'json',
            },
        })).data;

        if (removeReadMore) {
            const readMoreIndex = project.text.indexOf(this.readMoreGuard);
            if (readMoreIndex !== -1) {
                project.text = project.text.replace(this.readMoreGuard, '');
            }
        }

        return project;
    }

    public async getProjectsByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<ProjectModel>> {
        const data = (await axios('api/project/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ProjectModel>;
        return data;
    }

}
