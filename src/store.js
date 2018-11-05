import RemoteStorage from 'remotestoragejs'
import nanoid from 'nanoid'

const storage = new RemoteStorage({
  // logging: true
})

// Set read/write on the "notes" namespace
storage.access.claim('notes', 'rw')

// Events
storage.on('connected', () => {
  const userAddress = storage.remote.userAddress
  console.debug(`${userAddress} connected their remote storage.`)
})

storage.on('network-offline', () => {
  console.debug(`We're offline now.`)
})

storage.on('network-online', () => {
  console.debug('network online')
})

// Custom module for remotestorage.js
const Notes = {
  name: 'notes',
  builder(privateClient, publicClient) {
    privateClient.declareType('note', {
      type: 'object',
      properties: {
        id: {type: 'string'},
        title: {type: 'string'},
        content: {type: 'string'}
      },
      required: ['title']
    })
    return {
      exports: {
        getLatest() {
          return privateClient.getAll('').then(notes => {
            var arr = Object.keys(notes)
            var id = arr[arr.length - 1]
            return notes[id]
          })
        },
        save(title, content, id) {
          console.log(id ? 'UPDATE' : 'CREATE', title)
          if (!id) id = nanoid()
					if (!content) content = '' // content can't be undefined
          let note = {id, title, content}
          return privateClient.storeObject('note', id, note)
            .then(() => note)
            .catch(err => console.log(err))
        },
      }
    }
  }
}

storage.addModule(Notes)

export function saveNote(title, content, id) {
  return storage.notes.save(...arguments)
}

export function findNote(id) {
  const client = storage.scope('/notes/')
  return client.getObject(id)
}

export async function findAll() {
  const client = storage.scope('/notes/')
  const notes = await client.getAll()
  // Convert to array.
  return Object.keys(notes).map(key => {
    return {
      id: key,
      title: notes[key].title,
      content: notes[key].content
    }
  })
}

export default storage
