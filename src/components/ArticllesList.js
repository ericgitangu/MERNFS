import React from 'react'
import { Link } from "react-router-dom"

const ArticleList  = ({articles}) => (
    <>    
    {articles.map((article, key) => (
        <Link key= {key} to={`/articles/${article.name}`}>
            <h3>{article.title}</h3>
        </Link>            
        ))}
    </>    
)

export default ArticleList