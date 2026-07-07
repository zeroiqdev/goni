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
        return new Promise<void>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder,
              public_id: data.filename?.replace(/\.[^/.]+$/, '') || data.id,
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error)
                reject(error)
              } else {
                // Update the file data so that Payload stores these fields in the database
                data.url = result?.secure_url
                data.cloudinaryPublicId = result?.public_id
                resolve()
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
      generateURL: ({ data }) => {
        return data.url
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
