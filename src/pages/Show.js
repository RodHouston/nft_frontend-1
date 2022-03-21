import { useState, useEffect } from 'react'
import axios from 'axios'
import NftCard from '../components/NftCard'
import Modal from '../components/Modal'
import Collections from '../components/Collections'
import { FcSearch } from 'react-icons/fc';


const ShowNft = (props) => {

  const [nfts, setNfts] = useState([])

  const [toggle1, setToggle1] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("")


  const [name, setName] = useState("");
  const [collection, setCollection] = useState("ANY");


  const getNfts = () => {
    axios.get('https://boiling-island-41564.herokuapp.com/api/nfts')
      .then(
        (response) => setNfts(response.data),
        (error) => console.error(error))
      .catch()
  }

  const show = () => {
    setToggle1((prevState) => !prevState);
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
  // <img src={nft.image} alt="" />
  //
  // <div>Name: {nft.name}</div>
  //
  // <div><h5>Price: {nft.price}</h5></div>
  // <p>Description: {nft.description}</p>
  // <p>Properties: [{nft.properties}]</p>
  // <NftCard nft={nft} />
  // <Edit handleUpdate={handleUpdate} nft={nft} />
  // <button onClick={handleDelete} value={nft.id}>Delete</button>

  return (
    <>


      <h1 className='title'>Looking For An NFT? Check Out Below!</h1>
      <div className="searchBar">
        <input className="inputEdit" placeholder="Search For An NFT Name, Collection, or Property" onChange={event => setQuery(event.target.value)} />

      </div>

      <div className="cardContainer">
        {props.nft.filter(nft => {
          if (query === '') {
            return nft;
          } else if (nft.name.toLowerCase().includes(query.toLowerCase()) || nft.properties.toLowerCase().includes(query.toLowerCase())) {
            return nft;
          }
        }).map((nft) => {
          return (
            <div className="nftBoxHide" key={nft.id}  >
              <NftCard handleUpdate={handleUpdate} nft={nft} />
            </div>)
        })}
      </div>

    </>
  )
};

export default ShowNft;
