import React from 'react'
import img1 from "../assets/1card.jpg"
import img3 from "../assets/2card.png"
import img2 from "../assets/babt card.avif"
const Card = () => {
  return (
    <div>
        <div className=' flex justify-center gap-3 border-red-300'>
            <div >
                <img src={img1} alt="" />
            </div>
            <div>
                <img src={img2} alt="" />
            </div><div>
                <img src={img3} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Card