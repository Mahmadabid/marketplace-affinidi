import React, { useState } from 'react';
import { UserContext } from "@/utils/Context";
import { useContext } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faGlobe, faPhone, faVenusMars, faMapMarkerAlt, faBuilding, faMapPin, faCertificate, faCalendar } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [User, _] = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <div className="col-span-full bg-[#e8f4f5] p-6 mb-2 mt-3 rounded-md mx-6 shadow-md flex flex-col items-center justify-center">
                {!User.user.picture ? <img src={User.user.picture} alt="Profile Picture" className="w-32 h-32 rounded-full" /> : <div className='relative rounded-full bg-sky-100 w-32 h-32'>
                    <svg
                        className="absolute left-0 -top-[6px] w-32 h-32 text-[#00aaff]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>}
                <div className='flex flex-row items-center justify-center mt-4'>
                    <p className='text-3xl font-bold text-[#000d47]'>{User.user.givenName} {User.user.middleName} {User.user.familyName} {User.user.givenName && User.user.familyName && User.user.middleName ? null : 'User'}</p>
                    <span
                        className="ml-2 inline-block relative group"
                        onMouseEnter={() => setIsVisible(true)}
                        onMouseLeave={() => setIsVisible(false)}
                    >
                        <div className='relative'>
                            <FontAwesomeIcon
                                icon={faCertificate}
                                className={`text-2xl ${User.user.verified ? 'text-blue-500' : 'text-gray-400 opacity-50'}`}
                                title={User.user.verified ? "Verified" : "Unverified"}
                            />
                            {User.user.verified && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="absolute top-[47%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    width="12"
                                    height="12"
                                    fill="#fff"
                                    stroke="#fff"
                                    strokeWidth="3"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            )}
                        </div>

                        <span
                            className={`absolute left-1/2 transform -translate-x-1/2 bottom-full font-medium bg-blue-700 text-white px-2 py-1 my-1 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out`}
                            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
                        >
                            {User.user.verified ? "Verified" : "Unverified"}
                        </span>
                    </span>
                </div>
            </div>
            <div className='container mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {User.user.country &&
                    <div className="col-span-1 bg-green-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faGlobe} className="text-xl mr-2" />
                        <strong className="text-lg">Country:</strong> {User.user.country}
                    </div>}
                {User.user.phoneNumber &&
                    <div className="col-span-1 bg-yellow-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faPhone} className="text-xl mr-2" />
                        <strong className="text-lg">Phone Number:</strong> {User.user.phoneNumber}
                    </div>}
                {User.user.gender &&
                    <div className="col-span-1 bg-pink-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faVenusMars} className="text-xl mr-2" />
                        <strong className="text-lg">Gender:</strong> {User.user.gender}
                    </div>}
                {User.user.address &&
                    <div className="col-span-1 bg-purple-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl mr-2" />
                        <strong className="text-lg">Address:</strong> {User.user.address}
                    </div>}
                {User.user.email &&
                    <div className="col-span-2 prf:col-span-1 bg-orange-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faEnvelope} className="text-xl mr-2" />
                        <strong className="text-lg">Email:</strong> {User.user.email}
                    </div>}
                {User.user.nickname &&
                    <div className="col-span-1 bg-cyan-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faUser} className="text-xl mr-2" />
                        <strong className="text-lg">Nickname:</strong> {User.user.nickname}
                    </div>}
                {User.user.postalCode &&
                    <div className="col-span-1 bg-teal-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faMapPin} className="text-xl mr-2" />
                        <strong className="text-lg">Postal Code:</strong> {User.user.postalCode}
                    </div>}
                {User.user.birthdate &&
                    <div className="col-span-1 bg-red-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faCalendar} className="text-xl mr-2" />
                        <strong className="text-lg">Birthdate:</strong> {User.user.birthdate}
                    </div>}
                {User.user.city &&
                    <div className="col-span-1 bg-indigo-100 p-4 rounded-md shadow-md">
                        <FontAwesomeIcon icon={faBuilding} className="text-xl mr-2" />
                        <strong className="text-lg">City:</strong> {User.user.city}
                    </div>}
            </div>
        </div>
    );
}

export default Profile;
