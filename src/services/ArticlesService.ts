import { ArticleModel } from "@/models/ArticleModel"

export class ArticlesService {
    private axios = require('axios');

    public async getAllArticles(): Promise<ArticleModel[]> {
        return (await this.axios('http://localhost:8000/articles/?format=json')).data;
    }
}