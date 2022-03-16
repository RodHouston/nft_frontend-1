import { useState, useEffect } from 'react'
import axios from 'axios'
import Edit from '../components/EditNft'
import NftCard from '../components/NftCard'


export const ShowNft = () => {

  const [nfts, setNfts] = useState([])

  const [toggle, setToggle] = useState(false);

  const getNfts = () => {
    axios.get('https://boiling-island-41564.herokuapp.com/api/nfts')
      .then(
        (response) => setNfts(response.data),
        (error) => console.error(error))
      .catch()

  }



     const show = () => {
       setToggle((prevState) => !prevState);
     }







    const handleCreate = (addNft) => {
      axios.post('https://boiling-island-41564.herokuapp.com/api/nfts', addNft)
        .then((response) => {
          console.log(response);
          setNfts([...nfts, response.data])
        })
    }

    const handleDelete = (e) => {
      axios.delete('https://boiling-island-41564.herokuapp.com/api/nfts/' + e.target.value)
        .then((response) => {
          getNfts()
        })
    }

    const handleUpdate = (editNft) => {
      axios.put('https://boiling-island-41564.herokuapp.com/api/nfts/' + editNft.id, editNft)
        .then((response) => {
          setNfts(nfts.map((nft) => {
            return nft.id !== editNft.id ? nft : editNft
          }))
        })
    }



  useEffect(() => {
    getNfts()

  }, [])

  return (
    <>
    <h1>Show NFTs</h1>


    {nfts.map((nft) => {
      return (


        <div key={nft.id} style={{ width: '18rem' }}>
          <div>

            <div className="nft" >
              <img src={nft.image} alt="" />

              <div>Name: {nft.name}</div>

              <div><h5>Price: {nft.price}</h5></div>
              <p>Description: {nft.description}</p>
              <p>Properties: [{nft.properties}]</p>
              <NftCard nft={nft} />
              <Edit handleUpdate={handleUpdate} nft={nft} />
              <button onClick={handleDelete} value={nft.id}>Delete</button>
            </div>
          </div>
        </div>
      )
    })}
    </>
  )
};