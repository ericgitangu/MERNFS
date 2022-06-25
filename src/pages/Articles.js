import { useParams } from "react-router-dom";
import articleContent from "./article-content"

export default function Articles() {
    let params = useParams();
    const article = articleContent.find(article => article.name === params.name)

    return (
        <>
        <h1>{article?.title}</h1>
        {article?.content.map((paragraph, key) => (
            <p key = {key}>{paragraph}</p>
        ))}
        </>
    )
  }