import React from "react"
import ArticleContent from "./article-content"
import ArticleList from "../components/ArticllesList"

const ArticlesListPage = () => (
        <>    
        <h1> Articles Titles </h1>
        <ArticleList articles={ArticleContent} />
        </>
)
export default ArticlesListPage
