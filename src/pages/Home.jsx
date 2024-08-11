import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { Link, useLoaderData } from 'react-router-dom'
import { Query } from 'appwrite'

function Home() {
    // const [posts, setPosts] = useState([])
    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //         }
    //     })
    // },[])
    const posts = useLoaderData();

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 h-full mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full flex flex-col items-center'>
                            <Link to={'/login'}>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read posts
                            </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-4'>
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

export default Home

export const homeloader = async () => {
    try{
    const response = await appwriteService.getPosts()
    const posts = response.documents
    return posts
    }catch(e){
        console.log(e)
        return []
    }
}
