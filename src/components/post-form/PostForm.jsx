import React, { useCallback, useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../loader/Loader'



function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        } 
    })
    const [isLoading, setIsLoading ] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    console.log(post)

    const submit = async (data) => {
        try{
        setIsLoading(true)
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {...data, featuredImage: file? file.$id : post.featuredImage})
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        }else{
            console.log('here')
            console.log(data)
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                console.log(userData)
                const dbpost = await appwriteService.createPost({...data, userId: userData.userData.$id? userData.userData.$id:  userData.$id})
                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }}catch(e){
            console.error(e)
            setIsLoading(false)
        }
    }
    const slugify = useCallback((title) => {
        if (title && typeof title === 'string') {
            return title
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', slugify(value.title,
                    {shouldValidate: true}
                ))
            }
        })  
        return () => subscription.unsubscribe()

       
    },[watch,slugify,setValue])

    return isLoading? (<Loader text='Posting'/>) :(
        <form onSubmit={handleSubmit(submit)} className='flex flex-col md:flex-row mt-3'>
            <div className='w-full md:w-2/3 px-2 space-y-3'>
                <Input
                    label='Title'
                    placeholder='Enter post title '
                    className='mb-4 px-3 py-2 placeholder:text-[#565656]'
                    {...register('title', {required: true})}
                />
                <Input
                    label='Slug'
                    placeholder='slug'
                    className='mb-4 px-3 py-2 placeholder:text-[#565656]'
                    {...register('slug', {required: true})}
                    onInput={(e) => setValue('slug', 
                        slugify(e.currentTarget.value), 
                        {shouldValidate: true})
                    }
                />
                <RTE
                    label='Content:' name="content" 
                    control={control} defaultValue={getValues('content')}
                />
            </div>
            <div className='w-full mt-8 space-y-2 md:space-y-auto md:mt-0 md:w-1/3 px-2 '>
                <Input
                    label='Featured Image'
                    type='file'
                    className='mb-4 px-3 py-2'
                    accept = "image/*"
                    {...register('image', {required: !post})}
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-xl'
                        />

                    </div>
                )}
                <Select
                    label='Status'
                    options={['active', 'inactive']}
                    className='mb-4'
                    {...register('status', {required: true})}
                />
                <Button
                    type='submit'
                    className='w-full'
                    bgColor={post ? 'bg-green-500' : undefined}
                >
                    {post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>


                
        </form>
    )
}

export default PostForm
