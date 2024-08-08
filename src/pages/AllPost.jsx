import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { set } from 'react-hook-form'


function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])
    

    return (
        <div className='w-full py-8'> 
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
