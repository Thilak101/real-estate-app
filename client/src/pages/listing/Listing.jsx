import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'

const Listing = () => {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/list/get/${params.listingId}`)
                const data = await res.json()
                if (data.success == false) {
                    setError(true)
                    setLoading(false)
                    return
                }
                setLoading(false)
                setListing(data.listing)
                setError(false)
            }
            catch (err) {
                setError(true)
                setLoading(false)
            }
        }
        fetchListing()
    }, [params.id])
    console.log(listing)
    return (
        <main>
            {
                loading && <p className='text-center my-7 text-2xl'><b>loading...</b></p>
            }
            {
                error && <p className='text-center my-7 text-2xl'><b>Something went wrong!</b></p>
            }
            {
                listing && !loading && !error && (
                    <>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div 
                                        className='h-[500px]' 
                                        style={{ 
                                            background: `url(${url}) center no-repeat`,
                                            backgroundSize: "cover"
                                        }}>

                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </>
                )
            }
        </main>
    )
}

export default Listing