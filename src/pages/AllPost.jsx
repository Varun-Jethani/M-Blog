import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { set } from 'react-hook-form'
import { useLoaderData } from 'react-router-dom'
import { Query } from 'appwrite'



function AllPost() {
    // const [posts, setPosts] = useState([])

    const posts = useLoaderData()


    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //         }
    //     })
    // },[])
    

    return (
        <div className='w-full lg:h-3/4 py-8'> 
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-4 '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-5/6 self-center justify-self-center'>
                            <PostCard key={post.$id} {...post} />
                        </div>
                        
                    ))} 
                </div>  
            </Container>
        </div>
    )
}

export default AllPost

export const postsloader = async ({params}) => {
    const {userid} = params; 
    const response = await appwriteService.getPosts([Query.equal('userid', userid )])
    const posts = response.documents
    return posts
}
