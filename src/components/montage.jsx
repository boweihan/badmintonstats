import React from 'react'

function MontargeCard({ image }) {
  return (
    <div className="my-0 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
      <div>
        <figure>
          <img
            src={image}
            className="rounded-t h-72 w-full object-cover object-top"
          />
        </figure>
      </div>
    </div>
  )
}

const players = [
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/badmintonstats-1337.appspot.com/o/profiles%2Fbowei.png?alt=media&token=87e3f5d7-8b0b-4a98-b596-d99fd48f8535',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/badmintonstats-1337.appspot.com/o/profiles%2Fperry.png?alt=media&token=3cac4f26-49c4-48c8-9b59-00d8e3256232',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/badmintonstats-1337.appspot.com/o/profiles%2Fhamza.png?alt=media&token=b4350f92-00d0-4f53-a49d-3115a8f05860',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/badmintonstats-1337.appspot.com/o/profiles%2Fbryan.png?alt=media&token=86de562e-07e5-42fa-9e90-4302140558cc',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/badmintonstats-1337.appspot.com/o/profiles%2Fronnie.png?alt=media&token=9aa5a648-efd4-4c54-87cd-7f20f79da6d1',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/badmintonstats-1337.appspot.com/o/profiles%2Fyifan.png?alt=media&token=11dec7e0-c37d-47bf-ac17-ae97c7371cf5',
  },
]

function Montage() {
  // preload images
  for (const player of players) {
    const imageElement = new Image()
    imageElement.src = player.image
  }

  return (
    <div className="relative grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {players.map((player, index) => {
        return <MontargeCard key={index} image={player.image} />
      })}
    </div>
  )
}

export default Montage
