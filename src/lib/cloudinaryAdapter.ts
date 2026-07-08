import { v2 as cloudinary } from 'cloudinary'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const cloudinaryAdapter = (options?: { folder?: string }): Adapter => {
  const folder = options?.folder || 'goni-media'

  return ({ collection }) => {
    return {
      name: 'cloudinary',
      handleUpload: async ({ file, data }) => {
        return new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder,
              public_id: file.filename.replace(/\.[^/.]+$/, ''),
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error)
                reject(error)
              } else {
                if (file.filename === data.filename) {
                  resolve({
                    cloudinaryPublicId: result?.public_id,
                  })
                } else {
                  resolve()
                }
              }
            }
          )
          uploadStream.end(file.buffer)
        })
      },
      handleDelete: async ({ doc }) => {
        const publicId = (doc as any).cloudinaryPublicId
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId)
          } catch (error) {
            console.error('Cloudinary delete error:', error)
          }
        }
      },
      generateURL: ({ filename }) => {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME
        return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${filename}`
      },
      staticHandler: () => {
        return new Response('Not implemented', { status: 501 })
      },
      fields: [
        {
          name: 'cloudinaryPublicId',
          type: 'text',
          admin: {
            readOnly: true,
            position: 'sidebar',
          },
        },
      ],
    }
  }
}
