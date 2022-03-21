import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collections from '../components/Collections'



const Add = (props) => {

  const [nftImage, setNftImage] = useState('../dfNft.jpeg')

  let emptyNft = { ...props.nft }
  const [nft, setNft] = useState(emptyNft)

  const handleChange = (e) => {
      setNft({ ...nft, [e.target.name]: e.target.value })
  }
  const handleImage = (event) => {
    setNftImage(event.target.value)
    setNft({ ...nft, [event.target.name]: event.target.value })
  }
  const handleSubmit = (e) => {
      e.preventDefault()
      props.handleCreate(nft)
  }


  return (

    <div className='addFormDiv'>
    <img className='addnftPre' src={nftImage} alt="" />
      <form className='formEdit' onSubmit={handleSubmit}>
      <div className='pairs'>
        <div className='pair1'>
          <label htmlFor='name'>Name:</label>
          <input className="inputEdit" type='text' name='name' onChange={handleChange} value={nft.name} />
        </div>
        <div className='pair1'>
          <label htmlFor='image'>Image URL:</label>
          <input className="inputEdit" type='text' name='image' onChange={handleImage} value={nft.image} />
        </div>
        </div>
          <div className='pairs'>
        <div className='pair1'>
          <label htmlFor='price'>Price:</label>
          <input className="inputEdit" type='number' name='price' onChange={handleChange} value={nft.price} />
        </div>
        <div className='pair1'>
          <label htmlFor='description'>Description:</label>
          <input className="inputEdit" type='text' name='description' onChange={handleChange} value={nft.description} />
        </div>
        </div>
          <div className='pairs'>
        <div className='pair1'>
          <label htmlFor='properties'>Properties:</label>
          <input className="inputEdit" type='text' name='properties' onChange={handleChange} value={nft.properties} />
        </div>
        <div className='pair1'>
          <label htmlFor='description'>Owner:</label>
          <input className="inputEdit" type='text' name='description' onChange={handleChange} value={nft.owner} />
        </div>
        </div>

        <div className='pair1'>
          <label htmlFor='properties'>Collections:</label>
          <select
            className="inputEdit"
            value={nft.collection}
            onChange={handleChange}>
            <option key="select-ANY" value="other">
              OTHER
            </option>
            {Collections.map((col) => (
              <option key={"select-" + col} value={col}>
                {col}
              </option>
            ))}
          </select>

        </div>
        <button className='btn1' type='submit'>Add NFT</button>
      </form>
    </div>
  )
}

export default Add
