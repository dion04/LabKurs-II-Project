const { Upload } = require('@aws-sdk/lib-storage')
const { S3Client } = require('@aws-sdk/client-s3')
const Transform = require('stream').Transform
const { formidable } = require('formidable')
const path = require('path')

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.S3_REGION
const Bucket = process.env.S3_BUCKET

const getMimeType = (filename) => {
  const ext = path.extname(filename).toLowerCase()
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx':
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

const parsefile = async (req) => {
  return new Promise((resolve, reject) => {
    let options = {
      maxFileSize: 100 * 1024 * 1024,
      allowEmptyFiles: false
    }

    const form = formidable(options)
    let formFields = {}
    let uploadResult = null

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }

      formFields = fields
      console.log(
        'Raw formFields from parser:',
        JSON.stringify(formFields, null, 2)
      )
    })

    form.on('error', (error) => {
      reject(error.message)
    })

    form.on('data', (data) => {
      if (data.name === 'complete') {
        const response = {
          ...data.value,
          url: data.value.Location,
          fields: formFields
        }
        resolve(response)
      }
    })

    form.on('fileBegin', (formName, file) => {
      file.open = async function () {
        this._writeStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk)
          }
        })

        this._writeStream.on('error', (e) => {
          form.emit('error', e)
        })

        const key = `${Date.now().toString()}-${this.originalFilename}`
        const contentType = getMimeType(this.originalFilename)

        new Upload({
          client: new S3Client({
            credentials: {
              accessKeyId,
              secretAccessKey
            },
            region
          }),
          params: {
            ACL: 'public-read',
            Bucket,
            Key: `${Date.now().toString()}-${this.originalFilename}`,
            Body: this._writeStream,
            ContentType: contentType
          },
          tags: [],
          queueSize: 4,
          partSize: 1024 * 1024 * 5,
          leavePartsOnError: false
        })
          .done()
          .then((data) => {
            form.emit('data', { name: 'complete', value: data })
          })
          .catch((err) => {
            form.emit('error', err)
          })
      }

      file.end = function (cb) {
        this._writeStream.on('finish', () => {
          this.emit('end')
          cb()
        })
        this._writeStream.end()
      }
    })
  })
}

module.exports = parsefile
