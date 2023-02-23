import { db } from '@/firebase'

class DatabaseService {
  collection

  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }

  getAll = async () => {
    const snapshot = await this.collection.get()
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
  }

  getOne = async ({ queryKey }) => {
    const { id } = queryKey[1]
    if (!id) return
    const snapshot = await this.collection.doc(id).get()
    return snapshot.data()
  }

  getByPropertyValue = async ({ queryKey }) => {
    const { property, value } = queryKey[1]

    const snapshot = await this.collection.where(property, '==', value).get()

    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
  }

  getByPropertyValueList = async ({ queryKey }) => {
    const { property, values } = queryKey[1]

    const snapshot = await this.collection.where(property, 'in', values).get()

    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
  }

  getReference = async (documentReference) => {
    const res = await documentReference.get()
    const data = res.data()

    if (data && documentReference.id) {
      data.uid = documentReference.id
    }

    return data
  }

  create = async (data) => {
    return await this.collection.add(data)
  }

  update = async (id, values) => {
    return await this.collection.doc(id).update(values)
  }

  remove = async (id) => {
    return await this.collection.doc(id).delete()
  }
}

export const PlayerService = new DatabaseService('players')

export const GroupService = new DatabaseService('groups')

export const TieService = new DatabaseService('ties')

export const GameService = new DatabaseService('games')
