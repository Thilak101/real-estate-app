import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Contact } from "../../components";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/list/get/${params.listingId}`);
        const data = await res.json();
        if (data.success == false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data.listing);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);
  return (
    <main>
      {loading && (
        <p className="text-center my-7 text-2xl">
          <b>loading...</b>
        </p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">
          <b>Something went wrong!</b>
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[400px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="
            fixed 
            top-[16%] 
            right-[3%] 
            z-10 
            border 
            rounded-full
            w-12
            h-12
            flex
            justify-center
            bg-slate-100
            cursor-pointer"
          >
            <FaShare
              className="text-slate-500 fixed top-[18%]"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[20%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied
            </p>
          )}
          <div className="flex flex-col gap-4 p-3 max-w-4xl  my-5 px-[50px]">
            <p
              className="
                flex 
                flex-col 
                max-w-4xl
                my-1
                font-bold"
            >
              {listing.name} - ${" "}
              {listing.offer ? listing.discountPrice : listing.regularPrice}
              {listing.type === "rent" && "/month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
              <FaMapMarkedAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p
                className="
                bg-red-900
                w-full
                max-w-[200px]
                text-white
                text-center
                p-1
                rounded-md"
              >
                {listing.type == "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p
                  className="
                    bg-green-900
                    w-full
                    max-w-[200px]
                    text-white
                    text-center
                    p-1
                    rounded-md"
                >
                  ${listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-500">
              <span className="font-semibold text-black">Description -</span>
              {" " + listing.description}
            </p>
            <ul
              className="
            text-green-900 
            font-semibold 
            text-sm
            flex
            items-center
            gap-4
            sm:gap-6
            flex-wrap"
            >
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Un Furnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                className="
            bg-slate-700 
            text-white 
              rounded-lg
              uppercase
              hover:opacity-95
              p-3"
                onClick={() => setContact(true)}
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
    
          
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
