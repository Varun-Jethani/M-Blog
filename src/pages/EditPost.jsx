import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    // const [post, setPost] = useState(null)
    // const {slug} = useParams()
    const post = useLoaderData()
    
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (slug){
    //         appwriteService.getPost(slug).then((poste) => {
    //             if (poste) {
    //                 console.log(poste)
    //                 setPost(poste)
    //                 console.log(post)
    //             }else{
    //                 navigate('/404')
    //             }
    //         })
    //     }
    // }, [slug, navigate])

    return post? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ): null
}

export default EditPost


