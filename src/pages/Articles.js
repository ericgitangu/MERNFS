import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import articleContent from "./article-content"
import ArticlesList from "../components/ArticlesList"
import CommentsList from "../components/CommentsList"
import UpvotesSection from "../components/UpvotesSection"
import AddCommentForm from "../components/AddCommentForm"

export default function Articles() {

    let params = useParams();
    const article = articleContent.find(article => article.name === params.name)
    const otherArticles = articleContent.filter(article => article.name !== params.name);
    const [articleInfo, setArticleInfo] = useState({upvotes:0, comments:[]})

    useEffect(() => {
        const fetchData = async  () => {
            const result = await fetch(`/api/articles/${article?.name}`)
            const body = await result.json()
            console.log(body)
            setArticleInfo(body)
        }
        fetchData()
    },[article?.name])
    return (
        <>
        <h1>{article?.title}</h1>
        <UpvotesSection articleName={params.name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
        <p>This post has been upvoted {articleInfo.upvotes} times</p><br/>
        {article?.content.map((paragraph, key) => (
            <p key = {key}>{paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments} />
        <AddCommentForm articleName={params.name} setArticleInfo={setArticleInfo}/>
        <h3> Other Articles </h3>
        <ArticlesList articles={otherArticles} />
        </>
    )
  }