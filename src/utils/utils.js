import _ from 'lodash'
import animals from '../const/animals'


export const getAnimalByID = (id) => animals[id]

export const getRandomAnimal = () => animals[_.random(0, animals.length)]

export const getNewAnimalRand = (users) => {
  let newAnimal = getRandomAnimal()

  if (users.length === 0) return newAnimal

  let duplicateAnimal = users.filter(user => {
    console.log('user.name ', user.name )
    console.log('newAnimal.name ', newAnimal.name )

    return user.name === newAnimal.name
  })

  if (duplicateAnimal.length !== 0) {
    getNewAnimal(users)
  }
  else {
    return newAnimal
  }
}

export const getNewAnimal = (users) => {
  let result = false;
  animals.forEach(animal => {
    const animalFound = users.filter(user => user.name === animal.name)

    if (animalFound.length === 0) result = animal
  })
  if (!result) {
    alert('Tout les animaux sont pris 😔')
  }
  else {
    return result;
  }
}

export const findStoredUserByUid = (loggedUser, users) => {
  return (users.filter(user => user.uid === loggedUser))[0]
}

export const getUsers = (base) => (
  base.fetch('users', {
    context: this,
    asArray: true,
  })
)

