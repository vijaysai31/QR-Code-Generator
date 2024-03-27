import React, { useState } from 'react'

const Box = () => {

  const [input , setInput] = useState("")
  const [qr , setQr] = useState()
  const [isLoading , setIsLoading] = useState(false)

  const getQrCode = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const ans = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`)
      console.log(ans);
      setQr(ans.url)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form className = 'form' onSubmit={getQrCode}>

      <h1 className = 'title'> QR Code Generator </h1>

      <input
      className = 'input'
      type = 'text'
      value = {input}
      onChange = {(e) => setInput(e.target.value)}
      required
      placeholder='Enter any URL or Text....'
      />

      {isLoading && <div className = "loading"><span></span>Loading.....</div>}

      {!isLoading && (qr ? <img className = "qr_code" src ={qr} alt = "qr_code"/> : <div className = "loading">Generate QR Code for text or URL</div>)}

      <input type="submit" className='submit' value = "Generate"></input>
    </form>
  )
}

export default Box